import React from 'react'

import MaterialTextField, { TextFieldProps } from '@material-ui/core/TextField'

const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <div>
      <div>{props.label || "Invalid label"}</div>
      <MaterialTextField {...props} label="" variant="outlined" />
    </div>
  )
}

export default TextField
