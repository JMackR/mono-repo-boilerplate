import { ColorTheme } from "../../type-defs"
import { deepFreeze } from "shared-lib/utilities/object-utils"

export const _DARK_MODE_THEME_ID = "dark_mode"

export const _DARK_MODE_COLOR_THEME: ColorTheme = deepFreeze({
  identifier: _DARK_MODE_THEME_ID,
  displayName: "Dark mode",
  shade: "dark",
  colors: {
    // Colors
    blurple: "#431AD8",
    grey: "#A3A3A3",
    green: "#00A87E",
    black: "#100D23",
    greenHover: "#43B893",
    greenPressed: "#00986A",
    greenHighlight: "#303D59",
    larchYellow: "#F4BE19",
    larchYellowHover: "#F5D624",
    larchYellowPressed: "#F3A70C",
    glacialBlue: "#3D98D2",
    paintbrushRed: "#E05666",

    // Grayscale
    obsidian: "#F7F7F7",
    basalt: "#E2E2E2",
    granite: "#ABABAB",
    limestone: "#303d59",
    limestoneHover: "#364666",
    limestonePressed: "#262D3F",
    quartz: "#182640",
    crystal: "#001029",
    crystalHover: "#23304B",
    crystalPressed: "#121212",

    // Special
    clear: "rgba(0,0,0,0)",
    disabled: "#182640",
    alwaysDark: "#001029",
    alwaysLight: "#F7F7F7",
    overlay: "rgba(255,255,255,0.6)",
  },
  fontColors: {
    primary: "obsidian",
    primaryAlt: "crystal",
    secondary: "blurple",
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
