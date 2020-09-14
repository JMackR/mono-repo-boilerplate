import { shallow } from "enzyme"
import React from "react"
import { render } from "react-native-testing-library"
import { Text, useColorTheme, useFontTheme } from "uc-lib"
import { _LIGHT_MODE_COLOR_THEME as TEST_THEME } from "uc-lib/themes/configs/colors"
import { _MOBILE_FONT_THEME as TEST_FONTS } from "uc-lib/themes/configs/fonts"

describe("Text Functionality Tests", () => {
  let wrapper: any,
    click = jest.fn()
  beforeEach(() => {
    wrapper = shallow(
      <Text textType="headline1" color="primary" textAlign="center" onPress={click}>
        Test text
      </Text>,
    )
  })
  test("Click calls passed in onClick function", () => {
    wrapper.props().onPress()
    expect(click).toHaveBeenCalledTimes(1)
  })
})

jest.mock("uc-lib/themes/providers/color-theme-context-provider")
useColorTheme.mockReturnValue(TEST_THEME)

jest.mock("uc-lib/themes/providers/font-theme-context-provider")
useFontTheme.mockReturnValue(TEST_FONTS)

describe("Text Snapshot Tests", () => {
  test("Primary large button renders properly", () => {
    const tree = render(<Text>Default text</Text>)

    expect(tree).toMatchSnapshot()
  })
  test("Tertiary large button renders properly", () => {
    const tree = render(
      <Text textType="headline1" color="primary" textAlign="center" onPress={jest.fn()}>
        First text
      </Text>,
    )

    expect(tree).toMatchSnapshot()
  })
  test("Secondary large button renders properly", () => {
    const tree = render(
      <Text textType="secondaryBody1" color="secondary" textAlign="center" onPress={jest.fn()}>
        Second text
      </Text>,
    )
    expect(tree).toMatchSnapshot()
  })

  test("Tertiary text renders properly", () => {
    const tree = render(
      <Text textType="tertiaryBody1" color="error" textAlign="left">
        Second text
      </Text>,
    )
    expect(tree).toMatchSnapshot()
  })

  test("Multiple texts render properly", () => {
    const tree = render(
      <Text>
        <Text textType="primaryBody1" color="primary">
          First text
        </Text>
        <Text textType="secondaryBody1" color="secondary">
          Second text
        </Text>
        <Text textType="tertiaryBody1" color="error">
          Third text
        </Text>
      </Text>,
    )
    expect(tree).toMatchSnapshot()
  })
})
