import { useState } from "react"
import { SourceContext } from "../../modules/context/source"
import Chords from "../organisms/Chords"
import Source from "../organisms/Source"

function Playground() {
  const [sourceCode, setSourceCode] = useState('')

  return (
    <>
      <SourceContext.Provider value={{source: sourceCode, setSource: setSourceCode}}>
        <Chords />
        <Source />
      </SourceContext.Provider>
    </>
  )
}

export default Playground
