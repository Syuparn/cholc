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
    })
  })

  test("jump pc by startloop", () => {
    const program = [
      byteCodes.StartLoop,
      byteCodes.C,
      byteCodes.C,
      byteCodes.C,
      byteCodes.EndLoop,
      byteCodes.G,
      byteCodes.D,
    ]
    const evaluator = new Evaluator(program, "")
    evaluator.step()

    expect(evaluator.dump()).toStrictEqual({
      memory: Memory.createForTest({
        pointer: 0,
        memory: {
          "0": 1,
        },
      }),
      pc: 6, // jump to code after endloop
    })
  })

  test("jump pc by endloop", () => {
    const program = [
      byteCodes.C,
      byteCodes.StartLoop,
      byteCodes.G,
      byteCodes.EndLoop,
      byteCodes.D,
    ]
    const evaluator = new Evaluator(program, "")
    evaluator.step() // [C]
    evaluator.step() // [StartLoop, G]
    evaluator.step() // [EndLoop, G]

    expect(evaluator.dump()).toStrictEqual({
      memory: Memory.createForTest({
        pointer: 1,
        memory: {
          "0": 1,
          "1": 2,
        },
      }),
      pc: 3, // jump to code after startloop
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
    // execute all steps except the last one
    evaluator.step() // [Input, C]
    evaluator.step() // [Output]
    evaluator.step() // [C]

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

  test("jump by startLoop", () => {
    const program = [
      byteCodes.StartLoop,
      byteCodes.C,
      byteCodes.C,
      byteCodes.EndLoop,
      byteCodes.G,
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
      chord: "G",
      output: "",
      finished: false,
    })
  })

  test("jump by startLoop (end is missing)", () => {
    const program = [
      byteCodes.StartLoop,
      byteCodes.C,
      byteCodes.C,
      byteCodes.G,
    ]
    const evaluator = new Evaluator(program, "")

    expect(evaluator.step()).toStrictEqual({
      memory: [
        {address: -4, value: 0, isRefferred: false},
        {address: -3, value: 0, isRefferred: false},
        {address: -2, value: 0, isRefferred: false},
        {address: -1, value: 0, isRefferred: false},
        {address: 0, value: 0, isRefferred: true},
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

  test("startLoop jump does not work", () => {
    const program = [
      byteCodes.C,
      byteCodes.StartLoop,
      byteCodes.G,
      byteCodes.D,
      byteCodes.EndLoop,
      byteCodes.D,
    ]
    const evaluator = new Evaluator(program, "")
    evaluator.step() // [C]

    expect(evaluator.step()).toStrictEqual({
      memory: [
        {address: -3, value: 0, isRefferred: false},
        {address: -2, value: 0, isRefferred: false},
        {address: -1, value: 0, isRefferred: false},
        {address: 0, value: 1, isRefferred: false},
        {address: 1, value: 1, isRefferred: true},
        {address: 2, value: 0, isRefferred: false},
        {address: 3, value: 0, isRefferred: false},
        {address: 4, value: 0, isRefferred: false},
        {address: 5, value: 0, isRefferred: false},
      ],
      chord: "G",
      output: "",
      finished: false,
    })
  })

  test("jump by endLoop", () => {
    const program = [
      byteCodes.C,
      byteCodes.StartLoop,
      byteCodes.G,
      byteCodes.C,
      byteCodes.EndLoop,
      byteCodes.D,
    ]
    const evaluator = new Evaluator(program, "")
    evaluator.step() // [C]
    evaluator.step() // [StartLoop, G]
    evaluator.step() // [C]

    expect(evaluator.step()).toStrictEqual({
      memory: [
        {address: -3, value: 0, isRefferred: false},
        {address: -2, value: 0, isRefferred: false},
        {address: -1, value: 0, isRefferred: false},
        {address: 0, value: 2, isRefferred: false},
        {address: 1, value: 2, isRefferred: true},
        {address: 2, value: 0, isRefferred: false},
        {address: 3, value: 0, isRefferred: false},
        {address: 4, value: 0, isRefferred: false},
        {address: 5, value: 0, isRefferred: false},
      ],
      chord: "G",
      output: "",
      finished: false,
    })
  })

  test("jump by endLoop(startLoop is missing)", () => {
    const program = [
      byteCodes.C,
      byteCodes.G,
      byteCodes.EndLoop,
      byteCodes.D,
    ]
    const evaluator = new Evaluator(program, "")
    evaluator.step() // [C]
    evaluator.step() // [G]

    expect(evaluator.step()).toStrictEqual({
      memory: [
        {address: -4, value: 0, isRefferred: false},
        {address: -3, value: 0, isRefferred: false},
        {address: -2, value: 0, isRefferred: false},
        {address: -1, value: 0, isRefferred: false},
        {address: 0, value: 2, isRefferred: true},
        {address: 1, value: 1, isRefferred: false},
        {address: 2, value: 0, isRefferred: false},
        {address: 3, value: 0, isRefferred: false},
        {address: 4, value: 0, isRefferred: false},
      ],
      chord: "C",
      output: "",
      finished: false,
    })
  })

  test("endLoop jump does not work", () => {
    const program = [
      byteCodes.C,
      byteCodes.CMinor,
      byteCodes.EndLoop,
      byteCodes.G,
    ]
    const evaluator = new Evaluator(program, "")
    evaluator.step() // [C]
    evaluator.step() // [CMinor]

    expect(evaluator.step()).toStrictEqual({
      memory: [
        {address: -3, value: 0, isRefferred: false},
        {address: -2, value: 0, isRefferred: false},
        {address: -1, value: 0, isRefferred: false},
        {address: 0, value: 0, isRefferred: false},
        {address: 1, value: 1, isRefferred: true},
        {address: 2, value: 0, isRefferred: false},
        {address: 3, value: 0, isRefferred: false},
        {address: 4, value: 0, isRefferred: false},
        {address: 5, value: 0, isRefferred: false},
      ],
      chord: "G",
      output: "",
      finished: false,
    })
  })
});

// TODO: test the whole evaluation (until stop)
