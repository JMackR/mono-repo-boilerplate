import { LocalSVGSource } from "../../controls"

export interface AffirmRejectDialogProps {
  onAffirm: () => void
  onReject?: () => void
  onShow?: () => void
  dismiss: () => void
  affirmText: string
  rejectText?: string
  title: string
  body: string
  icon?: LocalSVGSource
  dismissOnReject?: boolean
}

export interface AffirmRejectButtonProps {
  onReject: () => void
  text?: string
}
