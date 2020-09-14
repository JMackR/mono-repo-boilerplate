import React from "react"
import {
  useNavigationBuilder,
  createNavigatorFactory,
  StackRouter,
  StackRouterOptions,
  DefaultNavigatorOptions,
  RouteProp,
} from "@react-navigation/native"
import {
  StackNavigationConfig,
  StackNavigationOptions,
  StackHeaderProps,
} from "@react-navigation/native/lib/typescript/src/types"
import { StackView } from "@react-navigation/stack"
import { Margin, useBorder, NAVIGATION_BAR_HEIGHT, Background } from "uc-lib"
import { PushPopStackAnimationOptions } from "../common"
import { View, StyleSheet, Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { StackHeader } from "../stack-header/stack-header"

const TOP_MARGIN_STEP = 8

interface ModalCardStackNavigatorProps
  extends DefaultNavigatorOptions<StackNavigationOptions>,
    StackRouterOptions,
    StackNavigationConfig {}

// Creating this interface because it is not provided by react-navigation
interface ScreenOptionsType {
  route: RouteProp<Record<string, object | undefined>, string>
  // tslint:disable-next-line: no-any
  navigation: any
}

const ModalCardStackNavigator = (props: ModalCardStackNavigatorProps) => {
  const { initialRouteName, children, screenOptions, ...rest } = props

  const additionalScreenOptions: StackNavigationOptions = {
    header: (headerProps: StackHeaderProps) => <StackHeader {...headerProps} />,
    safeAreaInsets: { top: 0 },
    headerStatusBarHeight: 0,
    cardStyle: {
      marginTop: 0,
      paddingTop: 0,
    },
    headerStyle: {
      height: NAVIGATION_BAR_HEIGHT,
    },
    ...PushPopStackAnimationOptions,
  }

  let formattedScreenOptions: StackNavigationOptions | ((props: ScreenOptionsType) => StackNavigationOptions)
  if (typeof screenOptions === "function") {
    formattedScreenOptions = (insideProps: ScreenOptionsType) => {
      const insideOptions = screenOptions(insideProps)
      return {
        ...additionalScreenOptions,
        ...insideOptions,
      }
    }
  } else {
    formattedScreenOptions = {
      ...additionalScreenOptions,
      ...screenOptions,
    }
  }

  const { state, navigation, descriptors } = useNavigationBuilder(StackRouter, {
    children,
    screenOptions: formattedScreenOptions,
    initialRouteName,
  })

  const safeAreaInsets = useSafeAreaInsets()
  const { baseBorder } = useBorder()

  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? 0 : safeAreaInsets.top,
      flexGrow: 1,
    },
    roundedCorners: {
      flexGrow: 1,
      borderTopLeftRadius: baseBorder.cornerRadius.large,
      borderTopRightRadius: baseBorder.cornerRadius.large,
      overflow: "hidden",
    },
  })

  return (
    <View style={styles.container}>
      <Margin direction="column" grow={1} marginTopStep={TOP_MARGIN_STEP}>
        <View style={styles.roundedCorners}>
          <Background />
          <StackView {...rest} state={state} navigation={navigation} descriptors={descriptors} />
        </View>
      </Margin>
    </View>
  )
}

/**
 * This is an equivalent contructor to react-navigation's built in `createStackNavigator` function.
 * It is used the exact same way but provides the modal card styling.
 */
export const createModalCardStackNavigator = createNavigatorFactory(ModalCardStackNavigator)
