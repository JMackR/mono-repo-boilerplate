const MinimumAmount = 1
const TruncateThreshold = 100
const OverTruncateThreshold = "99+"

export const truncateAmount = (amount: number): string => {
  let truncated = ""
  if (amount >= MinimumAmount) {
    if (amount >= TruncateThreshold) {
      truncated = OverTruncateThreshold
    } else {
      truncated = amount.toString()
    }
  }

  return truncated
}
