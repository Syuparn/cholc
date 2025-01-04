import { Table } from "@chakra-ui/react"
import ChordButton from "../molecules/ChordButton"
import DummyButton from "../molecules/DummyButton"

function Chords() {
  return (
    <Table.Root>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <DummyButton />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="C" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="G" />
          </Table.Cell>
          <Table.Cell>
            <DummyButton />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}

export default Chords
