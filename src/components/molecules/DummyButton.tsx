import DefaultButton from "../atoms/DefaultButton";

function DummyButton({ colorPalette }: { colorPalette: string }) {
  return (
    <DefaultButton
      name=""
      disabled={true}
      colorPalette={colorPalette}
    />
  )
}

export default DummyButton
