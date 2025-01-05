import { useState } from "react"
import { SourceContext } from "../../modules/context/source"
import Chords from "../organisms/Chords"
import Source from "../organisms/Source"
import Input from "../organisms/Input"
import { InputContext } from "../../modules/context/input"
import Mode from "../organisms/Mode"
import { ChordContext } from "../../modules/context/chord"
import { EditableContext } from "../../modules/context/editable"
import Debugger from "../organisms/Debugger"
import { MemoryViewContext } from "../../modules/context/memoryview"
import { MemoryView } from "../../modules/cholc/memory"
import Result from "../organisms/Result"
import { ResultContext } from "../../modules/context/result"

function Playground() {
  const [source, setSource] = useState('')
  const [input, setInput] = useState('')
  const [chord, setChord] = useState('')
  const [editable, setEditable] = useState(true)
  const [memoryView, setMemoryView] = useState<MemoryView>([])
  const [result, setResult] = useState('')

  return (
    <>
      <ChordContext.Provider value={{chord, setChord}}>
        <SourceContext.Provider value={{source, setSource}}>
          <InputContext.Provider value={{input, setInput}}>
            <EditableContext.Provider value={{editable, setEditable: setEditable}}>
              <MemoryViewContext.Provider value={{memoryView, setMemoryView}}>
                <ResultContext.Provider value={{result, setResult}}>
                  <Chords />
                  <Mode />
                  <Debugger />
                  <Source />
                  <Input />
                  <Result />
                </ResultContext.Provider>
              </MemoryViewContext.Provider>
            </EditableContext.Provider>
          </InputContext.Provider>
        </SourceContext.Provider>
      </ChordContext.Provider>
    </>
  )
}

export default Playground
