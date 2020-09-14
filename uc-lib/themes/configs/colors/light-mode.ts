import { ColorTheme } from "../../type-defs"
import { deepFreeze } from "shared-lib/utilities/object-utils"

export const _LIGHT_MODE_THEME_ID = "light_mode"

export const _LIGHT_MODE_COLOR_THEME: ColorTheme = deepFreeze({
  identifier: _LIGHT_MODE_THEME_ID,
  displayName: "Light mode",
  shade: "light",
  colors: {
    // Colors
    blurple: "#431AD8",
    grey: "#A3A3A3",
    green: "#00A87E",
    black: "#100D23",
    greenHover: "#43B893",
    greenPressed: "#00986A",
    greenHighlight: "#DEF3EC",
    larchYellow: "#F4BE19",
    larchYellowHover: "#F5D624",
    larchYellowPressed: "#F3A70C",
    glacialBlue: "#3D98D2",
    paintbrushRed: "#E05666",

    // Grayscale
    obsidian: "#100D23",
    basalt: "#8A8A8A",
    granite: "#ABABAB",
    limestone: "#C3D0DB",
    limestoneHover: "#EEEEEE",
    limestonePressed: "#D0D0D0",
    quartz: "#FAFAFA",
    crystal: "#FFFFFF",
    crystalHover: "#F7F7F7",
    crystalPressed: "#EEEEEE",

    // Special
    clear: "rgba(0,0,0,0)",
    disabled: "#431AD8",
    alwaysDark: "#431AD8",
    alwaysLight: "#FFFFFF",
    overlay: "rgba(18,18,18,0.3)",
  },
  fontColors: {
    primary: "obsidian",
    primaryAlt: "crystal",
    secondary: "grey",
    hint: "granite",
    brand: "blurple",
    error: "paintbrushRed",
    alwaysLight: "alwaysLight",
    alwaysDark: "alwaysDark",
  },
  backgroundColors: {
    transparent: "clear",
    primary: "crystal",
    secondary: "quartz",
    tertiary: "limestone",
    alwaysLight: "alwaysLight",
    alwaysDark: "alwaysDark",
    overlay: "overlay",
    error: "paintbrushRed",
    highlight: "larchYellow",
    brand: "blurple",
    unread: "greenHighlight",
    trust: "glacialBlue",
  },
})
