import DefaultButton from "../atoms/DefaultButton";

function ForButton({ colorPalette }: { colorPalette: string }) {
  return (
    <DefaultButton
      name="|:"
      disabled={false}
      colorPalette={colorPalette}
      onClick={() => {}}
    />
  )
}

export default ForButton
