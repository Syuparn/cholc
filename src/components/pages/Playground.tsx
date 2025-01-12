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
import GitHubLink from "../organisms/GitHubLink"
import { queryToSource } from "../../modules/cholc/link/decode"
import Settings from "../organisms/Settings"
import { SynthContext } from "../../modules/context/synth"
import { synth as makeSynth } from '../../modules/sound/synth';
import { BPMContext } from "../../modules/context/bpm"
import { bpmParam, volumeParam } from "../../modules/sound/params"

function sourceFromQuery(): string {
  const queryValue = new URL(decodeURIComponent(document.location.href)).searchParams.get("p")
  if (queryValue === null) {
    return ""
  }
  return queryToSource(queryValue)
}

function Playground() {
  const [source, setSource] = useState(sourceFromQuery())
  const [input, setInput] = useState('')
  const [chord, setChord] = useState('')
  const [editable, setEditable] = useState(true)
  const [memoryView, setMemoryView] = useState<MemoryView>([])
  const [result, setResult] = useState('')
  // NOTE: set small init value to avoid blasting
  const [synth, setSynth] = useState(makeSynth(volumeParam.default))
  const [bpm, setBPM] = useState<number>(bpmParam.default)

  return (
    <>
      <ChordContext.Provider value={{chord, setChord}}>
        <SourceContext.Provider value={{source, setSource}}>
          <InputContext.Provider value={{input, setInput}}>
            <EditableContext.Provider value={{editable, setEditable: setEditable}}>
              <MemoryViewContext.Provider value={{memoryView, setMemoryView}}>
                <ResultContext.Provider value={{result, setResult}}>
                  <SynthContext.Provider value={{synth, setSynth}}>
                    <BPMContext.Provider value={{bpm, setBPM}}>
                      <Chords />
                      <Mode />
                      <Debugger />
                      <Source />
                      <Input />
                      <Result />
                      <Settings />
                      <GitHubLink />
                    </BPMContext.Provider>
                  </SynthContext.Provider>
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
