const PRICE_MIN_ONLY = " and above"
const PRICE_MAX_ONLY = " and below"
const PRICE_BOTH = " to "

const parseMinAndMaxPriceFromFilters = (
  searchAlertFilters: string | null | undefined,
): { priceMin: string; priceMax: string } => {
  let priceMin = ""
  let priceMax = ""

  if (searchAlertFilters && searchAlertFilters.length > 0) {
    const filterArray = searchAlertFilters.split(",")
    filterArray.forEach(filterString => {
      if (filterString.includes(PRICE_MIN_ONLY)) {
        priceMin = filterString.slice(0, filterString.indexOf(" ")).replace("$", "")
      } else if (filterString.includes(PRICE_MAX_ONLY)) {
        priceMax = filterString.slice(0, filterString.indexOf(" ")).replace("$", "")
      } else if (filterString.includes(PRICE_BOTH)) {
        const filterParts = filterString.split(" ")
        if (filterParts.length === 3) {
          priceMin = filterParts[0].replace("$", "")
          priceMax = filterParts[2].replace("$", "")
        }
      }
    })
  }

  return { priceMin, priceMax }
}

export { parseMinAndMaxPriceFromFilters }
