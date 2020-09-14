import {
  ActionLeftChevron,
  ActionLeftChevronSecondary,
  NavigationBarItem,
  ActionClose,
  AnimationType,
  useColorForBackgroundColor,
  ActionAndroidChevron,
  FilterIcon,
} from "uc-lib"
import { Navigation } from "./navigation"
import { TransitionPresets, StackNavigationOptions } from "@react-navigation/stack"
import { Easing, Platform } from "react-native"
import { TransitionSpec } from "@react-navigation/native/lib/typescript/src/types"
import { translate } from "shared-lib"

/**
 * Navigation Elements
 */
export const getNavigationBackIcon = () => {
  return Platform.OS === "android" ? ActionAndroidChevron : ActionLeftChevron
}

/**
 * The extra click action is useful for screen-specific analytics events.
 * @param extraClickAction callback that will be called when close is pressed
 */
export const getNavigationBackButton = (baseTestId?: string, extraClickAction?: () => void): NavigationBarItem => {
  return {
    icon: getNavigationBackIcon(),
    testID: (baseTestId || "uc-lib.navigation-bar") + ".back",
    pressHandler: () => {
      extraClickAction && extraClickAction()
      Navigation.goBack()
    },
  }
}

export const getNavigationCloseButton = (
  baseTestId: string,
  extraClickAction?: () => void,
  stepsToPop?: number,
): NavigationBarItem => {
  return {
    title: translate("common-actions.close"),
    icon: ActionClose,
    testID: (baseTestId || "uc-lib.navigation-bar") + ".close",
    pressHandler: () => {
      extraClickAction && extraClickAction()
      Navigation.popRootNavigator(() => {}, stepsToPop)
    },
  }
}

export const getNavigationFilterButton = (
  baseTestId: string,
  extraClickAction?: () => void,
  stepsToPop?: number,
): NavigationBarItem => {
  return {
    icon: FilterIcon,
    testID: (baseTestId || "uc-lib.navigation-bar") + ".filter",
    pressHandler: () => {
      extraClickAction && extraClickAction()
      Navigation.popRootNavigator(() => {}, stepsToPop)
    },
  }
}

export const getNavigationCancelButton = (baseTestId?: string, extraClickAction?: () => void): NavigationBarItem => {
  return {
    title: translate("common-actions.cancel"),
    testID: (baseTestId || "uc-lib.navigation-bar") + ".cancel",
    pressHandler: () => {
      extraClickAction && extraClickAction()
      Navigation.popRootNavigator()
    },
  }
}

/**
 * Transition Configs
 */

const modalDialogOverlayTransitionConfig: TransitionSpec = {
  animation: "timing",
  config: {
    duration: 350,
    easing: Easing.inOut(Easing.poly(2)),
  },
}

const modalCardOverlayTransitionConfig: TransitionSpec = {
  animation: "timing",
  config: {
    duration: 10,
  },
}

/**
 * Screen Options
 */
export const FullScreenModalNoAnimateOptions: StackNavigationOptions = {
  animationEnabled: false,
}

export const ForcedFullScreenModalOptions: StackNavigationOptions = {
  gestureEnabled: false,
  ...TransitionPresets.ModalSlideFromBottomIOS,
  transitionSpec: {
    open: {
      animation: "timing",
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: "timing",
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
}

export const FullScreenModalOptions: StackNavigationOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
  transitionSpec: {
    open: {
      animation: "timing",
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: "timing",
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
}

export const PushPopStackAnimationOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  transitionSpec: {
    open: {
      animation: "timing",
      config: {
        duration: AnimationType.Opens,
        easing: Easing.out(Easing.ease),
      },
    },
    close: {
      animation: "timing",
      config: {
        duration: AnimationType.ExitsAndClosings,
        easing: Easing.out(Easing.ease),
      },
    },
  },
}

export const ModalDialogOverlayOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: "transparent" },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: modalDialogOverlayTransitionConfig,
    close: modalDialogOverlayTransitionConfig,
  },
}

export const useMultiStepCardNavigatorOptions = () => {
  const backgroundColor = useColorForBackgroundColor("overlay")
  const navigationOptions: StackNavigationOptions = {
    ...FullScreenModalOptions,
    cardStyle: { backgroundColor: "transparent" },
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current: { progress }, layouts }) => ({
      cardStyle: {
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        backgroundColor,
      },
    }),
  }
  return { MultiStepModalCardNavigatorOptions: navigationOptions }
}

export const ModalCardOverlayOption: StackNavigationOptions = {
  cardStyle: { backgroundColor: "transparent" },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: modalCardOverlayTransitionConfig,
    close: modalCardOverlayTransitionConfig,
  },
}
