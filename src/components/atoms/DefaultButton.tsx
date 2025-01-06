import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { SourceContext } from "../../modules/context/source";
import { EditableContext } from "../../modules/context/editable";

function DefaultButton({ name, disabled, colorPalette, onClick }: {name: string, disabled: boolean, colorPalette: string, onClick: () => void}) {
  const {source, setSource} = useContext(SourceContext)
  const {editable} = useContext(EditableContext)

  const commonOnClick = () => {
    // append token written on this button
    const newSource = source ? source + " " + name : name
    setSource(newSource)
  }

  const mergedOnClick = () => {
    commonOnClick()
    onClick()
  }

  return (
    <Button
      colorPalette={colorPalette}
      disabled={disabled || !editable}
      size="lg"
      fontFamily="monospace"
      _active={{bg: "orange"}}
      onClick={mergedOnClick}
      margin="-0.5em"
    >
      {/* HACK: pad text to make all buttons same size */}
      {name.padStart(2, "\u{00A0}").padEnd(3, "\u{00A0}")}
    </Button>
  )
}

export default DefaultButton
