import { StyleSheet, css, StyleDeclaration } from "aphrodite/no-important"

import React, { forwardRef, useImperativeHandle, useRef, MutableRefObject } from "react"
import { TextProps, TextRef } from "./text.props"
import { useFontForTextType, useColorForTextColor } from "../../themes"
import { covertFontToWebStyleSheet } from "../../themes/utility/font-conversions"

/**
 * This is a simple text component.  It includes all behavior displayed by text in the Redibs app.
 * @param props see TextProps for more info.
 */
export const Text = forwardRef<TextRef, TextProps>((props, ref) => {
  const { numberOfLines, children, textType, text, textAlign, onPress, color, whiteSpace = "inherit" } = props
  const content = text || children
  let textStyle: StyleDeclaration = {
    whiteSpace,
    textAlign,
  }
  if (color === "brand") {
    textStyle = {
      ...textStyle,
      ":hover": {
        cursor: "pointer",
      },
    }
  }
  if (numberOfLines) {
    textStyle = {
      ...textStyle,
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: numberOfLines,
      overflow: "hidden",
      textOverflow: "ellipsis",
    }
  }
  const STYLES = StyleSheet.create({
    textStyle,
  })
  const font = useFontForTextType(textType ? textType : "primaryBody1")
  const fontColor = useColorForTextColor(color ? color : "primary")
  const fontStyles = covertFontToWebStyleSheet(font, fontColor, "inline")

  const contentRef = useRef() as MutableRefObject<any>

  useImperativeHandle(ref, () => ({
    isContentTruncated: () => {
      if (contentRef.current) {
        return contentRef.current.scrollHeight > contentRef.current.offsetHeight
      }
      return false
    },
  }))

  return (
    <div className={css(fontStyles.text, STYLES.textStyle)} onClick={onPress} ref={contentRef}>
      {content}
    </div>
  )
})
