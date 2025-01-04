import { Button } from "@chakra-ui/react";

function DefaultButton({ name, disabled, colorPalette }: {name: string, disabled: boolean, colorPalette: string}) {
  // TODO: onclick
  return (
    <Button
      colorPalette={colorPalette} // TODO: change color when the chord is played
      disabled={disabled}
      size="xl"
      fontFamily="monospace"
      _active={{bg: "orange"}}
    >
      {/* HACK: pad text to make all buttons same size */}
      {name.padStart(2, "\u{00A0}").padEnd(3, "\u{00A0}")}
    </Button>
  )
}

export default DefaultButton
