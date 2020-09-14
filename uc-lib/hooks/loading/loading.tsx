import React, { useContext, useState } from "react"
import { FullScreenSpinner } from "../../widgets/full-screen-spinner/full-screen-spinner"
import { LoadingState } from "./loading-common"

export interface LoadingContext {
  loadingState: LoadingState
  setLoadingState: (loadingState: LoadingState) => void
  displayMessage?: string
  setDisplayMessage: (displayMessage?: string) => void
}

const LoadingContext = React.createContext<LoadingContext>({
  loadingState: LoadingState.NotLoading,
  setLoadingState: () => {},
  displayMessage: undefined,
  setDisplayMessage: () => {},
})

export const LoadingContextProvider: React.FC = props => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.NotLoading)
  const [displayMessage, setDisplayMessage] = useState<string>()

  return (
    <LoadingContext.Provider
      value={{
        loadingState,
        setLoadingState,
        displayMessage,
        setDisplayMessage,
      }}
    >
      {props.children}
      <FullScreenSpinner />
    </LoadingContext.Provider>
  )
}

const SUCCESS_DIALOG_TIMET = 2000

export const useLoadingState = () => {
  const { loadingState, setLoadingState, displayMessage, setDisplayMessage } = useContext(LoadingContext)

  const startLoading = (loadingMessage?: string) => {
    setDisplayMessage(loadingMessage)
    setLoadingState(LoadingState.Loading)
  }
  const setSuccessful = (successMessage?: string, successDismissalCallback?: () => void) => {
    setDisplayMessage(successMessage)
    setLoadingState(LoadingState.Successful)
    setTimeout(() => {
      setLoadingState(LoadingState.NotLoading)
      successDismissalCallback && successDismissalCallback()
    }, SUCCESS_DIALOG_TIMET)
  }

  const stopLoading = () => {
    setLoadingState(LoadingState.NotLoading)
    setDisplayMessage(undefined)
  }

  return {
    loadingState,
    displayMessage,
    startLoading,
    setSuccessful,
    stopLoading,
  }
}
