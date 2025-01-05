import { Memory } from "./memory";

describe("set value to memory", () => {
  test("set", () => {
    const v = 5
    const memory = Memory.create()

    memory.set(v)

    expect(memory).toStrictEqual(Memory.createForTest({
      pointer: 0,
      memory: {
        "0": 5, // set
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

  test("get initial value", () => {
    const memory = Memory.create()
    memory.get()

    expect(memory.get()).toBe(0)
  })

  test("get after moving pointer", () => {
    const memory = Memory.create()
    memory.set(5)
    memory.incrementPtr()
    memory.set(10)
    memory.decrementPtr()

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
      memory: {},
    }))
  })
});

describe("decrement pointer", () => {
  test("decrementPtr", () => {
    const memory = Memory.create()

    memory.decrementPtr()

    expect(memory).toStrictEqual(Memory.createForTest({
      pointer: -1,
      memory: {},
    }))
  })
});

describe("view memory", () => {
  test("initial value", () => {
    const memory = Memory.create()

    expect(memory.view()).toStrictEqual([
      {address: -4, value: 0, isRefferred: false},
      {address: -3, value: 0, isRefferred: false},
      {address: -2, value: 0, isRefferred: false},
      {address: -1, value: 0, isRefferred: false},
      {address: 0, value: 0, isRefferred: true},
      {address: 1, value: 0, isRefferred: false},
      {address: 2, value: 0, isRefferred: false},
      {address: 3, value: 0, isRefferred: false},
      {address: 4, value: 0, isRefferred: false},
    ])
  })

  test("set value", () => {
    const memory = Memory.create()
    memory.set(1)

    expect(memory.view()).toStrictEqual([
      {address: -4, value: 0, isRefferred: false},
      {address: -3, value: 0, isRefferred: false},
      {address: -2, value: 0, isRefferred: false},
      {address: -1, value: 0, isRefferred: false},
      {address: 0, value: 1, isRefferred: true},
      {address: 1, value: 0, isRefferred: false},
      {address: 2, value: 0, isRefferred: false},
      {address: 3, value: 0, isRefferred: false},
      {address: 4, value: 0, isRefferred: false},
    ])
  })

  test("move pointer", () => {
    const memory = Memory.create()
    memory.incrementPtr()

    expect(memory.view()).toStrictEqual([
      {address: -3, value: 0, isRefferred: false},
      {address: -2, value: 0, isRefferred: false},
      {address: -1, value: 0, isRefferred: false},
      {address: 0, value: 0, isRefferred: false},
      {address: 1, value: 0, isRefferred: true},
      {address: 2, value: 0, isRefferred: false},
      {address: 3, value: 0, isRefferred: false},
      {address: 4, value: 0, isRefferred: false},
      {address: 5, value: 0, isRefferred: false},
    ])
  })

  test("set value then move pointer", () => {
    const memory = Memory.create()
    memory.set(1)
    memory.decrementPtr()

    expect(memory.view()).toStrictEqual([
      {address: -5, value: 0, isRefferred: false},
      {address: -4, value: 0, isRefferred: false},
      {address: -3, value: 0, isRefferred: false},
      {address: -2, value: 0, isRefferred: false},
      {address: -1, value: 0, isRefferred: true},
      {address: 0, value: 1, isRefferred: false},
      {address: 1, value: 0, isRefferred: false},
      {address: 2, value: 0, isRefferred: false},
      {address: 3, value: 0, isRefferred: false},
    ])
  })
});
