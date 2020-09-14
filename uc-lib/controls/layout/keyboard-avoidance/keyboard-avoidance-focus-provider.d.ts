export interface KeyboardAvoidanceFocus {
  keyboardAvoidanceFocus: (focusId: string) => void
  keyboardAvoidanceBlur: (focusId: string) => void
  // TODO: remove when https://redibs.atlassian.net/browse/CLIENT-4034 is done
  generateFocusId: () => string
}

export interface KeyboardAvoidanceFocusProps {
  viewId?: string
  groupId?: string
  children?: React.ReactNode
}
