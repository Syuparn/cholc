import { ChordName, getChord } from "../../modules/sound/chords";
import { playChord } from "../../modules/sound/synth";
import DefaultButton from "../atoms/DefaultButton";

function ChordButton({ name, colorPalette }: {name: ChordName, colorPalette: string}) {
  const onClick = () => {
    playChord(getChord(name))
  }

  return (
    <DefaultButton
      name={name}
      disabled={false}
      colorPalette={colorPalette}
      onClick={onClick}
    />
  )
}

export default ChordButton
