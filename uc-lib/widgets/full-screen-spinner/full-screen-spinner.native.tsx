import React from "react"
import { Animated, Easing, BackHandler } from "react-native"
import { LoadingState } from "../../hooks/loading/loading-common"
import { Overlay } from "../../controls/layout/overlay"
import { useSpinnerState, SPINNER_TRANSITION_DURATION } from "./use-spinner-state"
import { SpinnerContents } from "./spinner-contents"

export const FullScreenSpinner = () => {
  const [opacityAnimation] = React.useState(new Animated.Value(0))

  const startFadeInTransition = () => {
    opacityAnimation.stopAnimation()
    Animated.timing(opacityAnimation, {
      duration: SPINNER_TRANSITION_DURATION,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  const startFadeOutTransition = () => {
    opacityAnimation.stopAnimation()
    Animated.timing(opacityAnimation, {
      duration: SPINNER_TRANSITION_DURATION,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  const { loadingState, displayMessage } = useSpinnerState({
    startFadeInTransition,
    startFadeOutTransition,
  })

  React.useEffect(() => {
    const backHandler =
      loadingState !== LoadingState.NotLoading ? BackHandler.addEventListener("hardwareBackPress", () => true) : undefined
    return () => backHandler?.remove()
  }, [loadingState])

  if (loadingState === LoadingState.NotLoading) {
    return null
  }

  return (
    <Overlay grow={1} insetTopStep={0} insetLeftStep={0} insetRightStep={0} insetBottomStep={0}>
      <Animated.View style={{ flex: 1, opacity: opacityAnimation }}>
        <SpinnerContents loadingState={loadingState} displayMessage={displayMessage} />
      </Animated.View>
    </Overlay>
  )
}
