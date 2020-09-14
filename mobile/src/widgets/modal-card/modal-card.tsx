import React, { useContext, useLayoutEffect } from "react"
import { useMargin, useColorForBackgroundColor } from "uc-lib"
import { StyleSheet, View, Platform } from "react-native"
import BottomSheet from "reanimated-bottom-sheet"
import { ModalHostContext } from "./context"
import { ModalHeader } from "./modal-card-header"
import { ModalCardProps } from "./modal-card.props"

export const CARD_CORNER_RADIUS = 8
const DEFAULT_CALLBACK_THRESHOLD = 0.1
const WORKARND_DELAY_TO_PREVENT_CLOSE_CALLBACKS_TOO_EARLY = 200

/**
 * ModalCard. Do not use directly. Must be a child of ModalCardHost
 * @param props
 */
export const ModalCard = (props: ModalCardProps) => {
  const {
    useHeaderRadius,
    disableDefaultNavigationBar,
    content,
    callbackProgress,
    onCloseStart,
    onCloseEnd,
    onOpenStart,
    onOpenEnd,
  } = props

  const { ref, refSafeSnapTo, snapPoints, snapIndex } = useContext(ModalHostContext)

  // This boolean ref is required due to an existing bug in BottomSheet on iOS
  // that causes onCloseEnd to be fired before any other callbacks.
  // https://github.com/osdnk/react-native-reanimated-bottom-sheet/issues/136
  const allowCloseEndToFire = React.useRef(false)
  React.useEffect(() => {
    setTimeout(() => {
      allowCloseEndToFire.current = true
    }, WORKARND_DELAY_TO_PREVENT_CLOSE_CALLBACKS_TOO_EARLY)
  }, [])

  const margin = useMargin().baseMargin

  useLayoutEffect(() => {
    refSafeSnapTo(snapIndex)
  }, [snapIndex, snapPoints])

  const cardCornerRadius = disableDefaultNavigationBar ? (useHeaderRadius ? CARD_CORNER_RADIUS : 0) : 0

  const styles = StyleSheet.create({
    content: {
      height: "100%",
      backgroundColor: "transparent",
      paddingHorizontal: margin,
      borderTopLeftRadius: cardCornerRadius,
      borderTopRightRadius: cardCornerRadius,
      overflow: "hidden",
    },
  })

  const WrappedHeader = () => {
    return <ModalHeader {...props} />
  }

  const WrappedContent = () => {
    return <View style={styles.content}>{content()}</View>
  }

  const onCloseStartInternal = () => {
    if (!allowCloseEndToFire.current) {
      return
    }

    onCloseStart && onCloseStart()
  }

  const onCloseEndInternal = () => {
    if (!allowCloseEndToFire.current) {
      return
    }
    onCloseEnd && onCloseEnd()
  }

  const onOpenStartInternal = () => {
    onOpenStart && onOpenStart()
  }

  const onOpenEndInternal = () => {
    onOpenEnd && onOpenEnd()
  }

  const renderHeader = () => <WrappedHeader />

  const renderContent = () => <WrappedContent />

  const enableContentGesture = Platform.OS === "ios"

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      renderHeader={renderHeader}
      renderContent={renderContent}
      enabledContentGestureInteraction={false}
      enabledContentTapInteraction={true}
      enabledImperativeSnapping={true}
      enabledBottomClamp={false}
      onCloseEnd={onCloseEndInternal}
      onCloseStart={onCloseStartInternal}
      onOpenStart={onOpenStartInternal}
      onOpenEnd={onOpenEndInternal}
      callbackNode={callbackProgress}
      callbackThreshold={DEFAULT_CALLBACK_THRESHOLD}
    />
  )
}
