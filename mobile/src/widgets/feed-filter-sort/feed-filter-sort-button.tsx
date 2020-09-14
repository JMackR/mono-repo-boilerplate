import React, { FC } from "react"
import { View, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity } from "react-native"
import { useColor, Stack, Text } from "uc-lib"
import { FeedFilterSortButtonProps } from "./feed-filter-sort.d"

const SEPARAION_MARGIN = 1
export const FeedFilterSortButton: FC<FeedFilterSortButtonProps> = ({ icon, text, onClick, active, testID }) => {
  const { colors } = useColor()
  const STYLES = StyleSheet.create({
    container: {
      backgroundColor: active ? colors.green : colors.limestone,
      borderRadius: 4,
      padding: 8,
      marginRight: 4,
    },
  })
  const TouchchableButton = Platform.select({
    ios: TouchableOpacity,
    android: TouchableNativeFeedback,
  })
  return (
    <TouchchableButton onPress={onClick}>
      <View style={STYLES.container}>
        <Stack direction="row" childSeparationStep={SEPARAION_MARGIN}>
          {icon && icon}
          <Text
            textType="secondaryBody1"
            color={active ? "primaryAlt" : "primary"}
            testID={testID || "portfolio-filter-sort-button"}
          >
            {text}
          </Text>
        </Stack>
      </View>
    </TouchchableButton>
  )
}
