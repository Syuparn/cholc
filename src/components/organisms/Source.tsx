import { useContext } from "react"
import { SourceContext } from "../../modules/context/source"
import { Button, Heading, HStack, Textarea, VStack } from "@chakra-ui/react"
import { helloworld } from "../../modules/cholc/samplecode"

function Source() {
  const {source, setSource} = useContext(SourceContext)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSource(e.target.value)
  }

  const deleteSource = () => {
    setSource("")
  }

  const useSample = () => {
    setSource(helloworld)
  }

  return (
    <VStack width="80%">
      <Heading>
        Source "Chord"
      </Heading>
      <HStack>
        <Button
          colorPalette="teal"
          size="2xs"
          padding="0.5em"
          marginTop="-0.5em"
          onClick={deleteSource}
        >
          Delete
        </Button>
        <Button
          colorPalette="teal"
          size="2xs"
          padding="0.5em"
          marginTop="-0.5em"
          onClick={useSample}
        >
          Use sample
        </Button>
      </HStack>
      <Textarea
        fontFamily="monospace"
        fontSize="lg"
        rows={1}
        value={source}
        onChange={onChange}
      />
    </VStack>
  )
}

export default Source
