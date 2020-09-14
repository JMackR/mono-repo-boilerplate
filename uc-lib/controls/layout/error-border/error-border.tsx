import React from "react"
import { Flex } from "../flex"
import { Margin } from "../margin"
import { Border } from "../border"
import { Text } from "../../text"
import { LayoutContainerProps } from "../container-props"

export interface ErrorBorderProps extends LayoutContainerProps {
  errorText?: string | null
}

const BORDER_MARGIN_STEP = 2
const ERROR_TEXT_MARGIN_TOP_STEP = BORDER_MARGIN_STEP + 1

/**
 * A layout container that renders a red border and errorText depending on the value of errorText.
 * @param props.errorText
 *  * A string value will render a red border around the children, and render the `errorText` below the border.
 *  * A null value will render the border, but will not render any text.
 *  * An undefined value will not render the border or text.
 * @param props The rest of the props are extended from LayoutContainerProps, and behave as expected.
 */
export const ErrorBorder: React.FC<ErrorBorderProps> = props => {
  const { children, errorText, testID, ...layoutContainerProps } = props
  const { width, height, debugColor, ...childLayoutProps } = layoutContainerProps

  const shouldHideBorder = errorText === undefined
  const shouldRenderText = !!errorText

  return (
    <Flex width={width} height={height} debugColor={debugColor} direction="column">
      <Margin direction="column" marginStep={-BORDER_MARGIN_STEP}>
        <Border direction="column" hidden={shouldHideBorder} color="paintbrushRed" cornerRadius="small" lineWeight="light">
          <Margin {...childLayoutProps} marginStep={BORDER_MARGIN_STEP}>
            {children}
          </Margin>
        </Border>
      </Margin>
      {shouldRenderText && (
        <Margin direction="column" marginTopStep={ERROR_TEXT_MARGIN_TOP_STEP}>
          <Text textType="tertiaryBody2" color="error" testID={(testID || "uc-lib") + ".error"}>
            {errorText}
          </Text>
        </Margin>
      )}
    </Flex>
  )
}
