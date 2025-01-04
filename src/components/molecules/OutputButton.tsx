import DefaultButton from "../atoms/DefaultButton";

function OutputButton({ colorPalette }: { colorPalette: string }) {
  return (
    <DefaultButton
      name="X"
      disabled={false}
      colorPalette={colorPalette}
      onClick={() => {}}
    />
  )
}

export default OutputButton
