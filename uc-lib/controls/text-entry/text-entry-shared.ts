import { useFontForTextType, useColorsForTextColorsCollection } from "../../themes"
import { TextEntryProps } from "./text-entry.props"

export const ComputePropsForTextEntryProps = (props: TextEntryProps) => {
  const {
    autoCapitalize,
    autoCorrect,
    autoCompleteType,
    textType,
    textColor: textColorName,
    hintColor: hintColorName,
    linesMaximum,
    linesMinimum,
    tintColor: tintColorName,
  } = props
  const font = useFontForTextType(textType !== undefined ? textType : "primaryBody2")
  const minLineHeight = Math.max(Math.floor(linesMinimum !== undefined ? linesMinimum : 1), 1)
  const maxLineHeight = Math.max(Math.floor(linesMaximum !== undefined ? linesMaximum : minLineHeight), minLineHeight)
  const isMultiline = minLineHeight > 1 || maxLineHeight > 1
  const minPointHeight = minLineHeight * font.lineHeight
  const maxPointHeight = maxLineHeight * font.lineHeight

  const [primaryColor, hintColor, tintColor] = useColorsForTextColorsCollection([
    textColorName !== undefined ? textColorName : "primary",
    hintColorName !== undefined ? hintColorName : "hint",
    tintColorName !== undefined ? tintColorName : "brand",
  ])

  return {
    autoCapitalize: autoCapitalize !== undefined ? autoCapitalize : "none",
    autoCorrect: autoCorrect !== undefined ? autoCorrect : true,
    autoCompleteType: autoCompleteType !== undefined ? autoCompleteType : "off", // Android only
    font,
    minLineHeight,
    maxLineHeight,
    minPointHeight,
    maxPointHeight,
    isMultiline,
    primaryColor,
    hintColor,
    tintColor,
  }
}
