import { Button, HStack } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { ChordContext } from "../../modules/context/chord"
import { intervalMS } from "../../modules/sound/interval"
import { Evaluator } from "../../modules/cholc/evaluate"
import { metaChords } from "../../modules/sound/chords"
import { EditableContext } from "../../modules/context/editable"

function Mode() {
  const {setChord} = useContext(ChordContext)
  const {setEditable} = useContext(EditableContext)
  const [intervalNum, setIntervalNum] = useState(0)

  const evaluator = new Evaluator()

  const run = () => {
    setEditable(false)

    const interval = setInterval(() => {
      const state = evaluator.step()

      if (state.finished) {
        setChord(metaChords.READY)
        clearInterval(interval)
        setEditable(true)
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

  const abort = () => {
    clearInterval(intervalNum)
    setChord(metaChords.INTERRUPT)

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
        onClick={abort}
      >
        Abort
      </Button>
    </HStack>
  )
}

export default Mode
