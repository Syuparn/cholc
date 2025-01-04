import DefaultButton from "../atoms/DefaultButton";

function ChordButton({ name, colorPalette }: {name: string, colorPalette: string}) {
  return (
    <DefaultButton
      name={name}
      disabled={false}
      colorPalette={colorPalette}
    />
  )
}

export default ChordButton
