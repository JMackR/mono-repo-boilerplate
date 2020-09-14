export interface GoogleLoginButtonProps {
  onClick?: () => void
  onFailure?: (err: Error) => void
  onCancel?: () => void
  onSuccess: () => void
  testID?: string
}
