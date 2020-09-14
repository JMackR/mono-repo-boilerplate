import { AffirmRejectDialogProps } from "uc-lib"
export type AffirmRejectDialogScreenProps = Pick<
  AffirmRejectDialogProps,
  "onAffirm" | "onReject" | "onShow" | "affirmText" | "rejectText" | "title" | "body" | "dismissOnReject" | "icon"
>
