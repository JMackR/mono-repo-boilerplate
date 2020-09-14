import { LocalSVGSource } from "uc-lib"

export interface PermissionDialogProps {
  title: string
  prompt: string
  localSVGSource?: LocalSVGSource
  onGranted(): void
  onDenied(): void
}
