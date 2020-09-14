import React from "react"
import { SvgUri } from "react-native-svg"
import { SVGPropsNative } from "./svg.props.native"
import { useColor, useColorForTextColor } from "../../../themes"
import invariant from "invariant"
import { LocalSVGSource } from "./svg.props-base"
import { ClickableOpacity } from "../../clickable/clickable-opacity"
export const SVG = (props: SVGPropsNative) => {
  const { remoteSVG, localSVG, tint, testID } = props
  invariant(remoteSVG || localSVG, "'localSVG' or 'remoteSVG' are required for SVG to operate correctly")

  const { colors } = useColor()
  const iconTintColor = useColorForTextColor(tint!)
  if (remoteSVG) {
    invariant(tint === undefined, 'The property "tint" is not supported for remoteSVGs: ' + JSON.stringify(tint))
    const { size, uri } = remoteSVG
    return <SvgUri {...size} uri={uri} onPress={props.onPress} />
  } else {
    const { SVG, size } = localSVG as LocalSVGSource
    // WARNING: Do not assign testID to SVG directly
    if (props.onPress) {
      return (
        <ClickableOpacity onClick={props.onPress} testID={testID}>
          <SVG {...size} {...colors} tintColor={iconTintColor} />
        </ClickableOpacity>
      )
    } else {
      return <SVG {...size} {...colors} tintColor={iconTintColor} />
    }
  }
}
