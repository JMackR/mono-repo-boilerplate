import { useColorForBackgroundColor } from "uc-lib"
import React, { useRef, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import Animated from "react-native-reanimated"
import {
  ModalCardContextProvider,
  ModalCardCollapseListenerController,
  ModalCardOpenListenerController,
  ModalHostContext,
} from "./context"
import { ModalCard } from "./modal-card"
import { ModalCardHostProps } from "./modal-card-host.props"
import invariant from "invariant"
import { ModalCardProps } from "./modal-card.props"
import { Keyboard } from "../../utilities/keyboard/keyboard"
import { Navigation } from "../../navigation/navigation"

/**
 * Model host is responsible for rendering essentially a blank screen, that renders both the modal card, and the overlay that gets darker as the card moves up.
 * @param props
 */
export const ModalCardHost = (props: ModalCardHostProps) => {
  const { modalProps } = props
  invariant(modalProps !== undefined, "modal_props must be defined")

  return (
    <ModalCardContextProvider modalProps={modalProps}>
      <RenderOnlyModal {...modalProps} />
    </ModalCardContextProvider>
  )
}

/**
 * Renders as an overlay, dimming the background contents.
 */
const RenderOnlyModal: React.FC<ModalCardProps> = props => {
  const { collapseOnOutsidePress = true } = props
  const bottomSheetProgress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Keyboard.setAdjustPan()
  }, [])

  const animatedContentOpacity = Animated.interpolate(bottomSheetProgress, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Animated.Extrapolate.CLAMP,
  })

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
      // backgroundColor: useColorForBackgroundColor("primary"),
    },
  })

  const onCloseStart = () => {
    ModalCardCollapseListenerController.invokeCollapseListeners()
  }

  const onCloseEnd = () => {
    Navigation.performWhenAvailable(() => {
      Navigation.goBack()
    })
  }

  const onOpenEnd = () => {
    ModalCardOpenListenerController.invokeOpenListeners()
  }
  const { collapse } = React.useContext(ModalHostContext)

  const handleTouchEndCapture = () => {
    collapseOnOutsidePress === true && collapse()
  }

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        onTouchEndCapture={handleTouchEndCapture}
        style={[
          styles.container,
          {
            opacity: animatedContentOpacity,
          },
        ]}
      />
      <ModalCard
        callbackProgress={bottomSheetProgress}
        onOpenEnd={onOpenEnd}
        onCloseStart={onCloseStart}
        onCloseEnd={onCloseEnd}
        {...props}
      />
    </View>
  )
}
