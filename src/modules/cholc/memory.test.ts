import { Memory } from "./memory";

describe("set value to memory", () => {
  test("set", () => {
    const v = 5
    const memory = Memory.create()

    memory.set(v)

    expect(memory).toStrictEqual(Memory.createForTest({
      pointer: 0,
      memory: {
        "-4": 0,
        "-3": 0,
        "-2": 0,
        "-1": 0,
        "0": 5, // set
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
    }))
  })
});

describe("get value from memory", () => {
  test("get", () => {
    const memory = Memory.create()
    memory.set(5)

    memory.get()

    expect(memory.get()).toBe(5)
  })
});

describe("increment pointer", () => {
  test("incrementPtr", () => {
    const memory = Memory.create()

    memory.incrementPtr()

    expect(memory).toStrictEqual(Memory.createForTest({
      pointer: 1,
      memory: {
        "-4": 0,
        "-3": 0,
        "-2": 0,
        "-1": 0,
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
    }))
  })
});

describe("decrement pointer", () => {
  test("decrementPtr", () => {
    const memory = Memory.create()

    memory.decrementPtr()

    expect(memory).toStrictEqual(Memory.createForTest({
      pointer: -1,
      memory: {
        "-4": 0,
        "-3": 0,
        "-2": 0,
        "-1": 0,
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
    }))
  })
});
