import React from "react"
import { useMoneyInputFormatter } from "shared-lib/utilities/input-formatters"
import {
  NumericRangeFilterProps,
  NumericRangeContext,
  currentValuesFromFilter,
  useUpdateNumericFilters,
} from "./numeric-range-context"
import { NumericRangeProps } from "../numeric-range-filter-inputs"

export const PriceRangeProvider: React.FC<NumericRangeProps> = props => {
  const { numericRangeFilter = {} as FeedOptionNumericRange, children } = props
  const { minValue: initialMinValue, maxValue: initialMaxValue } = currentValuesFromFilter(numericRangeFilter)

  const { moneyText: minMoneyText, rawMoney: minRawMoney, onMoneyChange: onMinMoneyChange } = useMoneyInputFormatter(
    initialMinValue,
  )
  const { moneyText: maxMoneyText, rawMoney: maxRawMoney, onMoneyChange: onMaxMoneyChange } = useMoneyInputFormatter(
    initialMaxValue,
  )

  const textChangeHandler = (setter: (text?: string) => void, text?: string) => {
    setter(text)
    clearErrors()
  }

  const minTextChangeHandler = (text?: string) => {
    textChangeHandler(onMinMoneyChange, text)
  }

  const maxTextChangeHandler = (text?: string) => {
    textChangeHandler(onMaxMoneyChange, text)
  }

  const { minErrorText, maxErrorText, clearErrors, onMinEndEditing, onMaxEndEditing } = useUpdateNumericFilters({
    numericRangeFilter,
    minTextChangeHandler: onMinMoneyChange,
    maxTextChangeHandler: onMaxMoneyChange,
    minValue: minRawMoney,
    maxValue: maxRawMoney,
  })

  const value: NumericRangeFilterProps = {
    min: {
      text: minMoneyText,
      onTextChange: minTextChangeHandler,
      onEndEditing: onMinEndEditing,
      errorText: minErrorText,
    },
    max: {
      text: maxMoneyText,
      onTextChange: maxTextChangeHandler,
      onEndEditing: onMaxEndEditing,
      errorText: maxErrorText,
    },
  }

  return <NumericRangeContext.Provider value={value}>{children}</NumericRangeContext.Provider>
}
