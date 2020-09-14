import React, { FC } from "react"
import { Margin, Flex, Button } from "uc-lib"
import { KeyboardAvoidingView } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { ButtonPropsNative } from "uc-lib/controls/button/button-props.native"

const MARGIN = 4

export const KeyboardAvoidingButton: FC<ButtonPropsNative> = props => {
  const insets = useSafeArea()
  return (
    <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={insets.bottom}>
      <Margin marginBottomStep={MARGIN} marginLeftStep={MARGIN} marginRightStep={MARGIN} grow={1} direction={"column"}>
        <Flex grow={1} direction={"column"} axisDistribution={"flex-end"}>
          <Button {...props} />
        </Flex>
      </Margin>
    </KeyboardAvoidingView>
  )
}
