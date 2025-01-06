import { Button } from "@chakra-ui/react";

function MemoryButton({ name, colorPalette }: {name: string, colorPalette: string}) {
  return (
    <Button
      fontFamily="monospace"
      colorPalette={colorPalette}
      margin="-0.8em"
      padding="0"
      size="xs"
    >
      {/* HACK: pad text to make all buttons same size */}
      {name.padStart(2, "\u{00A0}").padEnd(3, "\u{00A0}")}
    </Button>
  )
}

export default MemoryButton
