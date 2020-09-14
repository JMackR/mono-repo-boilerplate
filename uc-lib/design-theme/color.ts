import { palette } from "./palette"
import Color from "color"

// TODO It makes me cry, but we might need another alpha (see alpha0)
const alpha0 = 0.9
const alpha1 = 0.7
const alpha2 = 0.5
const alpha3 = 0.2
const alpha4 = 0.15

/**
 * Exported opacity values
 */
export const opacity = {
  /** Down-state opacity */
  down: alpha1,
  /** Disabled opacity */
  disabled: alpha2,
  /** Inactive opacity (never selectable, eg unowned Mojis) */
  inactive: alpha3,
}

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /** The screen background.  */
  background: palette.white,
  /** The dark screen background */
  darkBackground: palette.black,
  /** The softer (not quite dark) dark background */
  softBackground: palette.softBlack,
  /** Branding color */
  brand: palette.opticYellow,
  /** Branding color @ heavy opacity */
  brandTransparent1: new Color(palette.opticYellow).alpha(0.9).toString(), // Special case
  /** Branding color @ medium opacity */
  brandTransparent2: new Color(palette.opticYellow).alpha(alpha2).toString(),
  /** Branding color @ light opacity */
  brandTransparent3: new Color(palette.opticYellow).alpha(alpha2).toString(),
  /** Danger color */
  danger: palette.red,
  /** Danger color (shade 1) */
  danger1: palette.red1,
  /** Danger color (shade 2) */
  danger2: palette.red2,
  /** Danger color (shade 3) */
  danger3: palette.red3,
  /** Notifications */
  notification: palette.red,
  /** Notification text */
  notificationText: palette.white,
  /** Developer warning color */
  developer: palette.developer,
  /** The main tinting color. */
  primary: palette.purple,
  /** Primary shade 1 (dark) */
  primary1: palette.purple1,
  /** Primary shade 2 (medium) */
  primary2: palette.purple2,
  /** Primary shade 3(light) */
  primary3: palette.purple3,
  /** The secondary tinting color. */
  secondary: palette.blue,
  /** The secondary tinting color (shade 1) */
  secondary1: palette.blue1,
  /** The secondary tinting color (shade 2) */
  secondary2: palette.blue2,
  /** The secondary tinting color (shade 3) */
  secondary3: palette.blue3,
  /** Muted secondary color */
  muted: palette.metal,
  /** Muted secondary color (shade 1) */
  muted1: palette.metal2,
  /** Muted secondary color (shade 2) */
  muted2: palette.metal2,
  /** Muted secondary color (shade 3) */
  muted3: palette.metal3,
  /** Highlight tinting color */
  highlight: palette.sunYellow,
  /** Highlight tinting color (shade 1) */
  highlight1: palette.sunYellow1,
  /** Highlight tinting color (shade 2) */
  highlight2: palette.sunYellow2,
  /** Highlight tinting color (shade 3) */
  highlight3: palette.sunYellow3,
  /** The dark tinting color */
  dark: palette.black,
  /** The light tinting color */
  light: palette.white,
  /** The default color of text in many components. */
  text: palette.black,
  /** Default loading silhouette color */
  loading: palette.gray1,
  /** Hairline border */
  border: palette.gray2,
  /** Dark shadow color */
  shadow: "rgba(0, 0, 0, 0.35)",
  // TODO We are trying to define these as pre-mixed, can we do that for grays? Maybe we need both?
  /** Transparencies of light (most opaque) */
  lightTransparent0: new Color(palette.white).alpha(alpha0).toString(),
  /** Transparencies of light (slightly less opaque) */
  lightTransparent1: new Color(palette.white).alpha(alpha1).toString(),
  /** Transparencies of light (medium opacity) */
  lightTransparent2: new Color(palette.white).alpha(alpha2).toString(),
  /** Transparencies of light (slightly opaque) */
  lightTransparent3: new Color(palette.white).alpha(alpha3).toString(),
  /** Transparencies of light (slightly less opaque) */
  lightTransparent4: new Color(palette.white).alpha(alpha4).toString(),
  /** Transparencies of dark (almost solid) */
  darkTransparent0: new Color(palette.black).alpha(alpha0).toString(),
  /** Transparencies of dark (most opaque) */
  darkTransparent1: new Color(palette.black).alpha(alpha1).toString(),
  /** Transparencies of dark (medium opacity) */
  darkTransparent2: new Color(palette.black).alpha(alpha2).toString(),
  /** Transparencies of dark (slightly opaque) */
  darkTransparent3: new Color(palette.black).alpha(alpha3).toString(),

  /** Misc element container background color, light gray */
  containerBackground1: palette.gray4,
  /** Misc element container background color, darker gray (contrast to containerBackground1) */
  containerBackground2: palette.gray5,

  /** Story background color, light */
  storyBackgroundLight: palette.offWhite,
  /** Story background color, dark */
  storyBackgroundDark: palette.gray1,

  /** Caption text on a white background */
  captionText: palette.gray1,

  /** Background for messages */
  messageBackground: palette.metal3,

  /** Skeleton loader color */
  skeletonLoader: "#efefef", // TODO Stolen from rn-placeholder, refactor

  /** Shade between light and dark, descending darkness */
  shade1: palette.gray1,
  /** Shade between light and dark, descending darkness */
  shade2: palette.gray2,
  /** Shade between light and dark, descending darkness */
  shade3: palette.gray3,
  /** Shade between light and dark, descending darkness */
  shade4: palette.gray4,

  /** First position (gold) */
  position1: palette.sunYellow,
  /** Second position (silver) */
  position2: palette.red3,
  /** Third position (bronze) */
  position3: palette.blue1,

  /** Artist highlight color */
  artistHighlight: palette.blue,

  /** Color representing rank */
  rank: palette.red1,
  /** Color representing stars */
  star: palette.sunYellow,
  /** Color representing crew users (counts, icons) */
  crewUsers: palette.blue1,

  /** Chat style - paid messages */
  chatPaidMessage: palette.sunYellow1,
  /** Chat style - song requests */
  chatRequests: palette.blue3,
}

export type ColorName = keyof typeof color
