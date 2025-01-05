import { byteCodes } from "./bytecode";
import { Evaluator } from "./evaluate";
import { Memory } from "./memory";

describe("evaluate program", () => {
  test("increment value", () => {
    const program = [
      byteCodes.C,
    ]
    const evaluator = new Evaluator(program, "")
    evaluator.step()

    expect(evaluator.dump()).toStrictEqual({
      memory: Memory.createForTest({
        pointer: 0,
        memory: {
          "0": 1, // set
        },
      }),
      pc: 1,
      loopAddress: -1,
    })
  })

  test("decrement value", () => {
    const program = [
      byteCodes.CMinor,
    ]
    const evaluator = new Evaluator(program, "")
    evaluator.step()

    expect(evaluator.dump()).toStrictEqual({
      memory: Memory.createForTest({
        pointer: 0,
        memory: {
          "0": -1, // set
        },
      }),
      pc: 1,
      loopAddress: -1,
    })
  })
});

describe("get result of step evaluation", () => {
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
