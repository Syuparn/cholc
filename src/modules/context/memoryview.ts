import React from 'react'
import { MemoryView } from '../cholc/memory'

type MemoryViewState = {
  memoryView: MemoryView,
  setMemoryView: React.Dispatch<React.SetStateAction<MemoryView>>,
}

export const MemoryViewContext = React.createContext<MemoryViewState>({memoryView: [], setMemoryView: () => {}})
