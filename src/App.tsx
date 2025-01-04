import { Center, Heading, VStack } from '@chakra-ui/react'
import Playground from './components/pages/Playground'

function App() {
  return (
    <>
      <Center>
        <VStack>
          <Heading size="5xl">
            Cholc
          </Heading>
          <Heading size="xl">
            Let's play and execute your chord progressions!
          </Heading>

          <Playground />
        </VStack>
      </Center>
    </>
  )
}

export default App
