import * as React from "react"
import { storiesOf } from "@storybook/react-native/dist"
import { Story, UseCase } from "../../storybook/views"
import { color } from "./color"
import R from "ramda"
import { View, ViewStyle } from "react-native"
import { styles } from "./styles"
import { mergeStyles } from "../utils/styles"

storiesOf("Theme", module)
  .add("Color", () => (
    <Story>
      <UseCase text="all colors (on light)" style={mergeStyles(styles.row, { flexWrap: "wrap" })}>
        {R.keys(color)
          .sort()
          .map(key => (
            <View
              key={key}
              style={mergeStyles(styles.square(2), { backgroundColor: color[key] })}
            />
          ))}
      </UseCase>
      <UseCase
        text="all colors (on dark)"
        dark
        style={mergeStyles(styles.row, { flexWrap: "wrap" })}
      >
        {R.keys(color)
          .sort()
          .map(key => (
            <View
              key={key}
              style={mergeStyles(styles.square(2), { backgroundColor: color[key] })}
            />
          ))}
      </UseCase>
      {R.keys(color)
        .sort()
        .map(key => (
          <UseCase key={key} text={key}>
            <View style={mergeStyles(styles.square(2), { backgroundColor: color[key] })} />
          </UseCase>
        ))}
    </Story>
  ))
  .add("Styles", () => (
    <Story>
      {R.keys(styles)
        .sort()
        .map(key => (
          <UseCase key={key} text={key}>
            <View style={styles.square(2)}>
              <View style={styles[key] as ViewStyle} />
            </View>
          </UseCase>
        ))}
    </Story>
  ))
