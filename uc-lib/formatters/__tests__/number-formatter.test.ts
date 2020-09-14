import { MoneyTrimType, formatMoneyWithRaw } from "../number-formatters"
import _ from "lodash"

const COMMA_RANGES_INPUT = ["0", "1", "999", "1000", "999999", "1000000", "9999999"]
const COMMA_RANGES_NO_DECIMALS = ["0", "1", "999", "1,000", "999,999", "1,000,000", "9,999,999"]
const COMMA_RANGES_NO_DBLE_ZEROS = ["0", "1", "999", "1,000", "999,999", "1,000,000", "9,999,999"]
const COMMA_RANGES_TWO_DECIMALS = ["0.00", "1.00", "999.00", "1,000.00", "999,999.00", "1,000,000.00", "9,999,999.00"]
const COMMA_RANGES_NO_TRIM = ["0", "1", "999", "1,000", "999,999", "1,000,000", "9,999,999"]

const TWO_DECIMALS_INPUT = ["3.00", "12.01", "455.99", "6323.40", "23453.81"]
const TWO_DECIMALS_NO_DECIMALS = ["3", "12", "455", "6,323", "23,453"]
const TWO_DECIMALS_NO_DBLE_ZEROS = ["3", "12.01", "455.99", "6,323.40", "23,453.81"]
const TWO_DECIMALS_TWO_DECIMALS = ["3.00", "12.01", "455.99", "6,323.40", "23,453.81"]
const TWO_DECIMALS_NO_TRIM = ["3.00", "12.01", "455.99", "6,323.40", "23,453.81"]

const ONE_DECIMAL_INPUT = ["0.0", "33.1", "53134.9"]
const ONE_DECIMAL_NO_DECIMALS = ["0", "33", "53,134"]
const ONE_DECIMAL_NO_DBLE_ZEROS = ["0", "33.10", "53,134.90"]
const ONE_DECIMAL_TWO_DECIMALS = ["0.00", "33.10", "53,134.90"]
const ONE_DECIMAL_NO_TRIM = ["0.0", "33.1", "53,134.9"]

const NO_LEADING_ZERO_INPUT = [".0", ".04", ".3", ".88", ".70"]
const NO_LEADING_ZERO_INPUT_NO_DECIMALS = ["", "", "", "", ""]
const NO_LEADING_ZERO_INPUT_NO_DBLE_ZEROS = ["", "0.04", "0.30", "0.88", "0.70"]
const NO_LEADING_ZERO_INPUT_TWO_DECIMALS = ["0.00", "0.04", "0.30", "0.88", "0.70"]
const NO_LEADING_ZERO_INPUT_NO_TRIM = ["0.0", "0.04", "0.3", "0.88", "0.70"]

const INVALID_INPUT = ["", "$a2C8#0,4.1]", "2..4", "3.141", "abc#*@", "10000000", "-0.01"]
const INVALID_TPUT = ["", "2,804.1", undefined, undefined, "", undefined, "0.01"]
const INVALID_TPUT_RAW = [undefined, "2804.1", undefined, undefined, undefined, undefined, "0.01"]

const SHORTEN_INPUT = ["0", "1", "43", "999", "1000", "1001", "1243", "999999", "1000000", "1000001", "3569833", "9999999"]
const SHORTEN_TPUT = ["0", "1", "43", "999", "1k", "1k", "1.2k", "1m", "1m", "1m", "3.6m", "10m"]

