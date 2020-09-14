import React from "react"
import { useLoadingState, LoadingState } from "../../hooks/loading"
import { AnimationType } from "../../animations/animation-constants"

interface SpinnerStateProps {
  startFadeInTransition: () => void
  startFadeOutTransition: () => void
}

export const SPINNER_TRANSITION_DURATION = AnimationType.LargeElement

export const useSpinnerState = (props: SpinnerStateProps) => {
  const { loadingState: contextDrivenState, displayMessage: contextDrivenDisplayMessage } = useLoadingState()
  const [localLoadingState, setLocalLoadingState] = React.useState(contextDrivenState)
  const [localDisplayMessage, setLocalDisplayMessage] = React.useState(contextDrivenDisplayMessage)

  const handleLoadingStateChanged = () => {
    if (contextDrivenState === LoadingState.Loading) {
      setLocalLoadingState(contextDrivenState)
      setImmediate(() => {
        props.startFadeInTransition()
      })
    } else if (contextDrivenState === LoadingState.Successful) {
      setLocalLoadingState(contextDrivenState)
      if (localLoadingState === LoadingState.NotLoading) {
        props.startFadeInTransition()
      }
    } else if (contextDrivenState === LoadingState.NotLoading) {
      props.startFadeOutTransition()
      setTimeout(() => {
        setLocalLoadingState(contextDrivenState)
      }, SPINNER_TRANSITION_DURATION)
    }
  }
  React.useEffect(handleLoadingStateChanged, [contextDrivenState])

  const handleDisplayMessageChanged = () => {
    let displayMessageToRender = contextDrivenDisplayMessage
    if (!displayMessageToRender) {
      if (localLoadingState === LoadingState.Loading) {
        displayMessageToRender = "Loading"
      } else if (localLoadingState === LoadingState.Successful) {
        displayMessageToRender = "Success"
      }
    }
    if (localDisplayMessage !== displayMessageToRender) {
      setLocalDisplayMessage(displayMessageToRender)
    }
  }
  React.useEffect(handleDisplayMessageChanged, [localLoadingState])

  return {
    loadingState: localLoadingState,
    displayMessage: localDisplayMessage,
  }
}
