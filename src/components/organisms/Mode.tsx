import { Button, HStack } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { ChordContext } from "../../modules/context/chord"
import { Evaluator } from "../../modules/cholc/evaluate"
import { metaChords } from "../../modules/sound/chords"
import { EditableContext } from "../../modules/context/editable"
import { MemoryViewContext } from "../../modules/context/memoryview"
import { ResultContext } from "../../modules/context/result"
import { Parser } from "../../modules/cholc/parse"
import { SourceContext } from "../../modules/context/source"
import { InputContext } from "../../modules/context/input"
import { RxPencil1, RxSpeakerLoud, RxTrackNext } from "react-icons/rx"
import { BPMContext } from "../../modules/context/bpm"

function Mode() {
  const {source} = useContext(SourceContext)
  const {input} = useContext(InputContext)
  const {bpm} = useContext(BPMContext)
  const {setChord} = useContext(ChordContext)
  const {setEditable} = useContext(EditableContext)
  const {setResult} = useContext(ResultContext)
  const {setMemoryView} = useContext(MemoryViewContext)
  const [intervalNum, setIntervalNum] = useState<NodeJS.Timeout>(0 as unknown as NodeJS.Timeout)

  const program = new Parser(source).parse()
  const evaluator = new Evaluator(program, input)

  const play = () => {
    setEditable(false)
    const intervalMS = 60 * 1000 / bpm

    const interval = setInterval(() => {
      const state = evaluator.step()
      setMemoryView(state.memory)
      setResult(state.output)

      if (state.finished) {
        setChord(metaChords.READY)
        clearInterval(interval)
        return
      }

      if (state.chord === "X") {
        setChord(metaChords.REST)
        return
      }

      setChord(state.chord)
    }, intervalMS)

    setIntervalNum(interval)
  }

  const run = () => {
    setEditable(false)
    setTimeout(() => {
      const maxSteps = 1 << 20

      // evaluate until the end
      let state = evaluator.step()
      for (let i = 1; i < maxSteps; i++) {
        if (state.finished) {
          break
        }
        state = evaluator.step()
      }
      setMemoryView(state.memory)
      setResult(state.output)
      setEditable(true)

      if (!state.finished) {
        alert(`Timeout: program did not finish after step ${maxSteps}`)
      }
    }, 1)
  }

  const edit = () => {
    clearInterval(intervalNum)
    setChord(metaChords.INTERRUPT)
    setMemoryView([])

    setEditable(true)
  }

  return (
    <HStack>
      <Button
        colorPalette="orange"
        onClick={play}
      >
        <RxSpeakerLoud /> Play
      </Button>
      <Button
        colorPalette="orange"
        onClick={run}
      >
        <RxTrackNext /> Run (silent)
      </Button>
      <Button
        colorPalette="orange"
        onClick={edit}
      >
        <RxPencil1 /> Edit
      </Button>
    </HStack>
  )
}

export default Mode
