import { Table } from "@chakra-ui/react"
import ChordButton from "../molecules/ChordButton"
import DummyButton from "../molecules/DummyButton"
import ForButton from "../molecules/ForButton"
import EndForButton from "../molecules/EndForButton"
import InputButton from "../molecules/InputButton"
import OutputButton from "../molecules/OutputButton"

function Chords() {
  return (
    <Table.Root width="80%">
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <ChordButton name="F" colorPalette="cyan"/>
          </Table.Cell>
          <Table.Cell>
            <DummyButton colorPalette="cyan" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="C" colorPalette="cyan" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="G" colorPalette="cyan" />
          </Table.Cell>
          <Table.Cell>
            <DummyButton  colorPalette="cyan"/>
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="D" colorPalette="cyan" />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <DummyButton colorPalette="cyan"/>
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="Dm" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="Am" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="Em" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="Bm" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <DummyButton colorPalette="cyan" />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <ChordButton name="Bb" colorPalette="cyan" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="Gm" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <ForButton colorPalette="gray" />
          </Table.Cell>
          <Table.Cell>
            <EndForButton colorPalette="gray" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="F#m" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="A" colorPalette="cyan" />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <ChordButton name="Eb" colorPalette="cyan" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="Cm" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <InputButton colorPalette="gray" />
          </Table.Cell>
          <Table.Cell>
            <OutputButton colorPalette="gray" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="C#m" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="E" colorPalette="cyan" />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <DummyButton colorPalette="cyan" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="Fm" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="Bbm" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="Ebm" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="G#m" colorPalette="teal" />
          </Table.Cell>
          <Table.Cell>
            <DummyButton colorPalette="cyan" />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <ChordButton name="Ab" colorPalette="cyan" />
          </Table.Cell>
          <Table.Cell>
            <DummyButton colorPalette="cyan"/>
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="Db" colorPalette="cyan" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="Gb" colorPalette="cyan" />
          </Table.Cell>
          <Table.Cell>
            <DummyButton colorPalette="cyan" />
          </Table.Cell>
          <Table.Cell>
            <ChordButton name="B" colorPalette="cyan" />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}

export default Chords
