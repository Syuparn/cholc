import React from 'react'

type ResultState = {
  result: string,
  setResult: React.Dispatch<React.SetStateAction<string>>,
}

export const ResultContext = React.createContext<ResultState>({result: "", setResult: () => {}})
