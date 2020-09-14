import React from "react"
import { ClickableHighlightProps } from "./clickable.d"
import invariant from "invariant"

export const ClickableHighlight: React.FC<ClickableHighlightProps> = _props => {
  invariant(false, "ClickableHighlight is native only")
  return <></>
}
