import React from "react"
import { ClickableBaseProps } from "./clickable.d"
import invariant from "invariant"

export const ClickableWithoutFeedback: React.FC<ClickableBaseProps> = _props => {
  invariant(false, "ClickableWithoutFeedback is native only")
  return <></>
}
