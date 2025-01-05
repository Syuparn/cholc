// TODO: impl

import { Program } from "./bytecode";
import { Memory } from "./memory";
import { CholcState } from "./state";

export class Evaluator {
  program: Program;
  input: string;
  memory: Memory;

  // TODO: use bytecode and input
  constructor(program: Program, input: string) {
    this.program = program
    this.input = input
    this.memory = Memory.create()
  }

  step(): CholcState {
    const chord = "C"
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
}
