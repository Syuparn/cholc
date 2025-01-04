import { Button } from "@chakra-ui/react";

function DefaultButton({ name, disabled, colorPalette }: {name: string, disabled: boolean, colorPalette: string}) {
  // TODO: onclick
  return (
    <Button
      colorPalette={colorPalette}
      disabled={disabled}
      size="xl"
      fontFamily="monospace"
    >
      {/* HACK: pad text to make all buttons same size */}
      {name.padEnd(2, "\u{00A0}").padStart(3, "\u{00A0}")}
    </Button>
  )
}

export default DefaultButton
