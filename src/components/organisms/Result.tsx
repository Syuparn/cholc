import { useContext } from "react"
import { SourceContext } from "../../modules/context/source"
import { Heading, Textarea, VStack } from "@chakra-ui/react"

function Source() {
  const {source, setSource} = useContext(SourceContext)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSource(e.target.value)
  }

  return (
    <VStack width="80%">
      <Heading>
        Source "Chord"
      </Heading>
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
