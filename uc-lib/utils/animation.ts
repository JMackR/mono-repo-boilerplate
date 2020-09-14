import Animated, { Easing } from "react-native-reanimated"

export interface AnimationOptions {
  /** The value to animate */
  value: Animated.Value<number>
  /** The final value */
  toValue: number
  /** The amount of time, in seconds, before the final value is reached */
  duration: number
  /** An optional interpolation for the animation; defaults to ease out */
  interpolation?: Animated.EasingFunction
  /** An optional callback; this may be called even if the animation doesn't complete */
  onAnimationEnded?: (data: { finished: boolean }) => any
}

/**
 * Animates a value, starting immediately
 * @param value
 * @param toValue
 * @param duration
 * @param interpolation
 * @param onAnimationEnded
 */
export function animateValue({
  value,
  toValue,
  duration,
  interpolation,
  onAnimationEnded,
}: AnimationOptions) {
  Animated.timing(value, {
    toValue,
    duration,
    easing: interpolation || Easing.out(Easing.ease),
  }).start(onAnimationEnded)
}
