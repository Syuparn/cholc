import React from 'react'

type SourceState = {
  source: string,
  setSource: React.Dispatch<React.SetStateAction<string>>,
}

export const SourceContext = React.createContext<SourceState>({source: "", setSource: () => {}})
