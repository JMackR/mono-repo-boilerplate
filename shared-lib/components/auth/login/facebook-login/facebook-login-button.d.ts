import { Exception } from "shared-lib"
export interface FacebookLoginButtonProps {
  onClick?: () => void
  onFailure?: (err: Error | { ouException: Exception }) => void
  onCancel?: () => void
  onSuccess: () => void
  testID?: string
}
