import React from "react"
import { AffirmRejectDialogProps } from "./affirm-reject-dialog.props"
import invariant from "invariant"

export const AffirmRejectDialog: React.FC<AffirmRejectDialogProps> = () => {
  invariant(false, "AffirmRejectDialog is only for native.")
  return <div />
}
