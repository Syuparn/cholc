import { Center, Heading, VStack } from '@chakra-ui/react'
import Playground from './components/pages/Playground'

function App() {
  return (
    <>
      <Center>
        <VStack>
          <Heading size="5xl">
            Cholc Playground
          </Heading>

          <Playground />
        </VStack>
      </Center>
    </>
  )
}

export default App
