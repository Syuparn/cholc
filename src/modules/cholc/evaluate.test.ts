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

  test("move pointer", () => {
    const program = [
      byteCodes.CMinor,
      byteCodes.G,
    ]
    const evaluator = new Evaluator(program, "")
    evaluator.step()
    evaluator.step() // C -> G: add one # (= add 1 to pointer)

    expect(evaluator.dump()).toStrictEqual({
      memory: Memory.createForTest({
        pointer: 1,
        memory: {
          "0": -1,
          "1": 1,
        },
      }),
      pc: 2,
      loopAddress: -1,
    })
  })

  test("input character", () => {
    const program = [
      byteCodes.Input,
    ]
    const evaluator = new Evaluator(program, "a")
    evaluator.step()

    expect(evaluator.dump()).toStrictEqual({
      memory: Memory.createForTest({
        pointer: 0,
        memory: {
          "0": 97, // set
        },
      }),
      pc: 1,
      loopAddress: -1,
    })
  })

  test("output character", () => {
    const program = [
      byteCodes.Input,
      byteCodes.Output,
    ]
    const evaluator = new Evaluator(program, "a")
    evaluator.step()

    expect(evaluator.dump()).toStrictEqual({
      memory: Memory.createForTest({
        pointer: 0,
        memory: {
          "0": 97, // set
        },
      }),
      pc: 2,
      loopAddress: -1,
    })
  })
});

describe("move pointer by pitch interval", () => {
  test.each`
    program                             | expected
    ${[byteCodes.C, byteCodes.G]}       | ${{"0": 1, "1": 1}} 
    ${[byteCodes.C, byteCodes.D]}       | ${{"0": 1, "2": 1}} 
    ${[byteCodes.C, byteCodes.GMinor]}  | ${{"0": 1, "1": -1}} 
    ${[byteCodes.CMinor, byteCodes.G]}  | ${{"0": -1, "1": 1}} 
    ${[byteCodes.D, byteCodes.G]}       | ${{"0": 1, "-1": 1}} 
  `("memory after executing $program: $expected", ({program, expected}) => {
    const evaluator = new Evaluator(program, "")
    evaluator.step()
    evaluator.step()

    const {memory} = evaluator.dump()

    expect(memory.memory).toStrictEqual(expected)
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
      finished: false,
    })
  })

  test("finish when pc reaches at the end of the program", () => {
    const program = [
      byteCodes.C,
    ]
    const evaluator = new Evaluator(program, "")
    evaluator.step() // execute

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
      chord: "",
      output: "",
      finished: true,
    })
  })

  test("input itself does not appear in step", () => {
    const program = [
      byteCodes.Input,
    ]
    const evaluator = new Evaluator(program, "a")

    expect(evaluator.step()).toStrictEqual({
      memory: [
        {address: -4, value: 0, isRefferred: false},
        {address: -3, value: 0, isRefferred: false},
        {address: -2, value: 0, isRefferred: false},
        {address: -1, value: 0, isRefferred: false},
        {address: 0, value: 97, isRefferred: true},
        {address: 1, value: 0, isRefferred: false},
        {address: 2, value: 0, isRefferred: false},
        {address: 3, value: 0, isRefferred: false},
        {address: 4, value: 0, isRefferred: false},
      ],
      chord: "",
      output: "",
      finished: true,
    })
  })

  test("code after input is evaluated within a step", () => {
    const program = [
      byteCodes.Input,
      byteCodes.C,
    ]
    const evaluator = new Evaluator(program, "a")

    expect(evaluator.step()).toStrictEqual({
      memory: [
        {address: -4, value: 0, isRefferred: false},
        {address: -3, value: 0, isRefferred: false},
        {address: -2, value: 0, isRefferred: false},
        {address: -1, value: 0, isRefferred: false},
        {address: 0, value: 98, isRefferred: true},
        {address: 1, value: 0, isRefferred: false},
        {address: 2, value: 0, isRefferred: false},
        {address: 3, value: 0, isRefferred: false},
        {address: 4, value: 0, isRefferred: false},
      ],
      chord: "C",
      output: "",
      finished: false,
    })
  })

  test("output returns rest", () => {
    const program = [
      byteCodes.Input,
      byteCodes.C,
      byteCodes.Output,
    ]
    const evaluator = new Evaluator(program, "a")
    // execute all steps except the last one ([Input, C])
    evaluator.step()

    expect(evaluator.step()).toStrictEqual({
      memory: [
        {address: -4, value: 0, isRefferred: false},
        {address: -3, value: 0, isRefferred: false},
        {address: -2, value: 0, isRefferred: false},
        {address: -1, value: 0, isRefferred: false},
        {address: 0, value: 98, isRefferred: true},
        {address: 1, value: 0, isRefferred: false},
        {address: 2, value: 0, isRefferred: false},
        {address: 3, value: 0, isRefferred: false},
        {address: 4, value: 0, isRefferred: false},
      ],
      chord: "X",
      output: "b",
      finished: false,
    })
  })

  test("output is appended", () => {
    const program = [
      byteCodes.Input,
      byteCodes.C,
      byteCodes.Output,
      byteCodes.C,
      byteCodes.Output,
    ]
    const evaluator = new Evaluator(program, "a")
    // execute all steps except the last one ([Input, C], [Output], [C])
    evaluator.step()
    evaluator.step()
    evaluator.step()

    expect(evaluator.step()).toStrictEqual({
      memory: [
        {address: -4, value: 0, isRefferred: false},
        {address: -3, value: 0, isRefferred: false},
        {address: -2, value: 0, isRefferred: false},
        {address: -1, value: 0, isRefferred: false},
        {address: 0, value: 99, isRefferred: true},
        {address: 1, value: 0, isRefferred: false},
        {address: 2, value: 0, isRefferred: false},
        {address: 3, value: 0, isRefferred: false},
        {address: 4, value: 0, isRefferred: false},
      ],
      chord: "X",
      output: "bc",
      finished: false,
    })
  })
});

// TODO: test all ops
// TODO: test the whole evaluation (until stop)
