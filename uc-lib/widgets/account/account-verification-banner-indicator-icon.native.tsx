import { Center, LocalSVGSource, Stack, SVG, Text, Flex } from "uc-lib"
import React from "react"
import { TouchableOpacity } from "react-native"

export const VerificationIndicator = ({
  text,
  icon,
  onClick,
}: {
  text: string
  icon: LocalSVGSource
  onClick?: () => void
}) => (
  <Flex direction="column" width="19%">
    <TouchableOpacity onPress={onClick}>
      <Stack direction="column" childSeparationStep={2} crossAxisDistribution="center" axisDistribution="center">
        <SVG localSVG={icon} />
        <Center>
          <Text whiteSpace="pre-wrap" textAlign="center" textType="secondaryBody1">
            {text}
          </Text>
        </Center>
      </Stack>
    </TouchableOpacity>
  </Flex>
)
