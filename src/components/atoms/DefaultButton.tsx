import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { SourceContext } from "../../modules/context/source";

function DefaultButton({ name, disabled, colorPalette, onClick }: {name: string, disabled: boolean, colorPalette: string, onClick: () => void}) {
  const {source, setSource} = useContext(SourceContext)

  const commonOnClick = () => {
    // append token written on this button
    setSource(source + " " + name)
  }

  const mergedOnClick = () => {
    commonOnClick()
    onClick()
  }


  return (
    <Button
      colorPalette={colorPalette} // TODO: change color when the chord is played
      disabled={disabled}
      size="xl"
      fontFamily="monospace"
      _active={{bg: "orange"}}
      onClick={mergedOnClick}
    >
      {/* HACK: pad text to make all buttons same size */}
      {name.padStart(2, "\u{00A0}").padEnd(3, "\u{00A0}")}
    </Button>
  )
}

export default DefaultButton
