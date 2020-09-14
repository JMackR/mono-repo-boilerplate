import { size } from "../spacing"
import R from "ramda"

// TODO Memoize

export const sizes = {
  /** Height at a given size multiplier */
  height: R.memoizeWith(R.toString, (multiplier: number) => ({ height: size(multiplier) })),
  /** Width at a given size multiplier */
  width: R.memoizeWith(R.toString, (multiplier: number) => ({ width: size(multiplier) })),
  /** @deprecated (see square) Equal width and height at a given size multiplier */
  size: R.memoizeWith(R.toString, (multiplier: number) => ({
    width: size(multiplier),
    height: size(multiplier),
  })),
  /** Equal width and height at a given size multiplier */
  square: R.memoizeWith(R.toString, (multiplier: number) => ({
    width: size(multiplier),
    height: size(multiplier),
  })),
  /** Rectangle with width and height at a given size multiplier */
  rect: R.memoizeWith(R.toString, (widthMultiplier: number, heightMultiplier) => ({
    width: size(widthMultiplier),
    height: size(heightMultiplier),
  })),
}
