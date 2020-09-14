import { shadow } from "./shadow"
import { arrangement } from "./arrangement"
import { padding } from "./padding"
import { margin } from "./margin"
import { shape } from "./shape"
import { state } from "./state"
import { separators } from "./separators"
import { sizes } from "./sizes"

/**
 * IMPORTANT NOTE
 *
 * We should not fill this up completely. Let us be reasonable how much we put in here.
 * Let's discuss together each time something gets added.
 */
export const styles = {
  ...shadow,
  ...arrangement,
  ...padding,
  ...margin,
  ...shape,
  ...state,
  ...separators,
  ...sizes,
}
