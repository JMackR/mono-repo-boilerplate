import React from "react"
import { render } from "react-native-testing-library"
import { useColorTheme, useFontTheme } from "uc-lib"
import { Input, TextEntry } from "uc-lib"
import { _LIGHT_MODE_COLOR_THEME as TEST_THEME } from "uc-lib/themes/configs/colors"
import { _MOBILE_FONT_THEME as TEST_FONTS } from "uc-lib/themes/configs/fonts"
import { TabBarHomeFill } from "uc-lib"
import { shallow, ShallowWrapper } from "enzyme"
import { TextInput } from "react-native"

jest.mock("uc-lib/themes/providers/color-design-theme-context-provider")
useColorTheme.mockReturnValue(TEST_THEME)

jest.mock("uc-lib/themes/providers/font-design-theme-context-provider")
useFontTheme.mockReturnValue(TEST_FONTS)

describe("Input Functionality Tests", () => {
  let wrapper: ShallowWrapper
  const onChange = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<Input textChangeHandler={onChange} />)
  })
  test.skip("Text change calls passed in onTextChange function", () => {
    wrapper
      .find(TextEntry)
      .props()
      .onChangeText("test")
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})

describe("Input Snapshot Tests", () => {
  test("Default ipnut renders properly", () => {
    const tree = render(<Input />)

    expect(tree).toMatchSnapshot()
  })
  test("input with no error and loading", () => {
    const tree = render(
      <Input
        secureTextEntry={true}
        trailingIcon={{ SVG: TabBarHomeFill.SVG }}
        leadingIcon={{ SVG: TabBarHomeFill.SVG }}
        loading={true}
        leftHelperText={"Left Helper Text"}
        rightHelperText={"Right Helper Text"}
        error={""}
        hint={"Sample hint text"}
        title={"Sample Title"}
      />,
    )

    expect(tree).toMatchSnapshot()
  })
  test("input with no error and without loading", () => {
    const tree = render(
      <Input
        secureTextEntry={true}
        trailingIcon={{ SVG: TabBarHomeFill.SVG }}
        leadingIcon={{ SVG: TabBarHomeFill.SVG }}
        leftHelperText={"Left Helper Text"}
        rightHelperText={"Right Helper Text"}
        error={""}
        hint={"Sample hint text"}
        title={"Sample Title"}
      />,
    )
    expect(tree).toMatchSnapshot()
  })

  test("input with error and SVGs", () => {
    const tree = render(
      <Input
        secureTextEntry={true}
        trailingIcon={{ SVG: TabBarHomeFill.SVG }}
        leadingIcon={{ SVG: TabBarHomeFill.SVG }}
        leftHelperText={"Left Helper Text"}
        rightHelperText={"Right Helper Text"}
        error={"test"}
        hint={"Sample hint text"}
        title={"Sample Title"}
      />,
    )
    expect(tree).toMatchSnapshot()
  })

  test("Input with error and without svgs", () => {
    const tree = render(
      <Input
        secureTextEntry={true}
        leftHelperText={"Left Helper Text"}
        rightHelperText={"Right Helper Text"}
        error={"test"}
        hint={"Sample hint text"}
        title={"Sample Title"}
      />,
    )
    expect(tree).toMatchSnapshot()
  })
})
