import React from 'react'

type BPMState = {
  bpm: number,
  setBPM: React.Dispatch<React.SetStateAction<number>>,
}

export const BPMContext = React.createContext<BPMState>({bpm: 0, setBPM: () => {}})
