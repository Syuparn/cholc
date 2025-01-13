import { byteCodes, getPitch, isMajor, isMinor, keySignatureMove, Program } from "./bytecode";
import { chordName } from "./chord";
import { Memory } from "./memory";
import { CholcState } from "./state";

export type EvaluatorDump = {
  memory: Memory;
  pc: number;
}

export class Evaluator {
  program: Program;
  input: string;
  inputCnt: 0;
  memory: Memory;
  pc: number;
  lastPitch: number | undefined;
  output: string;

  constructor(program: Program, input: string) {
    this.program = program
    this.input = input
    this.inputCnt = 0
    this.memory = Memory.create()
    this.pc = 0
    this.output = ""
  }

  step(): CholcState {
    this.inputChar()
    this.handleLoop()

    if (this.pc >= this.program.length) {
      return {
        memory: this.memory.view(),
        chord: "",
        output: this.output,
        finished: true,
      }
    }

    const chord = chordName(this.program[this.pc])
    this.movePointer()
    this.updateMemory()

    this.outputChar()

    this.pc++

    return {
      memory: this.memory.view(),
      chord: chord,
      output: this.output,
      finished: false,
    }
  }

  private inputChar() {
    // NOTE: unlike output(`X`), input(`v`) is consumed instantly and the next code is executed within the step
    while (this.program[this.pc] === byteCodes.Input) {
      const charCode = this.inputCnt < this.input.length ? this.input.charCodeAt(this.inputCnt) : 0
      this.memory.set(charCode)

      this.inputCnt++
      this.pc++
    }
  }

  private handleLoop() {
    while (true) {
      if (this.program[this.pc] === byteCodes.StartLoop) {
        if (this.memory.get() === 0) {
          this.jumpToEndLoop()
        } else {
          // simply skip this code
          this.pc++
        }
        continue
      } else if (this.program[this.pc] === byteCodes.EndLoop) {
        if (this.memory.get() !== 0) {
          this.jumpToStartLoop()
        } else {
          // simply skip this code
          this.pc++
        }
        continue
      }
      break
    }
  }

  private jumpToStartLoop() {
    let nest = 1
    let newPC = this.pc
    while (newPC >= 0) {
      newPC--

      if (this.program[newPC] === byteCodes.StartLoop) {
        nest--

        if (nest === 0) {
          break
        }
      }
      if (this.program[newPC] === byteCodes.EndLoop) {
        nest++
      }
    }

    this.pc = newPC + 1
  }

  private jumpToEndLoop() {
    let nest = 1
    let newPC = this.pc
    while (newPC < this.program.length) {
      newPC++

      if (this.program[newPC] === byteCodes.StartLoop) {
        nest++
      }
      if (this.program[newPC] === byteCodes.EndLoop) {
        nest--

        if (nest === 0) {
          break
        }
      }
    }

    this.pc = newPC + 1
  }

  private outputChar() {
    if (this.program[this.pc] === byteCodes.Output) {
      const chr = String.fromCharCode(this.memory.get())
      this.output += chr
    }
  }

  private updateMemory() {
    const code = this.program[this.pc]
    if (isMajor(code)) {
      // increment value
      this.memory.set(this.memory.get() + 1)
      return
    }
    if (isMinor(code)) {
      // decrement value
      this.memory.set(this.memory.get() - 1)
      return
    }
  }

  private movePointer() {
    const {pitch, ok} = getPitch(this.program[this.pc])
    if (!ok) {
      // current code is not a chord
      return
    }

    if (this.lastPitch !== undefined) {
      this.memory.movePtr(keySignatureMove(this.lastPitch, pitch))
    }
    this.lastPitch = pitch
  }

  dump(): EvaluatorDump {
    return {
      memory: this.memory,
      pc: this.pc,
    }
  }
}
