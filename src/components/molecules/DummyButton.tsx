import DefaultButton from "../atoms/DefaultButton";

function DummyButton({ colorPalette }: { colorPalette: string }) {
  return (
    <DefaultButton
      name=""
      disabled={true}
      colorPalette={colorPalette}
      onClick={() => {}}
    />
  )
}

export default DummyButton
