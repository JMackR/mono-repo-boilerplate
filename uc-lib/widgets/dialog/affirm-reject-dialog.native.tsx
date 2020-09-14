import React, { FC } from "react"
import { AffirmRejectDialogContent } from "./affirm-reject-dialog-content"
import { AffirmRejectDialogProps } from "./affirm-reject-dialog.props"
import { Dialog } from "./dialog.native"

export const AffirmRejectDialog: FC<AffirmRejectDialogProps> = props => {
  return (
    <Dialog>
      <AffirmRejectDialogContent {...props} />
    </Dialog>
  )
}
