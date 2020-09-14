import React from "react"
import { propertyOf } from "lodash"
import { FeedOptionNumericRange, translate } from "shared-lib"
import { Stack, Input, Text, Flex } from "uc-lib/controls"
import { useNumericRangeEntry } from "./providers/numeric-range-context"

enum LAYTS {
  InputSeparation = 1,
}

export interface NumericRangeProps {
  numericRangeFilter?: FeedOptionNumericRange
}

export const NumericRangeFilterInputs = (props: NumericRangeProps) => {
  const { numericRangeFilter = {} as FeedOptionNumericRange } = props
  const {
    min: { text: minText, onTextChange: onMinChange, onEndEditing: onMinEndEditing, errorText: minErrorText },
    max: { text: maxText, onTextChange: onMaxChange, onEndEditing: onMaxEndEditing, errorText: maxErrorText },
  } = useNumericRangeEntry()

  const stackAlignment = minErrorText || maxErrorText ? "baseline" : "center"
  const minTextHint = propertyOf(numericRangeFilter)("options.0.textHint")
  const maxTextHint = propertyOf(numericRangeFilter)("options.1.textHint")

  return (
    <Stack direction="column" childSeparationStep={LAYTS.InputSeparation}>
      <Stack direction="row" childSeparationStep={LAYTS.InputSeparation} crossAxisDistribution={stackAlignment}>
        <Input
          keyboardType={"numeric"}
          text={minText}
          textChangeHandler={onMinChange}
          endEditingHandler={onMinEndEditing}
          textType="secondaryBody2"
          hint={minTextHint}
          error={minErrorText}
          suppressErrorText={true}
        />
        <Text textType="secondaryBody2">{translate("search-stack.to")}</Text>
        <Input
          keyboardType={"numeric"}
          text={maxText}
          textChangeHandler={onMaxChange}
          endEditingHandler={onMaxEndEditing}
          textType="secondaryBody2"
          hint={maxTextHint}
          error={maxErrorText}
          suppressErrorText={true}
        />
      </Stack>
      <Flex>
        <Text textType="tertiaryBody2" color="error">
          {minErrorText}
        </Text>
      </Flex>
    </Stack>
  )
}
