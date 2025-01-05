import { useContext } from "react"
import { ResultContext } from "../../modules/context/result"
import { Heading, Textarea, VStack } from "@chakra-ui/react"

function Result() {
  const {result, setResult} = useContext(ResultContext)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResult(e.target.value)
  }

  return (
    <VStack width="80%">
      <Heading>
        Result
      </Heading>
      <Textarea
        fontFamily="monospace"
        fontSize="lg"
        rows={1}
        value={result}
        onChange={onChange}
      />
    </VStack>
  )
}

export default Result
