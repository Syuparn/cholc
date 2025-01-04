import React from 'react'

type EditableState = {
  editable: boolean,
  setEditable: React.Dispatch<React.SetStateAction<boolean>>,
}

export const EditableContext = React.createContext<EditableState>({editable: true, setEditable: () => {}})
