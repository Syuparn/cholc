import DefaultButton from "../atoms/DefaultButton";

function EndForButton({ colorPalette }: { colorPalette: string }) {
  return (
    <DefaultButton
      name=":|"
      disabled={false}
      colorPalette={colorPalette}
    />
  )
}

export default EndForButton
