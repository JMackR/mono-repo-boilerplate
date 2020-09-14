import _ from "lodash"
import { TextColors } from "uc-lib/themes"
import { InputProps } from "./input.props"
import React, { forwardRef, useState, useRef, useImperativeHandle, useEffect } from "react"
import { useColorTheme } from "uc-lib/themes"
import { Text, ActivityIndicator, SVG } from "../"
import { Margin, Stack, Flex, Border, Overlay } from "../layout"
import { TextEntry, TextEntryRef } from "../text-entry"
import { StripeTextEntry } from "../stripe-text-entry"
import { ClickableOpacity } from "../clickable"
import { translate } from "shared-lib/utilities"
import { ActionClear } from "../../assets"
import { InputHelpIcon } from "./input-help-icon"
import { TooltipProvider } from "uc-lib/widgets/tooltip"

const getTint = (props: InputProps, selected: boolean) => {
  const { focusState, error } = props

  let tint: keyof TextColors
  let currentState = focusState
  if (currentState === undefined) {
    if (!_.isEmpty(error)) {
      currentState = "error"
    } else if (selected) {
      currentState = "focused"
    } else {
      currentState = "unfocused"
    }
  }
  switch (currentState) {
    case "error":
      tint = "error"
      break
    case "focused":
      tint = "brand"
      break
    case "unfocused":
    default:
      tint = "secondary"
      break
  }

  return tint
}

export const Input = forwardRef<TextEntryRef, InputProps>((props, ref) => {
  const {
    title,
    prefixText,
    leftHelperText,
    rightHelperText,
    error,
    suppressErrorText,
    leadingIcon,
    trailingIcon,
    loading,
    focusHandler,
    blurHandler,
    toolTipIcon,
    toolTipText,
    testID,
    stripeInputType,
    secureTextEntry,
    onClear,
    text,
  } = props
  const [selected, setSelected] = useState(false)
  const [secure, setSecure] = useState(secureTextEntry)
  const tint = getTint(props, selected)
  const colorTheme = useColorTheme()
  const borderColor = colorTheme.fontColors[tint]

  // tslint:disable-next-line: react-hooks-nesting
  const entryRef = useRef<TextEntryRef>(null)

  const touchEndFunc = () => {
    if (entryRef.current !== null) {
      entryRef.current.focus()
    }
  }

  const focusFunc = () => {
    setSelected(true)
    if (focusHandler !== undefined) {
      focusHandler()
    }
  }

  const blurFunc = () => {
    setSelected(false)
    if (blurHandler !== undefined) {
      blurHandler()
    }
  }

  const focus = () => {
    if (entryRef.current !== null) {
      entryRef.current.focus()
    }
  }

  const blur = () => {
    if (entryRef.current !== null) {
      entryRef.current.blur()
    }
  }

  const setPrivate = () => {
    if (entryRef.current !== null) {
      entryRef.current.setPrivate()
    }
  }

  useImperativeHandle(ref, () => {
    return {
      focus,
      blur,
      setPrivate,
    }
  })

  useEffect(() => {
    setSecure(secureTextEntry)
  }, [secureTextEntry])

  const textEntryElement = () => {
    if (stripeInputType) {
      return <StripeTextEntry {...props} stripeInputType={stripeInputType} />
    } else {
      return (
        <TextEntry
          {...props}
          ref={entryRef}
          secureTextEntry={secure}
          focusHandler={focusFunc}
          blurHandler={blurFunc}
          testID={(testID || "uc-lib") + ".input.text-entry"}
        />
      )
    }
  }
  const toggleSecure = () => setSecure(!secure)
  return (
    <Flex direction="row" grow={1} testID={(testID || "uc-lib") + ".input"}>
      <Margin direction="column" grow={1}>
        <Stack direction="column" childSeparationStep={2}>
          {(title || (toolTipIcon && toolTipText)) && (
            <Flex grow={1} direction="row">
              {title && <Text textType="secondaryBody1" text={title} testID={(testID || "uc-lib") + ".input.title"} />}
              {toolTipIcon && toolTipText && (
                <TooltipProvider>
                  <InputHelpIcon toolTipIcon={toolTipIcon} toolTipText={toolTipText} />
                </TooltipProvider>
              )}
            </Flex>
          )}
          <Border cornerRadius="small" lineWeight="light" color={borderColor} touchUpInsideHandler={touchEndFunc}>
            <Margin direction="column" grow={1} marginStep={2}>
              <Stack direction="row" crossAxisDistribution="center">
                {leadingIcon && (
                  <Margin
                    direction="column"
                    axisDistribution="center"
                    crossAxisDistribution="center"
                    marginLeftStep={1}
                    marginRightStep={1}
                  >
                    <SVG tint={tint} localSVG={leadingIcon} />
                  </Margin>
                )}
                {prefixText && <Text textType="primaryBody2" text={prefixText} />}
                <Flex grow={1} direction="column" axisDistribution="center">
                  {textEntryElement()}
                  {onClear && !!text && (
                    <Overlay insetRightStep={0} insetTopStep={0}>
                      <ClickableOpacity onClick={onClear}>
                        <SVG localSVG={ActionClear} />
                      </ClickableOpacity>
                    </Overlay>
                  )}
                  {secureTextEntry && (
                    <Overlay insetRightStep={0}>
                      <ClickableOpacity onClick={toggleSecure}>
                        <Text
                          textType="primaryBody2"
                          color="brand"
                          text={translate(secure ? "common-actions.show" : "common-actions.hide")}
                        />
                      </ClickableOpacity>
                    </Overlay>
                  )}
                </Flex>
                {loading && (
                  <Margin
                    direction="column"
                    axisDistribution="center"
                    crossAxisDistribution="center"
                    marginLeftStep={1}
                    marginRightStep={1}
                  >
                    <ActivityIndicator testID={(testID || "uc-lib") + ".input.activity-indicator"} />
                  </Margin>
                )}
                {!loading && trailingIcon && (
                  <Margin
                    direction="column"
                    axisDistribution="center"
                    crossAxisDistribution="center"
                    marginLeftStep={1}
                    marginRightStep={1}
                  >
                    <SVG tint={tint} localSVG={trailingIcon} />
                  </Margin>
                )}
              </Stack>
            </Margin>
          </Border>
          {(leftHelperText || rightHelperText) && (
            <Stack direction="row" grow={0}>
              {leftHelperText && (
                <Flex direction="row" axisDistribution="flex-start" grow={1}>
                  <Text
                    textType="tertiaryBody2"
                    color="secondary"
                    testID={(testID || "uc-lib") + ".input.left-helper-text"}
                    text={leftHelperText}
                  />
                </Flex>
              )}
              {/* This view is between the other two so that they will align around the space correctly if one or the other is not shown. */}
              {rightHelperText && (
                <Flex direction="row-reverse" axisDistribution="flex-start" grow={1}>
                  <Text
                    textType="tertiaryBody2"
                    color="secondary"
                    testID={(testID || "uc-lib") + ".input.right-helper-text"}
                    text={rightHelperText}
                  />
                </Flex>
              )}
            </Stack>
          )}
          {error && !suppressErrorText && (
            <Text
              textType="tertiaryBody2"
              color="error"
              testID={(testID || "uc-lib") + ".input.error-text"}
              text={error}
            />
          )}
        </Stack>
      </Margin>
    </Flex>
  )
})
