import { useContext } from "react"
import { InputContext } from "../../modules/context/input"
import { Heading, Textarea, VStack } from "@chakra-ui/react"

function Input() {
  const {input, setInput} = useContext(InputContext)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  return (
    <VStack width="80%">
      <Heading>
        Input
      </Heading>
      <Textarea
        fontFamily="monospace"
        fontSize="lg"
        rows={1}
        value={input}
        onChange={onChange}
      />
    </VStack>

  )
}

export default Input
