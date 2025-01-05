// TODO: impl

import { isMajor, isMinor, Program } from "./bytecode";
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

  constructor(program: Program, input: string) {
    this.program = program
    this.input = input
    this.memory = Memory.create()
    this.pc = 0
    this.loopAddress = -1
  }

  step(): CholcState {
    const chord = chordName(this.program[this.pc])
    this.updateMemory()
    this.pc++

    return {
      memory: this.memory.view(),
      chord: chord,
      output: "",
      finished: true,
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

  dump(): EvaluatorDump {
    return {
      memory: this.memory,
      pc: this.pc,
      loopAddress: this.loopAddress,
    }
  }
}
