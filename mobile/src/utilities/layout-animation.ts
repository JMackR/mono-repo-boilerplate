import { LayoutAnimation as RNLayoutAnimation } from "react-native"
import { AnimationType, AnimationCurve } from "uc-lib"

export const LayoutAnimation = {
  /**
   * Invoking this will cause the next render pass to animate any and all layout changes.
   * It is common to invoke this before updating state that will result in a layout change.
   *
   * The animation parameters, our naming of them, and their intended usage come directly from redibs's HIG:
   * https://docs.google.com/document/d/1fQja_qk287LIGiJokUw4ve-p3_t376EgQlsVvXpks6k/
   *
   * @param type The intended type of the animation.
   * @param curve The easing curve to be applied to the animation.
   * @example
   * const MyHideableImageComponent = (props: RemoteImageProps) => {
   *  const [ imageVisible, setImageVisible ] = useState(false)
   *  const onClick = () => {
   *    LayoutAnimation.configureNext(AnimationType.Simple, AnimationCurve.Standard)
   *    setImageVisible(true)
   *  }
   *  return (
   *    <Flex direction='column'>
   *      {!!imageVisible && <RemoteImage {...props} />}
   *      <Button title={"Show Image"} onClick={onClick} />
   *    </Flex>
   *  )
   * }
   */
  configureNext: (type: AnimationType, curve: AnimationCurve) => {
    RNLayoutAnimation.configureNext({
      duration: type,
      create: {
        type: presetTypeForCurve[curve],
        property: RNLayoutAnimation.Properties.opacity,
      },
      update: {
        type: presetTypeForCurve[curve],
      },
      delete: {
        type: presetTypeForCurve[curve],
        property: RNLayoutAnimation.Properties.opacity,
      },
    })
  },
}

const presetTypeForCurve = {
  [AnimationCurve.Standard]: RNLayoutAnimation.Types.easeInEaseOut,
  [AnimationCurve.Decelerate]: RNLayoutAnimation.Types.easeOut,
  [AnimationCurve.Accelerate]: RNLayoutAnimation.Types.easeIn,
}
