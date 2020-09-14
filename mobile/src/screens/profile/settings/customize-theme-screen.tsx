import React from "react"
import { Screen } from "../../../widgets"
import {
  Background,
  Button,
  Margin,
  NavigationBar,
  List,
  Input,
  useColorTheme,
  Colors,
  Flex,
  useTheme,
  Text,
  Spacer,
  Stack,
} from "uc-lib"
import { KeyboardAvoidanceOverlayContainer, KeyboardAvoidanceView } from "../../../keyboardavoidance"
import { getNavigationBackButton } from "../../../navigation/common"
import { useSafeArea } from "react-native-safe-area-context"
import { View, Platform } from "react-native"
import { translate } from "shared-lib"

const KBA: React.FC<{ index: number }> = ({ index, children }) => {
  // it works okay on android, but performance of the input views
  // causes it to be a bit rough with more scrolling logic
  return Platform.OS === "android" ? (
    <>{children}</>
  ) : (
    <KeyboardAvoidanceView direction="column" stackOrder={1} viewInfo={index}>
      {children}
    </KeyboardAvoidanceView>
  )
}

export const CustomizeThemeScreen: React.FC = () => {
  const { colorThemeId, setColorThemeId } = useTheme()
  const insets = useSafeArea()
  const colorTheme = useColorTheme()
  const [workingTheme, setWorkingTheme] = React.useState<Colors>(colorTheme.colors)

  const listData = Object.keys(colorTheme.colors) as (keyof Colors)[]

  const handleSaveButtonTapped = () => {
    colorTheme.colors.crystal = workingTheme.crystal
    colorTheme.colors.obsidian = workingTheme.obsidian
    const toRevert = colorThemeId
    setColorThemeId("ha!")
    setTimeout(() => {
      setColorThemeId(toRevert)
    }, 200)
  }

  const header = "Customizing Theme: " + colorTheme.displayName
  const hackyNotice = '[TEMPORARY]\nYou will see a flash when you tap "Save".\nRestarting the app will reset all theming.'

  const renderRow = (colorPalleteKey: keyof Colors, index: number) => {
    const updateHandler = (text?: string) => {
      const updates: Partial<Colors> = {}
      updates[colorPalleteKey] = text
      setWorkingTheme({ ...workingTheme, ...updates })
    }

    const fontUses = Object.keys(colorTheme.fontColors).filter(key => colorTheme.fontColors[key] === colorPalleteKey)
    const backgroundUses = Object.keys(colorTheme.backgroundColors).filter(
      key => colorTheme.backgroundColors[key] === colorPalleteKey,
    )

    const reducer = (accumulator: string, currentValue: string, idx: number, source: string[]) => {
      return accumulator.concat(currentValue + (idx !== source.length - 1) ? ", " : "")
    }

    let subText = ""
    if (fontUses.length > 0) {
      subText = subText.concat("Font: " + fontUses.reduce(reducer))
    }
    if (backgroundUses.length > 0) {
      if (fontUses.length > 0) {
        subText = subText.concat("\n")
      }
      subText = subText.concat("Background: " + backgroundUses.reduce(reducer))
    }

    return (
      <KBA index={index}>
        <Margin direction="column" marginTopStep={2} marginBottomStep={2}>
          <Input
            title={colorPalleteKey}
            leftHelperText={subText}
            text={workingTheme[colorPalleteKey]}
            textChangeHandler={updateHandler}
          />
        </Margin>
      </KBA>
    )
  }

  const renderFooter = () => {
    return (
      <Margin shrink={0} marginStep={4} direction="column">
        <Button
          buttonSize="large"
          buttonType="primary"
          title={translate("common-actions.save")}
          onClick={handleSaveButtonTapped}
        />
      </Margin>
    )
  }

  return (
    <Screen safeAreaMode="top">
      <View
        style={{
          flex: 1,
        }}
      >
        <Stack direction="column" grow={0} height={"100%"}>
          <NavigationBar
            title={header}
            leftItems={[getNavigationBackButton("customize-design-theme-screen.navigation-bar")]}
            testID="customize-theme-screen.navigation-bar"
          />

          <Margin grow={1} direction="column" marginTopStep={4} marginLeftStep={4} marginRightStep={4}>
            <Text textAlign="center">{hackyNotice}</Text>
            <Spacer sizeStep={4} direction="column" />
            <Flex direction="column" shrink={1}>
              <List data={listData} renderItem={renderRow} keyboardAvoidanceEnabled={true} dismissKeyboardOnDrag={false} />
            </Flex>
            <View style={{ opacity: 0 }}>{renderFooter()}</View>
          </Margin>
          <KeyboardAvoidanceOverlayContainer shrink={0} absoluteBottom={insets.bottom}>
            <KeyboardAvoidanceView shrink={0} stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
              <Background type="primary" />
              {renderFooter()}
            </KeyboardAvoidanceView>
          </KeyboardAvoidanceOverlayContainer>
        </Stack>
      </View>
    </Screen>
  )
}
