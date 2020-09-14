export interface KeyboardAvoidanceViewLayout {
  x: number
  y: number
  width: number
  height: number
  containerId: string
  containerInfo?: any
}

export type KeyboardAvoidanceGetLayout = (
  callback: (measuredLayout?: { x: number; y: number; width: number; height: number }) => void,
) => void
export type KeyboardAvoidanceMeasureViewCallback = (measuredLayout?: KeyboardAvoidanceViewLayout) => void
export type KeyboardAvoidanceMeasureView = (
  viewId: string,
  attribs: KeyboardAvoidanceViewAttributes,
  callback: KeyboardAvoidanceMeasureViewCallback,
) => void
export type KeyboardAvoidanceAnimateForShown = (
  layout: KeyboardAvoidanceViewLayout,
  keyboardY: number,
  duration: number,
  nativeEvent?: any,
) => void
export type KeyboardAvoidanceAnimateForHidden = (duration: number, nativeEvent?: any) => void
export interface KeyboardAvoidanceViewAttributes {
  containerId: string
  getLayout: KeyboardAvoidanceGetLayout
  viewInfo?: any
  activeInGroups?: string[]
  stackOrder?: number
}

export interface KeyboardAvoidanceContainerAttributes {
  measureView: KeyboardAvoidanceMeasureView
  animateForShown: KeyboardAvoidanceAnimateForShown
  animateForHidden: KeyboardAvoidanceAnimateForHidden
}

export interface KeyboardAvoidanceFocusEvent {
  focusId: string
  viewId: string
  groupId?: string
}

export interface KeyboardAvoidanceBlurEvent {
  focusId: string
}

export interface KeyboardAvoidancePostAnimatingMeasurementsDictionary {
  [index: string]: {
    attribs: KeyboardAvoidanceViewAttributes
    callback: KeyboardAvoidanceMeasureViewCallback
  }
}

export interface KeyboardAvoidance {
  keyboardAvoidingViewDidChangeLayout: (viewId: string) => void
  didFocusEvent: (e: KeyboardAvoidanceFocusEvent) => void
  didBlurEvent: (e: KeyboardAvoidanceBlurEvent) => void
  addKeyboardAvoidingView: (viewAttributes: KeyboardAvoidanceViewAttributes) => string
  removeKeyboardAvoidingView: (viewId: string) => void
  addKeyboardAvoidingContainer: (containerAttributes: KeyboardAvoidanceContainerAttributes) => string
  removeKeyboardAvoidingContainer: (containerId: string) => void
  updateKeyboardAvoidingContainer: (containerId: string, containerAttributes: KeyboardAvoidanceContainerAttributes) => void
}
