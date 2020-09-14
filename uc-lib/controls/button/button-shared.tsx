import { TextColors } from "uc-lib/themes"
import { ButtonPropsBase } from "./button-props-base"
import { LocalSVGSource } from "uc-lib/controls/image"

export const textColorForCurrentButtonType = (buttonType: string): keyof TextColors => {
  switch (buttonType) {
    default:
    case "primary":
      return "alwaysLight"
    case "secondary":
      return "alwaysDark"
    case "tertiary":
      return "primary"
    case "flat":
      return "brand"
    case "disabled":
      return "alwaysLight"
  }
}

export const isJSXElement = (thingToTest: ButtonPropsBase["icon"]): thingToTest is JSX.Element => {
  return !!thingToTest && (thingToTest as JSX.Element).props !== undefined
}

export const isLocalSVGSource = (thingToTest: ButtonPropsBase["icon"]): thingToTest is LocalSVGSource => {
  return !!thingToTest && (thingToTest as LocalSVGSource).SVG !== undefined
}
