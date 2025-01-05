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
    memory.movePtr(1)
    memory.set(10)
    memory.movePtr(-1)

    memory.get()

    expect(memory.get()).toBe(5)
  })
});

describe("move pointer", () => {
  test("incrementPtr", () => {
    const memory = Memory.create()

    memory.movePtr(10)

    expect(memory).toStrictEqual(Memory.createForTest({
      pointer: 10,
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
    memory.movePtr(1)

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
    memory.movePtr(-1)

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
