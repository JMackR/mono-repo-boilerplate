import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { Story, UseCase } from "../../../storybook/views"
import { Icon } from "../../navigation"
import { color, size } from "../../theme"
import { icons } from "./icons"
import { keys } from "ramda"
import { View, ViewStyle } from "react-native"

const PARENT = { backgroundColor: color.darkTransparent2, justifyContent: "center" } as ViewStyle
const ICON_CONTAINER = { flexDirection: "row" } as ViewStyle
const ICON = {
  alignSelf: "center",
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: color.lightTransparent2,
  marginRight: size(1),
} as ViewStyle

storiesOf("Icon", module)
  .add("Size", () => (
    <Story>
      <UseCase text="extraLarge" usage="48x48" style={PARENT}>
        <Icon name="checkbox-square-on" size="extraLarge" />
      </UseCase>
      <UseCase text="large" usage="40x40" style={PARENT}>
        <Icon name="checkbox-square-on" size="large" />
      </UseCase>
      <UseCase text="medium" usage="32x32" style={PARENT}>
        <Icon name="checkbox-square-on" size="medium" />
      </UseCase>
      <UseCase text="small" usage="24x24" style={PARENT}>
        <Icon name="checkbox-square-on" size="small" />
      </UseCase>
      <UseCase text="extraSmall" usage="16x16" style={PARENT}>
        <Icon name="checkbox-square-on" size="extraSmall" />
      </UseCase>
    </Story>
  ))
  .add("Tint", () => (
    <Story>
      <UseCase text="default" usage="white" style={PARENT}>
        <Icon name="checkbox-square-on" size="extraLarge" />
      </UseCase>
      <UseCase text="colored" usage="red" style={PARENT}>
        <Icon name="checkbox-square-on" size="large" color="danger" />
      </UseCase>
    </Story>
  ))
  .add("Images", () => (
    <Story>
      {keys(icons)
        .sort()
        .map((icon) => (
          <UseCase key={icon} text={icon} style={PARENT}>
            <View style={ICON_CONTAINER}>
              <Icon name={icon} size="extraLarge" style={ICON} />
              <Icon name={icon} size="large" style={ICON} />
              <Icon name={icon} size="medium" style={ICON} />
              <Icon name={icon} size="small" style={ICON} />
              <Icon name={icon} size="extraSmall" style={ICON} />
            </View>
          </UseCase>
        ))}
    </Story>
  ))
