import { useState } from "react"
import { SourceContext } from "../../modules/context/source"
import Chords from "../organisms/Chords"
import Source from "../organisms/Source"
import Input from "../organisms/Input"
import { InputContext } from "../../modules/context/input"

function Playground() {
  const [sourceCode, setSourceCode] = useState('')
  const [input, setInput] = useState('')

  return (
    <>
      <SourceContext.Provider value={{source: sourceCode, setSource: setSourceCode}}>
        <InputContext.Provider value={{input: input, setInput: setInput}}>
          <Chords />
          <Source />
          <Input />
        </InputContext.Provider>
      </SourceContext.Provider>
    </>
  )
}

export default Playground
