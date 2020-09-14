import React from "react"
import { propertyOf, parseInt as _parseInt } from "lodash"
import { FeedOptionNumericRange, useSearch, translate } from "shared-lib"

export interface NumericRangeFilterInputProps {
  text: string
  onTextChange: (text?: string) => void
  onEndEditing: () => void
  errorText?: string
}
export interface NumericRangeFilterProps {
  min: NumericRangeFilterInputProps
  max: NumericRangeFilterInputProps
}

export const NumericRangeContext = React.createContext<NumericRangeFilterProps>({
  min: {
    text: "",
    onTextChange: _ => {},
    onEndEditing: () => {},
  },
  max: {
    text: "",
    onTextChange: _ => {},
    onEndEditing: () => {},
  },
})

export const useNumericRangeEntry = (): NumericRangeFilterProps => {
  return React.useContext(NumericRangeContext)
}

export const currentValuesFromFilter = (filter: FeedOptionNumericRange) => {
  const minValue = _parseInt(propertyOf(filter)("options.0.currentValue") || "")
  const maxValue = _parseInt(propertyOf(filter)("options.1.currentValue") || "")
  return {
    minValue,
    maxValue,
  }
}

interface UpdateNumericFiltersHookProps {
  numericRangeFilter: FeedOptionNumericRange
  minTextChangeHandler: (text?: string) => void
  maxTextChangeHandler: (text?: string) => void
  minValue?: number
  maxValue?: number
}

export const useUpdateNumericFilters = (props: UpdateNumericFiltersHookProps) => {
  const { numericRangeFilter, minTextChangeHandler, maxTextChangeHandler, minValue, maxValue } = props
  const { filter: commitFilter, state } = useSearch()

  const searchParamPriceMinValue = state.searchParams[numericRangeFilter.leftQueryParam]
  const searchParamPriceMaxValue = state.searchParams[numericRangeFilter.rightQueryParam]

  React.useEffect(() => {
    if (Number(searchParamPriceMinValue) !== minValue) {
      minTextChangeHandler(searchParamPriceMinValue ? String(searchParamPriceMinValue) : undefined)
    }
    if (Number(searchParamPriceMaxValue) !== maxValue) {
      maxTextChangeHandler(searchParamPriceMaxValue ? String(searchParamPriceMaxValue) : undefined)
    }
  }, [searchParamPriceMaxValue, searchParamPriceMinValue])

  const updateFilters = () => {
    commitFilter({
      [numericRangeFilter.leftQueryParam]: minValue ? String(minValue) : undefined,
      [numericRangeFilter.rightQueryParam]: maxValue ? String(maxValue) : undefined,
    })
  }

  const [minTextError, setMinTextError] = React.useState<string>()
  const [maxTextError, setMaxTextError] = React.useState<string>()

  return {
    minErrorText: minTextError,
    maxErrorText: maxTextError,
    clearErrors: () => {
      setMinTextError(undefined)
      setMaxTextError(undefined)
    },
    onMinEndEditing: () => {
      if (minValue !== undefined && maxValue !== undefined && minValue > maxValue) {
        setMinTextError(translate("search-stack.min-is-greater-than-max-error"))
        setMaxTextError(translate("search-stack.min-is-greater-than-max-error"))
      } else if (minValue !== undefined && numericRangeFilter.lowerBound && minValue < numericRangeFilter.lowerBound) {
        setMinTextError(translate("search-stack.min-must-be-above") + numericRangeFilter.lowerBound)
      } else {
        updateFilters()
      }
    },
    onMaxEndEditing: () => {
      if (minValue !== undefined && maxValue !== undefined && minValue > maxValue) {
        setMinTextError(translate("search-stack.min-is-greater-than-max-error"))
        setMaxTextError(translate("search-stack.min-is-greater-than-max-error"))
      } else if (maxValue !== undefined && numericRangeFilter.upperBound && maxValue > numericRangeFilter.upperBound) {
        setMaxTextError(translate("search-stack.max-must-be-below") + numericRangeFilter.upperBound)
      } else {
        updateFilters()
      }
    },
  }
}
