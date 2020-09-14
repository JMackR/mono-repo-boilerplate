import React from "react"
import {
  NavigationBarItem,
  ActionClose,
  Flex,
  NavigationBar,
  NAVIGATION_BAR_HEIGHT,
  ScreenProvider,
  useScreen,
  Background,
} from "uc-lib"
import { Navigation } from "../navigation"
import { StackHeaderProps, StackNavigationOptions } from "@react-navigation/stack"
import { Animated, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { getNavigationBackButton } from "../common"

interface StackHeaderMixins {
  analyticsScreenName?: string
  leftNavigationBarItems?: NavigationBarItem[]
  rightNavigationBarItems?: NavigationBarItem[]
  isRootNavigationBar?: boolean
  allowModalDismissal?: boolean
  onModalDismissal?: () => void
  subHeader?: () => JSX.Element
  subHeaderHeight?: number
}

export const StackHeader: React.FC<StackHeaderProps> = props => {
  return (
    <ScreenProvider>
      <StackHeaderContents {...props} />
    </ScreenProvider>
  )
}

const StackHeaderContents: React.FC<StackHeaderProps> = ({ scene, previous }) => {
  const { options } = scene.descriptor
  const {
    analyticsScreenName,
    leftNavigationBarItems,
    rightNavigationBarItems,
    isRootNavigationBar,
    allowModalDismissal,
    onModalDismissal,
    subHeader,
    subHeaderHeight,
  } = options as StackHeaderMixins

  const { setScreenName } = useScreen()
  React.useEffect(() => {
    if (analyticsScreenName) {
      setScreenName(analyticsScreenName)
    }
  }, [analyticsScreenName])

  const isNotFirstScreenInStack = previous && scene.descriptor.options.headerLeftContainerStyle !== null

  const leftItems: NavigationBarItem[] = []
  if (isNotFirstScreenInStack) {
    leftItems.push(getNavigationBackButton())
  }

  if (leftNavigationBarItems) {
    leftItems.push(...leftNavigationBarItems)
  }

  const rightItems: NavigationBarItem[] = []
  if (rightNavigationBarItems) {
    rightItems.push(...rightNavigationBarItems)
  }

  if (allowModalDismissal) {
    rightItems.push({
      icon: ActionClose,
      pressHandler: () => {
        onModalDismissal && onModalDismissal()
        Navigation.popRootNavigator()
      },
    })
  }

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        stackheadercontainer: {
          height: NAVIGATION_BAR_HEIGHT + (subHeaderHeight || 0),
          overflow: "hidden",
        },
      }),
    [subHeaderHeight],
  )

  const headerOpacity = scene.progress.current

  return (
    <Flex direction="column">
      <Background />
      <Animated.View style={[styles.stackheadercontainer, { opacity: headerOpacity }]}>
        <Flex direction="column" grow={1} height={NAVIGATION_BAR_HEIGHT}>
          <NavigationBar
            title={options.title || ""}
            leftItems={leftItems}
            rightItems={rightItems}
            isRootNavBar={isRootNavigationBar}
          />
        </Flex>
        {!!subHeader && subHeader()}
      </Animated.View>
    </Flex>
  )
}

export interface StackHeaderConfig {
  analyticsScreenName: string
  title: string
  hideHeader?: boolean
  leftNavigationBarItems?: NavigationBarItem[]
  rightNavigationBarItems?: NavigationBarItem[]
  isRootNavigationBar?: boolean
  allowModalDismissal?: boolean
  onModalDismissal?: () => void
  subHeader?: {
    headerFunction: () => JSX.Element
    headerHeight: number
  }
}

export const useStackHeaderConfiguration = (initialConfiguration?: StackHeaderConfig) => {
  const navigation = useNavigation()

  const optionsFromConfig = (config: StackHeaderConfig): StackNavigationOptions & StackHeaderMixins => {
    const additionalHeaderHeight = config.subHeader ? config.subHeader.headerHeight : 0
    const subHeaderFunction = config.subHeader ? config.subHeader.headerFunction : undefined

    return {
      title: config.title,
      header: config.hideHeader ? undefined : (headerProps: StackHeaderProps) => <StackHeader {...headerProps} />,
      headerStyle: config.hideHeader
        ? undefined
        : {
            height: NAVIGATION_BAR_HEIGHT + additionalHeaderHeight,
          },
      // The following props are mixed in even though they do not exist
      // in the react-navigation provided StackNavigationOptions interface
      analyticsScreenName: config.analyticsScreenName,
      leftNavigationBarItems: config.leftNavigationBarItems,
      rightNavigationBarItems: config.rightNavigationBarItems,
      isRootNavigationBar: config.isRootNavigationBar,
      allowModalDismissal: config.allowModalDismissal,
      onModalDismissal: config.onModalDismissal,
      subHeader: subHeaderFunction,
      subHeaderHeight: additionalHeaderHeight,
    }
  }

  React.useEffect(() => {
    if (initialConfiguration) {
      const options = optionsFromConfig(initialConfiguration)
      navigation.setOptions(options)
    }
  }, [])

  const updateHeader = (config: StackHeaderConfig) => {
    const options = optionsFromConfig(config)
    navigation.setOptions(options)
  }

  return {
    updateHeader,
  }
}