describe.each`
  trimType                              | trimName                  | input                    | output
  ${MoneyTrimType.NoDecimals}           | ${"NoDecimals"}           | ${COMMA_RANGES_INPUT}    | ${COMMA_RANGES_NO_DECIMALS}
  ${MoneyTrimType.NoDoubleZeros}        | ${"NoDoubleZeros"}        | ${COMMA_RANGES_INPUT}    | ${COMMA_RANGES_NO_DBLE_ZEROS}
  ${MoneyTrimType.TwoDecimals}          | ${"TwoDecimals"}          | ${COMMA_RANGES_INPUT}    | ${COMMA_RANGES_TWO_DECIMALS}
  ${MoneyTrimType.NoTrim}               | ${"NoTrim"}               | ${COMMA_RANGES_INPUT}    | ${COMMA_RANGES_NO_TRIM}
  ${MoneyTrimType.NoDecimals}           | ${"NoDecimals"}           | ${TWO_DECIMALS_INPUT}    | ${TWO_DECIMALS_NO_DECIMALS}
  ${MoneyTrimType.NoDoubleZeros}        | ${"NoDoubleZeros"}        | ${TWO_DECIMALS_INPUT}    | ${TWO_DECIMALS_NO_DBLE_ZEROS}
  ${MoneyTrimType.TwoDecimals}          | ${"TwoDecimals"}          | ${TWO_DECIMALS_INPUT}    | ${TWO_DECIMALS_TWO_DECIMALS}
  ${MoneyTrimType.NoTrim}               | ${"NoTrim"}               | ${TWO_DECIMALS_INPUT}    | ${TWO_DECIMALS_NO_TRIM}
  ${MoneyTrimType.NoDecimals}           | ${"NoDecimals"}           | ${ONE_DECIMAL_INPUT}     | ${ONE_DECIMAL_NO_DECIMALS}
  ${MoneyTrimType.NoDoubleZeros}        | ${"NoDoubleZeros"}        | ${ONE_DECIMAL_INPUT}     | ${ONE_DECIMAL_NO_DBLE_ZEROS}
  ${MoneyTrimType.TwoDecimals}          | ${"TwoDecimals"}          | ${ONE_DECIMAL_INPUT}     | ${ONE_DECIMAL_TWO_DECIMALS}
  ${MoneyTrimType.NoTrim}               | ${"NoTrim"}               | ${ONE_DECIMAL_INPUT}     | ${ONE_DECIMAL_NO_TRIM}
  ${MoneyTrimType.NoDecimals}           | ${"NoDecimals"}           | ${NO_LEADING_ZERO_INPUT} | ${NO_LEADING_ZERO_INPUT_NO_DECIMALS}
  ${MoneyTrimType.NoDoubleZeros}        | ${"NoDoubleZeros"}        | ${NO_LEADING_ZERO_INPUT} | ${NO_LEADING_ZERO_INPUT_NO_DBLE_ZEROS}
  ${MoneyTrimType.TwoDecimals}          | ${"TwoDecimals"}          | ${NO_LEADING_ZERO_INPUT} | ${NO_LEADING_ZERO_INPUT_TWO_DECIMALS}
  ${MoneyTrimType.NoTrim}               | ${"NoTrim"}               | ${NO_LEADING_ZERO_INPUT} | ${NO_LEADING_ZERO_INPUT_NO_TRIM}
  ${MoneyTrimType.NoTrim}               | ${"NoTrim"}               | ${INVALID_INPUT}         | ${INVALID_TPUT}
  ${MoneyTrimType.NoDecimalsAndShorten} | ${"NoDecimalsAndShorten"} | ${SHORTEN_INPUT}         | ${SHORTEN_TPUT}
`("formatMoneyWithRaw().moneyText using decimal trim type: $trimName", ({ trimType, input, output }) => {
  // Create a 2D array where each row is a unique combo of input, expected value, and trim type. This array can be passed directly to test.each()
  let trimTypes: string[] = new Array(input.length)
  _.fill(trimTypes, trimType, 0)
  const values = _.zip(input, trimTypes, output)

  test.each(values)("Format %s", (textToFormat, trimType, expected) => {
    const result = formatMoneyWithRaw(String(textToFormat), Number(trimType))

    expect(result).toBeDefined
    expect(result?.moneyText).toBe(expected ? "$" + expected : expected)
  })
})

describe.each`
  trimType                              | trimName                  | input                    | output
  ${MoneyTrimType.NoTrim}               | ${"NoTrim"}               | ${COMMA_RANGES_INPUT}    | ${COMMA_RANGES_INPUT}
  ${MoneyTrimType.NoDoubleZeros}        | ${"NoDoubleZeros"}        | ${TWO_DECIMALS_INPUT}    | ${TWO_DECIMALS_INPUT}
  ${MoneyTrimType.TwoDecimals}          | ${"TwoDecimals"}          | ${ONE_DECIMAL_INPUT}     | ${ONE_DECIMAL_INPUT}
  ${MoneyTrimType.NoDecimals}           | ${"NoDecimals"}           | ${NO_LEADING_ZERO_INPUT} | ${NO_LEADING_ZERO_INPUT}
  ${MoneyTrimType.NoDecimalsAndShorten} | ${"NoDecimalsAndShorten"} | ${INVALID_INPUT}         | ${INVALID_TPUT_RAW}
`("formatMoneyWithRaw().rawMoney using decimal trim type: $trimName", ({ trimType, input, output }) => {
  // Create a 2D array where each row is a unique combo of input, expected value, and trim type. This array can be passed directly to test.each()
  let trimTypes: string[] = new Array(input.length)
  _.fill(trimTypes, trimType, 0)
  const values = _.zip(input, trimTypes, output)

  test.each(values)("Format %s", (textToFormat, trimType, expected) => {
    const result = formatMoneyWithRaw(String(textToFormat), Number(trimType))

    expect(result).toBeDefined
    expect(result?.rawMoney).toBe(expected ? _.toNumber(expected) : expected)
  })
})
