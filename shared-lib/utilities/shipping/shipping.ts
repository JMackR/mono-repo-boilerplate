import { DateFormatter } from "../datetime"
import _ from "lodash"

export const determineEstimatedDeliveryDates = (
  primaryShippingOption: ShippingOption = {},
  fulfillmentDetails?: FullfilmentDetails,
  bestShippingRate?: ShippingRate,
): { startDate: string; endDate: string } => {
  if (!!bestShippingRate && !!bestShippingRate.minEstimatedDeliveryDate && !!bestShippingRate.maxEstimatedDeliveryDate) {
    return {
      startDate: bestShippingRate.minEstimatedDeliveryDate,
      endDate: bestShippingRate.maxEstimatedDeliveryDate,
    }
  }

  const { minHandlingDays, minShippingDays, maxHandlingDays, maxShippingDays } = primaryShippingOption

  const minShippingAndHandlingDays = !!minHandlingDays && !!minShippingDays ? minHandlingDays + minShippingDays : undefined
  const maxShippingandHandlingDays = !!maxHandlingDays && !!maxShippingDays ? maxHandlingDays + maxShippingDays : undefined

  const estimatedDeliveryDateStart = (fulfillmentDetails?.estimatedDeliveryDateStart ||
    (!!minShippingAndHandlingDays ? DateFormatter.addDaysToTodayOrdinal(minShippingAndHandlingDays) : undefined)) as string
  const estimatedDeliveryDateEnd = (fulfillmentDetails?.estimatedDeliveryDateEnd ||
    (!!maxShippingandHandlingDays ? DateFormatter.addDaysToTodayOrdinal(maxShippingandHandlingDays) : undefined)) as string

  return {
    startDate: estimatedDeliveryDateStart,
    endDate: estimatedDeliveryDateEnd,
  }
}

export const determineShippingPrice = (
  primaryShippingOption?: ShippingOption,
  fulfillmentDetails?: FullfilmentDetails,
  bestShippingRate?: ShippingRate,
): number | undefined | null => {
  if (fulfillmentDetails?.sellerPaysShipping) {
    return 0
  } else if (!!bestShippingRate?.price) {
    return _.toNumber(bestShippingRate.price)
  } else if (!!primaryShippingOption?.price) {
    return _.toNumber(primaryShippingOption?.price)
  } else {
    return fulfillmentDetails?.shippingPrice
  }
}
