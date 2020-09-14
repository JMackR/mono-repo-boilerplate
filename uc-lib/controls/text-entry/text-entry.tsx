import React, { useRef, KeyboardEvent, forwardRef, useImperativeHandle } from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { TextEntryProps, TextEntryRef } from "./text-entry.props"
import { ComputePropsForTextEntryProps } from "./text-entry-shared"
import { convertFontWeight } from "../../themes/utility/font-conversions"

export const TextEntry = forwardRef<TextEntryRef, TextEntryProps>((props, ref) => {
  const {
    controlName,
    text,
    hint,
    inputCharLimit,
    keyboardType,
    secureTextEntry,
    keyPressHandler,
    textChangeHandler,
    endEditingHandler,
    blurHandler,
    focusHandler,
    textAlign,
  } = props
  const {
    minLineHeight,
    maxLineHeight,
    font,
    minPointHeight,
    maxPointHeight,
    isMultiline,
    primaryColor,
    hintColor,
  } = ComputePropsForTextEntryProps(props)
  const styles = StyleSheet.create({
    outextentry: {
      "::placeholder": {
        color: hintColor,
      },
      "text-align": textAlign,
      color: primaryColor,
      backgroundColor: "transparent",
      border: "hidden",
      outline: "none",
      overflow: "hidden",
      resize: "none",
      minWidth: 0,
      minSize: 0,
      width: "100%",
      textVerticalAlign: "top",
      minHeight: minPointHeight + "px",
      maxHeight: maxPointHeight + "px",
      fontSize: font.fontSize,
      fontWeight: convertFontWeight(font.fontWeight),
      fontFamily: font.fontFamily + ", sans-serif",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "row",
    },
  })

  // tslint:disable-next-line: react-hooks-nesting
  const input = isMultiline ? useRef<HTMLTextAreaElement>() : useRef<HTMLInputElement>()

  const keyPressFunc = (e: KeyboardEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLInputElement>) => {
    const element = input.current
    if (e.key === "Enter" && isMultiline === false && element !== undefined && element !== null) {
      element.blur()
    }

    keyPressHandler && keyPressHandler(e.key)
  }

  const changeFunc = () => {
    const element = input.current
    if (element !== undefined && element !== null && isMultiline && minLineHeight !== maxLineHeight) {
      element.style.height = "auto"
      element.style.height = Math.min(element.scrollHeight, maxPointHeight) + "px"
    }

    if (textChangeHandler) {
      textChangeHandler(element !== undefined && element !== null ? element.value : undefined)
    }
  }

  const blurFunc = () => {
    if (endEditingHandler !== undefined) {
      const element = input.current
      endEditingHandler(element !== undefined && element !== null ? element.value : "")
    }
    if (blurHandler !== undefined) {
      blurHandler()
    }
  }

  const focus = () => {
    if (input.current !== undefined && input.current !== null) {
      input.current.focus()
    }
  }

  const blur = () => {
    if (input.current !== undefined && input.current !== null) {
      input.current.blur()
    }
  }

  const setPrivate = () => {}

  useImperativeHandle(ref, () => {
    return {
      focus,
      blur,
      setPrivate,
    }
  })

  if (isMultiline) {
    return (
      <textarea
        className={css(styles.outextentry)}
        name={controlName}
        maxLength={inputCharLimit}
        onKeyPress={keyPressFunc}
        onFocus={focusHandler}
        onBlur={blurFunc}
        ref={input as React.RefObject<HTMLTextAreaElement>}
        placeholder={hint}
        onChange={changeFunc}
        value={text}
      />
    )
  } else {
    return (
      <input
        className={css(styles.outextentry)}
        name={controlName}
        maxLength={inputCharLimit}
        onFocus={focusHandler}
        onBlur={blurFunc}
        onKeyPress={keyPressFunc}
        type={secureTextEntry ? "password" : keyboardType}
        ref={input as React.RefObject<HTMLInputElement>}
        placeholder={hint}
        onChange={changeFunc}
        value={text}
      />
    )
  }
})
