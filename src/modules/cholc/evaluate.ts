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
      memory: {},
      chord: chord,
      output: chord,
      finished: chord === "DONE",
    }
  }
}
