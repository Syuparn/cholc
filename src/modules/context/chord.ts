import React from 'react'

type ChordState = {
  chord: string,
  setChord: React.Dispatch<React.SetStateAction<string>>,
}

export const ChordContext = React.createContext<ChordState>({chord: "", setChord: () => {}})
