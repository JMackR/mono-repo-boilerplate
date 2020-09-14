import _ from "lodash"
import "intl"
import "intl/locale-data/jsonp/en" // or any other locale you need
const MIN_NUMBER_TO_NOT_FORMAT = 999
const THSANDS_LEVEL_DIVIDER = 1000
/**
 * Simplistic formatter.
 *
 * prettyNumberFormatter(1) => 1
 * prettyNumberFormatter(10) => 10
 * prettyNumberFormatter(100) => 100
 * prettyNumberFormatter(1000) => 1k+
 * prettyNumberFormatter(2000) => 2k+
 * prettyNumberFormatter(10000) => 10k
 * prettyNumberFormatter(100000) => 100k
 * prettyNumberFormatter(1000000) => 1m+
 *
 * @param numberToFormat number you want formatted
 * @param decimal how many decimals to include. optional. defaults to 0.
 * @param includePlus whether to always include the plus
 */
export const prettyNumberFormatter = (
  numberToFormat: number,
  decimal: number = 0,
  includePlus: boolean = true,
  trimZeroDecimals: boolean = false,
) => {
  const levels = ["", "k", "m"]
  let level = 0
  let output = numberToFormat

  while (output > MIN_NUMBER_TO_NOT_FORMAT) {
    level = level + 1
    output = output / THSANDS_LEVEL_DIVIDER
  }
  let outputText = output.toFixed(level > 0 ? decimal : 0)
  if (trimZeroDecimals) {
    outputText = Number(outputText).toString()
  }
  if (outputText.length === 1 && level > 0 && includePlus) {
    return outputText + levels[level] + "+"
  }
  return outputText + levels[level]
}

export enum MoneyTrimType {
  NoDecimals,
  NoDoubleZeros,
  TwoDecimals,
  NoTrim,
  NoDecimalsAndShorten,
}

const MONEY_DECIMAL_OVERFLOW = 3
const CURRENCY_SYMBOL = "$"
const DECIMAL_SEPARATOR = "."
const MAX_THSANDS_LENGTH = 7
const numberFormatter = Intl.NumberFormat("en-US")

export const formatMoneyWithRaw = (
  text?: string,
  trimType = MoneyTrimType.TwoDecimals,
): { moneyText: string; rawMoney: number | undefined } | undefined => {
  const strippedText = text ? text.replace(/[^0-9.]/g, "") : ""
  const decimalPointIndex = strippedText.indexOf(DECIMAL_SEPARATOR)
  const hasDecimalPoint = decimalPointIndex >= 0
  const hasTooManyDecimalPoints = hasDecimalPoint && strippedText.lastIndexOf(DECIMAL_SEPARATOR) !== decimalPointIndex
  const hasTooManyDecimalPlaces = hasDecimalPoint && strippedText.length - decimalPointIndex > MONEY_DECIMAL_OVERFLOW
  const invalidText = strippedText.match(/^[0-9.]*$/) === null
  const splitText = strippedText.split(DECIMAL_SEPARATOR)
  const overThousandsLength = splitText[0].length > MAX_THSANDS_LENGTH

  if (invalidText || hasTooManyDecimalPlaces || hasTooManyDecimalPoints || overThousandsLength) {
    return undefined
  }

  let rawMoney: number | undefined
  if (strippedText.length > 0 && strippedText !== DECIMAL_SEPARATOR) {
    rawMoney = _.toNumber(strippedText)
  }

  let nonDecimalPart = splitText[0] ? numberFormatter.format(_.toNumber(splitText[0])) : ""
  const decimalPart = splitText[1]

  let processedDecimalPart = ""
  switch (trimType) {
    case MoneyTrimType.NoDecimals:
      break
    case MoneyTrimType.NoDecimalsAndShorten:
      nonDecimalPart = prettyNumberFormatter(_.toNumber(strippedText), 1, false).replace(".0", "")
      break
    case MoneyTrimType.NoTrim:
      // This mode is used for input controls, where we dont' want to interfere with the number input
      processedDecimalPart = hasDecimalPoint ? DECIMAL_SEPARATOR + decimalPart : ""
      break
    case MoneyTrimType.NoDoubleZeros:
      if (_.toNumber(decimalPart) > 0) {
        processedDecimalPart = processDecimalPart(decimalPart)
      }
      break
    case MoneyTrimType.TwoDecimals:
      processedDecimalPart = processDecimalPart(decimalPart, false)
      break
    default:
      throw new Error("Invalid MoneyTrimType value!")
  }

  // Add a leading zero if this ends up being under $1
  let composite = nonDecimalPart + processedDecimalPart
  if (composite.startsWith(".") || composite.startsWith("$.")) {
    composite = "0" + composite
  }
  return {
    moneyText: composite.length > 0 ? CURRENCY_SYMBOL + composite : "",
    rawMoney,
  }
}

const processDecimalPart = (decimalPart: string, suppressZeros: boolean = true) => {
  if (!decimalPart) {
    return suppressZeros ? "" : DECIMAL_SEPARATOR + "00"
  }

  // If only one decimal place is present, assume it is for the 10 cent place, so add a trailing zero
  return DECIMAL_SEPARATOR + (decimalPart.length === 1 ? decimalPart + "0" : decimalPart)
}

export const formatMoney = (text?: string, trimType?: MoneyTrimType): string => {
  return formatMoneyWithRaw(text, trimType)?.moneyText || ""
}

export const formatMileageWithRaw = (text?: string): { mileageText: string; mileage: number | undefined } | undefined => {
  const strippedText = text ? text.replace(/[^0-9]/g, "") : ""
  const invalidText = strippedText.match(/^[0-9]*$/) === null

  if (invalidText) {
    return undefined
  }

  const mileage = Number(strippedText)

  if (isNaN(mileage) || mileage <= 0) {
    return undefined
  }

  return {
    mileage,
    mileageText: numberFormatter.format(mileage),
  }
}

export const formatMileage = (text?: string): string => {
  return formatMileageWithRaw(text)?.mileageText || ""
}
