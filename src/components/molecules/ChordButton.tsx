import DefaultButton from "../atoms/DefaultButton";

function ChordButton({ name }: {name: string}) {
  return (
    <DefaultButton
      name={name}
      disabled={false}
    />
  )
}

export default ChordButton
