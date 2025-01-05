import { Button, HStack } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { ChordContext } from "../../modules/context/chord"
import { intervalMS } from "../../modules/sound/interval"
import { Evaluator } from "../../modules/cholc/evaluate"
import { metaChords } from "../../modules/sound/chords"
import { EditableContext } from "../../modules/context/editable"
import { MemoryViewContext } from "../../modules/context/memoryview"
import { ResultContext } from "../../modules/context/result"
import { Parser } from "../../modules/cholc/parse"
import { SourceContext } from "../../modules/context/source"
import { InputContext } from "../../modules/context/input"

function Mode() {
  const {source} = useContext(SourceContext)
  const {input} = useContext(InputContext)
  const {setChord} = useContext(ChordContext)
  const {setEditable} = useContext(EditableContext)
  const {setResult} = useContext(ResultContext)
  const {setMemoryView} = useContext(MemoryViewContext)
  const [intervalNum, setIntervalNum] = useState<NodeJS.Timeout>(0 as unknown as NodeJS.Timeout)

  const program = new Parser(source).parse()
  const evaluator = new Evaluator(program, input)

  const run = () => {
    setEditable(false)

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
        onClick={run}
      >
        Run
      </Button>
      <Button
        colorPalette="orange"
        onClick={edit}
      >
        Edit
      </Button>
    </HStack>
  )
}

export default Mode
