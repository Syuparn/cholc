// TODO: impl

import { CholcState } from "./state";

export class Evaluator {
  cnt: number; // TODO: delete

  // TODO: use bytecode and input
  constructor() {
    this.cnt = 0
  }

  step(): CholcState {
    const chord = ["Am", "X", "F", "X", "G", "X", "C"][this.cnt] ?? "DONE"
    this.cnt++
    return {
      memory: [
        {address: -4, value: 0, isRefferred: false},
        {address: -3, value: 0, isRefferred: false},
        {address: -2, value: 0, isRefferred: false},
        {address: -1, value: 0, isRefferred: false},
        {address: 0, value: 1, isRefferred: true},
        {address: 1, value: 1, isRefferred: false},
        {address: 2, value: 1, isRefferred: false},
        {address: 3, value: -1, isRefferred: false},
        {address: 4, value: 0, isRefferred: false},
      ],
      chord: chord,
      output: chord,
      finished: chord === "DONE",
    }
  }
}
