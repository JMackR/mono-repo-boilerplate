import React from "react"
import { css, StyleSheet } from "aphrodite/no-important"
import { LoadingState } from "../../hooks/loading/loading-common"
import { useSpinnerState, SPINNER_TRANSITION_DURATION } from "./use-spinner-state"
import { useColorForBackgroundColor } from "../../themes/hooks/use-color"
import { SpinnerContents } from "./spinner-contents"

const EASING_TYPE = "ease-in-out"

export const FullScreenSpinner = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const startFadeInTransition = () => {
    if (containerRef.current && containerRef.current.animate) {
      containerRef.current.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: SPINNER_TRANSITION_DURATION,
        easing: EASING_TYPE,
      })
    }
  }

  const startFadeOutTransition = () => {
    if (containerRef.current && containerRef.current.animate) {
      containerRef.current.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: SPINNER_TRANSITION_DURATION,
        easing: EASING_TYPE,
      })
    }
  }

  const { loadingState, displayMessage } = useSpinnerState({
    startFadeInTransition,
    startFadeOutTransition,
  })

  const overlayColor = useColorForBackgroundColor("overlay")
  const styles = React.useMemo(() => {
    return StyleSheet.create({
      full_screen_spinner: {
        display: "flex",
        position: "fixed",
        zIndex: 200,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: overlayColor,
      },
    })
  }, [])

  if (loadingState === LoadingState.NotLoading) {
    return null
  }

  return (
    <div ref={containerRef} className={css(styles.full_screen_spinner)}>
      <SpinnerContents loadingState={loadingState} displayMessage={displayMessage} />
    </div>
  )
}
