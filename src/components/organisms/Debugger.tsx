import { useContext } from "react"
import { MemoryViewContext } from "../../modules/context/memoryview"
import { Heading, Table, VStack } from "@chakra-ui/react"
import MemoryButton from "../atoms/MemoryButton"

function toChr(n: number): string {
  if (n < 32 || n > 127) {
    return ""
  }
  return String.fromCharCode(n)
}

function Debugger() {
  const {memoryView} = useContext(MemoryViewContext)

  if (memoryView.length === 0) {
    return (
      <>
      </>
    )
  }

  return (
    <VStack width="80%">
      <Heading>
        Memory
      </Heading>
      <Table.Root mt="-0.5em">
        <Table.Row>
          <Table.Cell>
            <MemoryButton
              name="Addr"
              colorPalette="cyan"
            />
          </Table.Cell>
          {memoryView.map((elem, i) => (
            <Table.Cell key={i}>
              <MemoryButton
                name={elem.address.toString()}
                colorPalette={elem.isRefferred ? "yellow" : "cyan"}
              />
            </Table.Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <MemoryButton
              name="Val"
              colorPalette="teal"
            />
          </Table.Cell>
          {memoryView.map((elem, i) => (
            <Table.Cell key={i}>
              <MemoryButton
                name={elem.value.toString()}
                colorPalette={elem.isRefferred ? "yellow" : "teal"}
              />
            </Table.Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <MemoryButton
              name="Chr"
              colorPalette="purple"
            />
          </Table.Cell>
          {memoryView.map((elem, i) => (
            <Table.Cell key={i}>
              <MemoryButton
                name={((s) => s ? `'${s}'`: "")(toChr(elem.value))}
                colorPalette={elem.isRefferred ? "yellow" : "purple"}
              />
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Root>
    </VStack>
  )
}

export default Debugger
