import { MemoryView } from "./memory"

export type CholcState = {
  memory: MemoryView
  chord: string
  output: string
  finished: boolean
}
