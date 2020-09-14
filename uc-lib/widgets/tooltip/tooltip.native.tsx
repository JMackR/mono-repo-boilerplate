import { ActionClose, Background, Border, LocalSVGSource, Margin, Overlay, SVG, Text, useColor } from "uc-lib"
import React, { FC } from "react"
import { Modal, StyleSheet, View, TouchableOpacity } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { Pointer } from "./tooltip-pointer.native"
import { TooltipProps } from "./tooltip-props.native"

const CloseIconSvg: LocalSVGSource = {
  SVG: ActionClose.SVG,
  size: {
    height: 12,
    width: 12,
  },
}

export const Tooltip: FC<TooltipProps> = ({ tooltipRect, clickComponentRect, children, onClose, type }) => {
  const { colors } = useColor()
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      left: tooltipRect.x,
      top: tooltipRect.y,
      width: tooltipRect.width,
      height: tooltipRect.height,
      minHeight: tooltipRect.height,
      display: "flex",
      shadowColor: colors.obsidian,
      shadowOpacity: 0.15,
      shadowOffset: {
        width: 2,
        height: 2,
      },
    },
  })

  const isPrimartyType = type === "primary"

  const CloseButon = () => (
    <Overlay insetRightStep={1} insetTopStep={1}>
      <TouchableWithoutFeedback onPress={onClose}>
        <SVG localSVG={CloseIconSvg} onPress={onClose} tint={isPrimartyType ? "secondary" : "alwaysDark"} />
      </TouchableWithoutFeedback>
    </Overlay>
  )

  return (
    <View collapsable={false}>
      <Modal animationType="fade" visible={true} transparent={true} onDismiss={onClose} onRequestClose={onClose}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} activeOpacity={1}>
          <View style={styles.container}>
            <Border height="100%" width="100%" cornerRadius="small" color="limestone" lineWeight="light">
              <Background type={type} />
              <Margin marginStep={4} marginRightStep={6}>
                <Text textType="tertiaryBody1" color={type === "primary" ? "secondary" : "alwaysDark"}>
                  {children}
                </Text>
              </Margin>
              {isPrimartyType && <CloseButon />}
            </Border>
            <Pointer
              isDown={tooltipRect.y < clickComponentRect.y}
              tooltipRect={tooltipRect}
              clickComponentRect={clickComponentRect}
              type={type}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

Tooltip.defaultProps = {
  type: "primary",
}
