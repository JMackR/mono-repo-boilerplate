import { TextColors, Colors } from "uc-lib/themes"

export interface RemoteSVGSource {
  uri: string
  size: {
    width: number
    height: number
  }
}

/**
 * @warning !!!THIS SHLD NOT BE USED TSIDE OF THE SVG COMPONENT!!!
 * An extension on the Colors type to be used when passing color props to
 * the `SVG` member of LocalSVGSource.
 */
export interface SVGColors extends Colors {
  tintColor?: string
}

export interface LocalSVGSource {
  SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & SVGColors>
  size?: {
    width: number | string
    height: number | string
  }
}

export interface SVGPropsBase {
  onPress?(): void
  tint?: keyof TextColors
  remoteSVG?: RemoteSVGSource
  localSVG?: LocalSVGSource
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
