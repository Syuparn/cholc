// TODO: impl

import { getPitch, isMajor, isMinor, keySignatureMove, Program } from "./bytecode";
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
  memory: Memory;
  pc: number;
  loopAddress: number;
  lastPitch: number | undefined;

  constructor(program: Program, input: string) {
    this.program = program
    this.input = input
    this.memory = Memory.create()
    this.pc = 0
    this.loopAddress = -1
  }

  step(): CholcState {
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
