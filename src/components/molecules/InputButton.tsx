import DefaultButton from "../atoms/DefaultButton";

function InputButton({ colorPalette }: { colorPalette: string }) {
  return (
    <DefaultButton
      name="v"
      disabled={false}
      colorPalette={colorPalette}
      onClick={() => {}}
    />
  )
}

export default InputButton
