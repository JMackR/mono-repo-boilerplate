import React from "react"
import { Text, Spacer, Overlay, Flex, Background, SVG, LocalSVGSource, ClickableOpacity, Stack } from "uc-lib/controls"
import { NavigationBarProps, NavigationBarItem } from "./navigation-bar-props"
import invariant from "invariant"
import { TextColors } from "../../themes"

export const NAVIGATION_BAR_HEIGHT = 56

enum LAYOUTS {
  NavBarHeight = NAVIGATION_BAR_HEIGHT,
  NonRootNavBarTitleTopSpacing = 6,
  RootNavBarTitleTopSpacing = 4,
  NonRootNavBarTitleHorizontal = 12,
  RootNavBarTitleHorizontal = 4,
  NavBarBottomSpacing = 2,
  NavigationItemSpacing = 2,
  NavigationItemIconSize = 24,
  NavigationItemTouchTarget = 40,
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  title,
  leftItems,
  rightItems,
  isRootNavBar,
  barItemsTint,
  testID,
  backgroundColor,
}) => {
  const titleTextType = isRootNavBar ? "headline1" : "headline3"
  const titleTextAlignment = isRootNavBar ? "flex-start" : "center"
  const titleTopInset = isRootNavBar ? LAYOUTS.RootNavBarTitleTopSpacing : LAYOUTS.NonRootNavBarTitleTopSpacing
  // MB :: Temporary fix. Will only work for non tab bar screens with icon based right/left items
  // Nav bar fix so long titles don't show on top of back button and right action button. Add a fixed margin for screen label since all nav bar items are absolutely positioned.
  // (TEMP FIX - margin to be made dynamically calculated later)
  const marginHorizontalStep = !isRootNavBar ? LAYOUTS.NonRootNavBarTitleHorizontal : LAYOUTS.RootNavBarTitleHorizontal
  if (isRootNavBar) {
    invariant(!leftItems || leftItems.length === 0, "You cannot pass left bar button items to a root navigation bar")
  }

  return (
    <Flex
      grow={0}
      shrink={0}
      direction="row"
      basis={LAYOUTS.NavBarHeight}
      width="100%"
      testID={(testID || "ucl.navigation-bar") + ".title"}
    >
      <Background type={backgroundColor} />
      <Overlay
        insetTopStep={titleTopInset}
        insetBottomStep={LAYOUTS.NavBarBottomSpacing}
        insetLeftStep={marginHorizontalStep}
        insetRightStep={marginHorizontalStep}
        axisDistribution={titleTextAlignment}
      >
        <Text
          textType={titleTextType}
          textAlign="center"
          testID={(testID || "ucl.navigation-bar") + ".title"}
          text={title}
          color={"primaryAlt"}
        />
      </Overlay>
      <NavigationItemStack items={rightItems} direction="row-reverse" barItemsTint={barItemsTint} />
      {!!!isRootNavBar && <NavigationItemStack items={leftItems} direction="row" barItemsTint={barItemsTint} />}
    </Flex>
  )
}

interface NavigationItemStackProps {
  items: NavigationBarItem[] | undefined
  direction: "row" | "row-reverse"
  barItemsTint?: keyof TextColors
}

const NavigationItemStack = (props: NavigationItemStackProps) => {
  const { items, direction, barItemsTint } = props
  if (!!!items || items.length === 0) {
    return null
  }

  const leftStep = direction === "row-reverse" ? undefined : LAYOUTS.RootNavBarTitleHorizontal
  const rightStep = direction === "row" ? undefined : LAYOUTS.RootNavBarTitleHorizontal
  return (
    <Overlay
      insetTopStep={LAYOUTS.RootNavBarTitleTopSpacing}
      insetBottomStep={LAYOUTS.NavBarBottomSpacing}
      insetLeftStep={leftStep}
      insetRightStep={rightStep}
      direction={direction}
      crossAxisDistribution="flex-end"
      grow={0}
      shrink={1}
      testID={"uc-lib.navigation-bar." + (direction === "row" ? "left-items" : "right-items")}
    >
      <Stack direction="row" childSeparationStep={LAYOUTS.NavigationItemSpacing}>
        {items.map((item: NavigationBarItem, index: number) => (
          <NavigationItem item={item} index={index} key={index} direction={direction} barItemsTint={barItemsTint} />
        ))}
      </Stack>
    </Overlay>
  )
}

interface NavigationItemProps {
  item: NavigationBarItem
  index: number
  direction: "row" | "row-reverse"
  barItemsTint?: keyof TextColors
}

const NavigationItem = (props: NavigationItemProps) => {
  const { item, index, direction, barItemsTint } = props
  const { title, icon, tint, pressHandler, testID } = item
  const resizedSVG = resizeSVGForNavigationBarItem(icon)
  const colorTint = tint || barItemsTint || "brand"

  return (
    <ClickableOpacity
      onClick={pressHandler}
      testID={testID || "uc-lib.navigation-bar-item." + index}
      style={{
        minWidth: LAYOUTS.NavigationItemTouchTarget,
        height: LAYOUTS.NavigationItemTouchTarget,
        flexDirection: direction,
        alignItems: "flex-end",
      }}
    >
      {!!title && <Text textType="primaryBody1" color={colorTint} text={title} />}
      {!!resizedSVG && <SVG localSVG={resizedSVG} tint={colorTint} />}
    </ClickableOpacity>
  )
}

const resizeSVGForNavigationBarItem = (svgSource: LocalSVGSource | undefined) => {
  if (svgSource) {
    return {
      SVG: svgSource.SVG,
      size: {
        width: LAYOUTS.NavigationItemIconSize,
        height: LAYOUTS.NavigationItemIconSize,
      },
    }
  }
  return undefined
}
