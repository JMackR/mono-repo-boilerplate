import React, { SyntheticEvent } from "react"
import { AppBar, Toolbar } from "@material-ui/core"

type PropsType = {
  handlePrevStep: (event: SyntheticEvent) => void;
}

export const Header: React.FC<PropsType> = props => (
  <AppBar className="header">
    <Toolbar>
      <span className="back" onClick={e => props.handlePrevStep(e)}>
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
        &nbsp;Back
      </span>
    </Toolbar>
  </AppBar>
)
