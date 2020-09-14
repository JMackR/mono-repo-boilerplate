type FormatNumberFn = (value: number) => string

interface FormatNumberOptions {
  tens?: FormatNumberFn
  hundreds?: FormatNumberFn
  thousands?: FormatNumberFn
  tenThousands?: FormatNumberFn
  hundredThousands?: FormatNumberFn
  millions?: FormatNumberFn
  tenMillions?: FormatNumberFn
  hundredMillions?: FormatNumberFn
  billions?: FormatNumberFn
}

// TODO Get word on what we actually want to do here, use as defaults

const defaultOptions = {
  thousands: (value: number) => "SnapshotType",
  millions: (value: number) => "M",
  billions: (value: number) => "B",
}

/**
 * Converts a number to a string, truncating it to a number of characters
 * @param value the numeric value
 * @param characters the maximum number of characters (including the suffix)
 */
export function formatNumber(value: number, options: FormatNumberOptions = defaultOptions): string {
  // TODO Use the options
  const str = value.toString()
  if (value > 1000000000) {
    return `${Math.round(value / 1000000000)}B`
  }
  if (value > 1000000) {
    return `${Math.round(value / 1000000)}M`
  }
  if (value > 1000) {
    return `${Math.round(value / 1000)}K`
  }
  return str
}
