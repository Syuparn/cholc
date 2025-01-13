import { VStack } from "@chakra-ui/react"
import { Slider } from "../ui/slider"
import { useContext, useState } from "react"
import { SynthContext } from "../../modules/context/synth"
import { playChord, synth } from "../../modules/sound/synth"
import { getChord } from "../../modules/sound/chords"
import { BPMContext } from "../../modules/context/bpm"
import { bpmParam, volumeParam } from "../../modules/sound/params"
import { EditableContext } from "../../modules/context/editable"

function Settings() {
  const {setSynth} = useContext(SynthContext)
  const {bpm, setBPM} = useContext(BPMContext)
  const {editable} = useContext(EditableContext)
  const [volume, setVolume] = useState<number>(volumeParam.default)

  const changeVolume = ({value}: {value: number[]}) => {
    const newVolume = value[0]
    setVolume(newVolume)
  }

  const changeVolumeEnd = ({value}: {value: number[]}) => {
    const newVolume = value[0]
    setVolume(newVolume)

    const newSynth = synth(volume)
    setSynth(newSynth)

    // check sound
    playChord(newSynth, getChord("C"), "4n")
  }
  
  const changeBPM = ({value}: {value: number[]}) => {
    const newBPM = value[0]
    setBPM(newBPM)
  }

  return (
    <VStack>
      <Slider
        defaultValue={[volumeParam.default]}
        label={`Sound Volume: ${volume}`}
        onValueChangeEnd={changeVolumeEnd}
        onValueChange={changeVolume}
        min={volumeParam.min}
        max={volumeParam.max}
        disabled={!editable}
      />
      <Slider
        defaultValue={[bpmParam.default]}
        label={`Playing BPM: ${bpm}`}
        onValueChange={changeBPM}
        min={bpmParam.min}
        max={bpmParam.max}
        step={5}
        disabled={!editable}
      />
    </VStack>
  )
}

export default Settings
