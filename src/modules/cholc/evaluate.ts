// TODO: impl

import { byteCodes, getPitch, isMajor, isMinor, keySignatureMove, Program } from "./bytecode";
import { chordName } from "./chord";
import { Memory } from "./memory";
import { CholcState } from "./state";

export type EvaluatorDump = {
  memory: Memory;
  pc: number;
  loopAddress: number;
}

export class Evaluator {
  program: Program;
  input: string;
  inputCnt: 0;
  memory: Memory;
  pc: number;
  loopAddress: number;
  lastPitch: number | undefined;

  constructor(program: Program, input: string) {
    this.program = program
    this.input = input
    this.inputCnt = 0
    this.memory = Memory.create()
    this.pc = 0
    this.loopAddress = -1
  }

  step(): CholcState {
    this.inputChar()

    if (this.pc >= this.program.length) {
      return {
        memory: this.memory.view(),
        chord: "",
        output: "",
        finished: true,
      }
    }

    const chord = chordName(this.program[this.pc])
    this.movePointer()
    this.updateMemory()

    this.pc++

    return {
      memory: this.memory.view(),
      chord: chord,
      output: "",
      finished: false,
    }
  }

  private inputChar() {
    while (this.program[this.pc] == byteCodes.Input) {
      const charCode = this.inputCnt < this.input.length ? this.input.charCodeAt(this.inputCnt) : 0
      this.memory.set(charCode)

      this.inputCnt++
      this.pc++
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
      loopAddress: this.loopAddress,
    }
  }
}
