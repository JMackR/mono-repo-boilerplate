export const getScreenWidthMinusMargin = (marginAmount: number): number => {
  return window.innerWidth - (marginAmount + marginAmount)
}
