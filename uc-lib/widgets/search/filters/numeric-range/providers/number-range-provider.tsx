import React from "react"
import _ from "lodash"
import {
  NumericRangeFilterProps,
  NumericRangeContext,
  currentValuesFromFilter,
  useUpdateNumericFilters,
} from "./numeric-range-context"
import { NumericRangeProps } from "../numeric-range-filter-inputs"

export const NumberRangeProvider: React.FC<NumericRangeProps> = props => {
  const { numericRangeFilter = {} as FeedOptionNumericRange, children } = props

  const { minValue: initialMinValue, maxValue: initialMaxValue } = currentValuesFromFilter(numericRangeFilter)

  const [minValue, setMinValue] = React.useState<number | undefined>(initialMinValue)
  const [maxValue, setMaxValue] = React.useState<number | undefined>(initialMaxValue)

  const textChangeHandler = (setter: (num: number | undefined) => void, text?: string) => {
    if (text === undefined) {
      setter(undefined)
    } else if (!isNaN((text as unknown) as number)) {
      setter(Number(text))
    }
    clearErrors()
  }

  const minTextChangeHandler = (text?: string) => {
    textChangeHandler(setMinValue, text)
  }

  const maxTextChangeHandler = (text?: string) => {
    textChangeHandler(setMaxValue, text)
  }

  const { minErrorText, maxErrorText, clearErrors, onMinEndEditing, onMaxEndEditing } = useUpdateNumericFilters({
    numericRangeFilter,
    minTextChangeHandler,
    maxTextChangeHandler,
    minValue,
    maxValue,
  })

  const value: NumericRangeFilterProps = {
    min: {
      text: _.toString(minValue),
      onTextChange: minTextChangeHandler,
      onEndEditing: onMinEndEditing,
      errorText: minErrorText,
    },
    max: {
      text: _.toString(maxValue),
      onTextChange: maxTextChangeHandler,
      onEndEditing: onMaxEndEditing,
      errorText: maxErrorText,
    },
  }

  return <NumericRangeContext.Provider value={value}>{children}</NumericRangeContext.Provider>
}
