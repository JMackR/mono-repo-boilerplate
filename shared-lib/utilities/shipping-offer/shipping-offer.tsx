import { ShippingOfferType } from "../../constants"
import { translate } from "../i18n"

export const getShippingOfferScreenTitle = (offerType: ShippingOfferType) => {
  switch (offerType) {
    case ShippingOfferType.BuyNow:
    case ShippingOfferType.Merchant:
      return translate("shipping_offer_screen.buy_now_offer_screen_title")
    default:
      return translate("shipping_offer_screen.shipping_offer_screen_title")
  }
}
