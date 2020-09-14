import {
  PaymentVisaCard,
  PaymentMasterCard,
  PaymentDiscoverCard,
  PaymentAMEXCard,
  PaymentApplePay,
  PaymentGooglePay,
  PaymentsCreditCardLineIcon,
} from "uc-lib"
import { PaymentMethod } from "shared-lib"

export const paymentMethodDisplayName = (paymentMethod?: PaymentMethod) => {
  if (paymentMethod?.type === "applepaycard") {
    return "Apple Pay"
  } else if (paymentMethod?.type === "googlepaycard") {
    return "Google Pay"
  } else if (paymentMethod) {
    return paymentMethod?.creditCard?.displayName + "  ···· " + paymentMethod?.creditCard?.lastFour
  } else {
    return ""
  }
}

export const imageForPaymentMethod = (paymentMethod?: PaymentMethod) => {
  if (paymentMethod?.creditCard) {
    return imageForNetwork(paymentMethod?.creditCard?.cardType || "")
  } else {
    return imageForNetwork(paymentMethod?.type || "")
  }
}

export const imageForNetwork = (network: string) => {
  switch (network) {
    case "visa":
      return PaymentVisaCard
    case "mastercard":
      return PaymentMasterCard
    case "discover":
      return PaymentDiscoverCard
    case "amex":
      return PaymentAMEXCard
    case "applepaycard":
      return PaymentApplePay
    case "googlepaycard":
      return PaymentGooglePay
    default:
      return PaymentsCreditCardLineIcon
  }
}
