import { Center, LocalSVGSource, Stack, SVG, Text } from "uc-lib"
import React from "react"
import { Touchable } from "../../controls"

export const VerificationIndicator = ({
  text,
  icon,
  testID,
  onClick,
}: {
  text: string
  icon: LocalSVGSource
  testID?: string
  onClick?: () => void
}) => (
  <Stack direction="column" childSeparationStep={2} width="19%" crossAxisDistribution="center" axisDistribution="center">
    <Touchable onPress={onClick} testID={(testID || "uc-lib.verification-indicator") + ".button"}>
      <SVG localSVG={icon} />
      <Center>
        <Text
          whiteSpace="pre-wrap"
          textAlign="center"
          textType="tertiaryBody1"
          testID={(testID || "uc-lib.verification-indicator") + ".text"}
        >
          {text}
        </Text>
      </Center>
    </Touchable>
  </Stack>
)
