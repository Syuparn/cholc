import { useContext, useEffect } from "react";
import { ChordContext } from "../../modules/context/chord";
import { ChordName, getChord } from "../../modules/sound/chords";
import { playChord } from "../../modules/sound/synth";
import DefaultButton from "../atoms/DefaultButton";

function ChordButton({ name, colorPalette }: {name: ChordName, colorPalette: string}) {
  const {chord} = useContext(ChordContext)

  useEffect(() => {
    if (chord === name) {
      playChord(getChord(name), "8n")
    }
  })

  const onClick = () => {
    playChord(getChord(name))
  }

  return (
    <DefaultButton
      name={name}
      disabled={false}
      colorPalette={(chord === name) ? "yellow" : colorPalette}
      onClick={onClick}
    />
  )
}

export default ChordButton
