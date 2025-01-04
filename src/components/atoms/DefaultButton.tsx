import { Button } from "@chakra-ui/react";

function DefaultButton({ name, disabled }: {name: string, disabled: boolean}) {
  // TODO: onclick
  return (
    <Button colorPalette="pink" disabled={disabled}>
      {name}
    </Button>
  )
}

export default DefaultButton
