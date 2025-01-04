import { useState } from "react"
import { SourceContext } from "../../modules/context/source"
import Chords from "../organisms/Chords"
import Source from "../organisms/Source"
import Input from "../organisms/Input"
import { InputContext } from "../../modules/context/input"
import Mode from "../organisms/Mode"
import { ChordContext } from "../../modules/context/chord"
import { EditableContext } from "../../modules/context/editable"

function Playground() {
  const [sourceCode, setSourceCode] = useState('')
  const [input, setInput] = useState('')
  const [chord, setChord] = useState('')
  const [editable, setEditable] = useState(true)

  return (
    <>
      <ChordContext.Provider value={{chord: chord, setChord: setChord}}>
        <SourceContext.Provider value={{source: sourceCode, setSource: setSourceCode}}>
          <InputContext.Provider value={{input: input, setInput: setInput}}>
            <EditableContext.Provider value={{editable: editable, setEditable: setEditable}}>
              <Chords />
              <Mode />
              <Source />
              <Input />
            </EditableContext.Provider>
          </InputContext.Provider>
        </SourceContext.Provider>
      </ChordContext.Provider>
    </>
  )
}

export default Playground
