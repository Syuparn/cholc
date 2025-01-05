// TODO: impl

import { Program } from "./bytecode";
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
    const chord = "C"
    this.pc++
    this.memory.set(1)

    return {
      memory: [
        {address: -4, value: 0, isRefferred: false},
        {address: -3, value: 0, isRefferred: false},
        {address: -2, value: 0, isRefferred: false},
        {address: -1, value: 0, isRefferred: false},
        {address: 0, value: 1, isRefferred: true},
        {address: 1, value: 0, isRefferred: false},
        {address: 2, value: 0, isRefferred: false},
        {address: 3, value: 0, isRefferred: false},
        {address: 4, value: 0, isRefferred: false},
      ],
      chord: chord,
      output: "",
      finished: true,
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
