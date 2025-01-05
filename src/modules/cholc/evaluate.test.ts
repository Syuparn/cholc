import { byteCodes } from "./bytecode";
import { Evaluator } from "./evaluate";

describe("evaluate program", () => {
  test("increment value", () => {
    const program = [
      byteCodes.C,
    ]
    const evaluator = new Evaluator(program, "")

    expect(evaluator.step()).toStrictEqual({
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
      chord: "C",
      output: "",
      finished: true,
    })
  })
});


// TODO: test all ops
// TODO: test the whole evaluation (until stop)
