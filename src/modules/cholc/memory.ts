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
    for (let i = -4; i <= 4; i++) {
      memory[i] = 0
    }

    return new Memory(pointer, memory)
  }

  static createForTest(props: MemoryProps): Memory {
    return new Memory(props.pointer, props.memory)
  }

  get(): number {
    return this.memory[this.pointer]
  }

  set(v: number) {
    this.memory[this.pointer] = v
  }

  incrementPtr() {
    this.pointer++
  }

  decrementPtr() {
    this.pointer--
  }
}

export type MemoryView = {
  address: number
  value: number
  isRefferred: boolean
}[]
