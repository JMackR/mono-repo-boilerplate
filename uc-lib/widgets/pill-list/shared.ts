export const CONTAINER_MARGIN = 8
export const BORDER_WIDTH = 1

export interface Padding {
  padding?: number
  paddingRight?: number
  paddingLeft?: number
  paddingTop?: number
  paddingBottom?: number
}

const getMargin = (baseMargin: number, marginStep?: number) => {
  if (marginStep) {
    return marginStep * baseMargin
  }
  return baseMargin
}

export const borderWidth = (showBorder?: boolean) => {
  return showBorder ? BORDER_WIDTH : 0
}

export const determinePadding = (
  baseMargin: number,
  paddingStepHorizontal?: number,
  paddingStepVertical?: number,
  border?: boolean,
) => {
  let padding: Padding = {
    padding: CONTAINER_MARGIN - borderWidth(border),
  }

  if (paddingStepHorizontal || paddingStepVertical) {
    const paddingHorizontal =
      (paddingStepHorizontal ? getMargin(baseMargin, paddingStepHorizontal) : CONTAINER_MARGIN) - borderWidth(border)
    const paddingVertical =
      (paddingStepVertical ? getMargin(baseMargin, paddingStepVertical) : CONTAINER_MARGIN) - borderWidth(border)
    padding = {
      paddingRight: paddingHorizontal,
      paddingLeft: paddingHorizontal,
      paddingTop: paddingVertical,
      paddingBottom: paddingVertical,
    }
  }

  return padding
}
