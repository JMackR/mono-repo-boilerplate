import React from "react"
import { Text as RNText, TextStyle } from "react-native"
import { useColorForTextColor, useFontForTextType } from "uc-lib/themes"
import { TextProps } from "./text.props.native"
import { mergeStyles } from "../../utils/styles"
import { iif } from "../../utils"

const autoLineHeight = {
  lineHeight: undefined,
} as TextStyle

const Text: React.FunctionComponent<TextProps> = props => {
  const {
    numberOfLines,
    children,
    text,
    textType,
    textAlign,
    textDecorationLine,
    onPress,
    testID,
    onTextLayout,
    selectable,
  } = props
  const font = useFontForTextType(textType ? textType : "primaryBody1")
  const color = useColorForTextColor(props.color ? props.color : "primary")
  const content = text || children

  /**
   * TODO Add Memoization
   */
  // const style = mergeStyles(
  //   iif(numberOfLines === 1, autoLineHeight), // The first time we need an exception, add props
  //   iif(color, { color }),
  // ) as TextStyle
  return (
    <RNText
      style={[font, { color, textAlign, textDecorationLine }]}
      numberOfLines={numberOfLines}
      onPress={onPress}
      selectable={selectable}
      onTextLayout={onTextLayout}
      testID={testID || "uc-lib.text"}
      accessibilityLabel={testID || "uc-lib.text"}
    >
      {content}
    </RNText>
  )
}

export { Text }
