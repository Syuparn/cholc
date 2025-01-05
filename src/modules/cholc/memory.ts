// key: address, value: value of the address
// ex: {-1: 0, 0: 1, 1: 2}
// NOTE: number key is automatically coarsed to string
export type Memory = {[key: string]: string}

export type MemoryView = {
  address: number
  value: number
  isRefferred: boolean
}[]
