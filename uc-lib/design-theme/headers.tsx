import * as React from "react"
import { StackHeaderOptions } from "@react-navigation/stack/src/types"
import { hairline, size } from "./spacing"
import { color } from "./color"
import { AppHeaderImage, Button } from "../components"
import { useNavigation } from "@react-navigation/core"
import { getNavigationSafeArea } from "./navigation"
import { ButtonPresetNames } from "../components/button/button.presets"
import { ButtonProps } from "../components/button/button.props"
import { mergeStyles } from "../utils/styles"
import { styles } from "./styles"

interface BackButtonProps extends ButtonProps {
  /** Type of button preset to use */
  preset?: ButtonPresetNames
  /** Whether this is close-button-style */
  close?: boolean
  /** Whether this is disabled */
  disabled?: boolean
  /** Override for behavior */
  onPress?: () => void
}

/**
 * The screen header back button
 * @param preset
 * @param close
 * @param disabled
 * @param onPress
 * @param style
 * @constructor
 */
export const BackButton = ({ preset, close, disabled, onPress, style }: BackButtonProps) => {
  const navigation = useNavigation()
  return (
    <Button
      preset={preset ?? "roundContrastSmall"}
      icon={close ? "x" : "arrow-left"}
      style={mergeStyles(styles.marginLeft2, style)}
      disabled={disabled}
      onPress={() => {
        if (onPress) onPress()
        else if (navigation.canGoBack()) navigation.goBack()
      }}
    />
  )
}

/** The height of the header is standard size plus safe area */
export const headerHeight = (): number => size(9) + getNavigationSafeArea().top

export const headers: Record<string, StackHeaderOptions> = {
  get primary() {
    return {
      headerStyle: {
        height: headerHeight(),
        backgroundColor: color.primary,
      },
      headerBackTitleVisible: false,
      // eslint-disable-next-line react/display-name
      headerBackImage: () => <BackButton />,
    }
  },
  get primaryClose() {
    return {
      headerStyle: {
        height: headerHeight(),
        backgroundColor: color.primary,
      },
      headerBackTitleVisible: false,
      // eslint-disable-next-line react/display-name
      headerBackImage: () => <BackButton close />,
    }
  },
  get secondary() {
    return {
      headerStyle: {
        height: headerHeight(),
        backgroundColor: color.secondary,
      },
      headerBackTitleVisible: false,
      // eslint-disable-next-line react/display-name
      headerBackImage: () => <BackButton />,
    }
  },
  get soft() {
    return {
      headerStyle: {
        height: headerHeight(),
        backgroundColor: color.softBackground,
      },
      headerBackTitleVisible: false,
      // eslint-disable-next-line react/display-name
      headerBackImage: () => <BackButton />,
    }
  },
  get secondaryClose() {
    return {
      headerStyle: {
        height: headerHeight(),
        backgroundColor: color.secondary,
      },
      headerBackTitleVisible: false,
      // eslint-disable-next-line react/display-name
      headerLeft: () => <BackButton close />,
    }
  },
  get dark() {
    return {
      headerStyle: {
        height: headerHeight(),
        backgroundColor: color.dark,
      },
      headerBackTitleVisible: false,
      // eslint-disable-next-line react/display-name
      headerBackImage: () => <BackButton />,
    }
  },
  get darkClose() {
    return {
      headerStyle: {
        height: headerHeight(),
        backgroundColor: color.dark,
      },
      headerBackTitleVisible: false,
      // eslint-disable-next-line react/display-name
      headerLeft: () => <BackButton close />,
    }
  },
  get darkCloseBorder() {
    return {
      headerStyle: {
        height: headerHeight(),
        backgroundColor: color.dark,
        borderBottomWidth: hairline(4),
        borderBottomColor: color.lightTransparent4,
      },
      headerBackTitleVisible: false,
      // eslint-disable-next-line react/display-name
      headerLeft: () => <BackButton close />,
    }
  },
  get transparentClose() {
    return {
      headerStyle: {
        height: headerHeight(),
        elevation: 0,
        shadowOpacity: 0,
      },
      headerBackTitleVisible: false,
      // eslint-disable-next-line react/display-name
      headerLeft: () => <BackButton preset="roundLightSmall" close />,
    }
  },
  get gray() {
    return {
      headerStyle: {
        height: headerHeight(),
        backgroundColor: color.shade4,
      },
      headerBackTitleVisible: false,
      // eslint-disable-next-line react/display-name
      headerBackImage: () => <BackButton preset="roundLightSmall" />,
    }
  },
  get grayClose() {
    return {
      headerStyle: {
        height: headerHeight(),
        backgroundColor: color.shade4,
      },
      headerBackTitleVisible: false,
      // eslint-disable-next-line react/display-name
      headerLeft: () => <BackButton preset="roundLightSmall" close />,
    }
  },
  get appIcon() {
    return {
      headerStyle: { height: headerHeight(), elevation: 0, shadowOpacity: 0 },
      headerBackTitleVisible: false,
      headerLeft: () => null,
      headerTitle: () => <AppHeaderImage />,
    }
  },
}

export type HeaderTypes = keyof typeof headers
