import { useCallback, useContext } from "react"
import { SourceContext } from "../../modules/context/source"
import { Button, Heading, HStack, Textarea, VStack } from "@chakra-ui/react"
import { helloworld } from "../../modules/cholc/samplecode"
import { sourceToQuery } from "../../modules/cholc/link/encode"

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

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(source);
  }, [source])

  const shareLink = useCallback(async () => {
    const query = sourceToQuery(source)
    const url = `${location.protocol}//${location.host}${location.pathname}?p=${query}`
    await navigator.clipboard.writeText(url);
  }, [source])

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
        <Button
          colorPalette="teal"
          size="2xs"
          padding="0.5em"
          marginTop="-0.5em"
          onClick={copy}
        >
          Copy
        </Button>
        <Button
          colorPalette="teal"
          size="2xs"
          padding="0.5em"
          marginTop="-0.5em"
          onClick={shareLink}
        >
          Share link
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
