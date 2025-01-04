import React from 'react'

type InputState = {
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
}

export const InputContext = React.createContext<InputState>({input: "", setInput: () => {}})
