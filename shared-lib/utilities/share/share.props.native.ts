export interface ShareContent {
  title?: string
  message?: string
  url?: string
}

export interface ShareOptions {
  subject?: string
  excludedActivityTypes?: string[]
  tintColor?: string
  dialogTitle?: string
  skipUrlMutation?: boolean
}
