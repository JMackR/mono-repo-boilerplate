import React from "react"
import { StripeTextEntryProps } from "./stripe-text-entry.props"
import { Flex, Margin } from "../layout"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js"
import { useColorsForTextColorsCollection, useFontForTextType, FontStyle } from "../../themes"

export const StripeTextEntry: React.FC<StripeTextEntryProps> = (props: StripeTextEntryProps) => {
  const font: FontStyle = useFontForTextType(props.textType !== undefined ? props.textType : "primaryBody2")
  const [primaryColor, hintColor] = useColorsForTextColorsCollection([
    props.textColor !== undefined ? props.textColor : "primary",
    props.hintColor !== undefined ? props.hintColor : "hint",
  ])

  const elementForSpecialInputType = () => {
    const stripeStyle = {
      base: {
        color: primaryColor,
        fontWeight: font.fontWeight,
        fontFamily: font.fontFamily + ", sans-serif",
        fontSize: font.fontSize + "px",
        "::placeholder": {
          color: hintColor,
        },
      },
      invalid: {
        fontWeight: font.fontWeight,
        fontFamily: font.fontFamily + ", sans-serif",
        fontSize: font.fontSize + "px",
      },
    }

    const stripeOptions = {
      style: stripeStyle,
      placeholder: props.hint,
    }

    switch (props.stripeInputType) {
      case "card-number":
        return <CardNumberElement options={stripeOptions} />
      case "card-exp":
        return <CardExpiryElement options={stripeOptions} />
      case "card-cvc":
        return <CardCvcElement options={stripeOptions} />
      default: {
        return <CardNumberElement options={stripeOptions} />
      }
    }
  }

  return (
    <Margin marginTopStep={0.5}>
      <Flex direction="column" grow={1}>
        {elementForSpecialInputType()}
      </Flex>
    </Margin>
  )
}
