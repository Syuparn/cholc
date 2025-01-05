// key: address, value: value of the address
// ex: {-1: 0, 0: 1, 1: 2}
// NOTE: number key is automatically coarsed to string
type MemoryData = {[key: string]: number}

type MemoryProps = {
  pointer: number;
  memory: MemoryData;
}

export class Memory {
  pointer: number;
  memory: MemoryData;

  private constructor(pointer: number, memory: MemoryData) {
    this.pointer = pointer
    this.memory = memory
  }

  static create(): Memory {
    const pointer = 0
    const memory: MemoryData = {}

    return new Memory(pointer, memory)
  }

  static createForTest(props: MemoryProps): Memory {
    return new Memory(props.pointer, props.memory)
  }

  get(): number {
    if (this.memory[this.pointer] === undefined) {
      this.memory[this.pointer] = 0 // initialize
    }

    return this.memory[this.pointer]
  }

  set(v: number) {
    this.memory[this.pointer] = v
  }

  movePtr(diff: number) {
    this.pointer += diff
  }

  view(): MemoryView {
    const viewSize = 4
    // [-viewSize, -viewSize+1, ..., viewSize]
    const viewRange = Array.from(Array(2 * viewSize + 1), (_, i) => i - viewSize)
    return viewRange.map(i => ({
      address: this.pointer + i,
      value: this.memory[this.pointer + i] ?? 0,
      isRefferred: i == 0, // whether address is same as pointer
    }))
  }
}

export type MemoryView = {
  address: number
  value: number
  isRefferred: boolean
}[]
