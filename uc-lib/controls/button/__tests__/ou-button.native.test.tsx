import { shallow, ShallowWrapper } from "enzyme"
import React from "react"
import { TextStyle } from "react-native"
import { render } from "react-native-testing-library"
import { Button, useColorTheme, useFontTheme } from "uc-lib"
import { LocationPinFill } from "uc-lib/assets"
import { ensureHex } from "uc-lib/themes/utility/color-conversions"
import { _LIGHT_MODE_COLOR_THEME as TEST_THEME } from "uc-lib/themes/configs/colors"
import { _MOBILE_FONT_THEME as TEST_FONTS } from "uc-lib/themes/configs/fonts"

describe("Button Functionality Tests", () => {
  let wrapper: ShallowWrapper
  const click = jest.fn()
  const longClick = jest.fn()
  beforeEach(() => {
    wrapper = shallow(
      <Button title="test" buttonSize="large" buttonType="primary" onClick={click} onLongClick={longClick} />,
    )
  })
  test("Click calls passed in onClick function", () => {
    wrapper.props().onPress()
    expect(click).toHaveBeenCalledTimes(1)
  })
  test("Long click calls passed in onLongClick function", () => {
    wrapper.props().onLongPress()
    expect(longClick).toHaveBeenCalledTimes(1)
  })
})

function mergeStylesArrayToObject(arr) {
  const result = {}
  for (let i = 0, len = arr.length; i < len; i++) {
    // expand each separate object into result
    for (const key of Object.keys(arr[i])) {
      result[key] = arr[i][key]
    }
  }
  return result
}

jest.mock("uc-lib/themes/providers/color-design-theme-context-provider")
useColorTheme.mockReturnValue(TEST_THEME)

jest.mock("uc-lib/themes/providers/font-design-theme-context-provider")
useFontTheme.mockReturnValue(TEST_FONTS)

const TRANSPARENT = "#00FFFFFF"

describe("Button Style Tests: Large", () => {
  test("Primary large button renders properly", () => {
    const tree = render(<Button title="test" buttonSize="large" buttonType="primary" onClick={jest.fn()} />)

    const json = tree.toJSON()
    const containerStyle = json.props.style

    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe("test")

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.green)

    // verify text color
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.crystal)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
  test("Secondary large button renders properly", () => {
    const tree = render(<Button title="testingsecondary" buttonSize="large" buttonType="secondary" onClick={jest.fn()} />)

    const json = tree.toJSON()
    const containerStyle = json.props.style

    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe("testingsecondary")

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.crystal)

    // verify text color
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.green)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBe(1)
  })
  test("Tertiary large button renders properly", () => {
    const tree = render(<Button title="tert" buttonSize="large" buttonType="tertiary" onClick={jest.fn()} />)

    const json = tree.toJSON()
    const containerStyle = json.props.style

    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe("tert")

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.limestone)

    // verify text color
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.obsidian)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
  test("Buy Now large button renders properly", () => {
    const tree = render(<Button title="buynow" buttonSize="large" buttonType="buynow" onClick={jest.fn()} />)

    const json = tree.toJSON()
    const containerStyle = json.props.style

    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe("buynow")

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.larchYellow)

    // verify text color
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.obsidian)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
  test("Flat large button renders properly", () => {
    const tree = render(<Button title="flat" buttonSize="large" buttonType="flat" onClick={jest.fn()} />)

    const json = tree.toJSON()
    const containerStyle = json.props.style

    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe("flat")

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TRANSPARENT)

    // verify text color
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.green)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
  test("Disabled large button renders properly", () => {
    const tree = render(<Button title="disabled" buttonSize="large" buttonType="disabled" onClick={jest.fn()} />)

    const json = tree.toJSON()
    const containerStyle = json.props.style

    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe("disabled")

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.disabled)

    // verify text color
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.granite)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.primaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBe(1)
  })
})
describe("Button Style Tests: Small", () => {
  test("Primary small button renders properly", () => {
    const tree = render(<Button title="test" buttonSize="small" buttonType="primary" onClick={jest.fn()} />)

    const json = tree.toJSON()
    const containerStyle = json.props.style

    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    const text = json.children[0].children[0].children[0]

    // verify text is set
    expect(text).toBe("test")

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.green)

    // verify text color
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.crystal)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.secondaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
  test("Secondary small button with subtitle renders properly", () => {
    const tree = render(<Button title="test" subtitle="smol" buttonSize="small" buttonType="primary" onClick={jest.fn()} />)

    const json = tree.toJSON()
    const containerStyle = json.props.style

    const textStyle: TextStyle = mergeStylesArrayToObject(json.children[0].children[0].props.style)
    const text = json.children[0].children[0].children[0]
    const subtitle = json.children[0].children[1].children[0]

    // verify text is set
    expect(text).toBe("test")

    // verify subtitle
    expect(subtitle).toBe("smol")

    // verify proper background color
    expect(ensureHex(containerStyle.backgroundColor)).toBe(TEST_THEME.colors.green)

    // verify text color
    expect(ensureHex(textStyle.color)).toBe(TEST_THEME.colors.crystal)

    // verify button padding
    expect(containerStyle.paddingHorizontal).toBe(8)

    // verify font weight
    expect(textStyle.fontWeight).toBe(TEST_FONTS.fonts.secondaryBody1.fontWeight)

    // verify border radius
    expect(containerStyle.borderRadius).toBe(4)

    // verify border
    expect(containerStyle.borderWidth).toBeUndefined()
  })
})

describe("Button Snapshot Tests", () => {
  test("Primary large button renders properly", () => {
    const tree = render(<Button title="test" buttonSize="large" buttonType="primary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Secondary large button renders properly", () => {
    const tree = render(<Button title="testingsecondary" buttonSize="large" buttonType="secondary" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test("Tertiary large button renders properly", () => {
    const tree = render(<Button title="tert" buttonSize="large" buttonType="tertiary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Buy Now large button renders properly", () => {
    const tree = render(<Button title="buynow" buttonSize="large" buttonType="buynow" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test("Flat large button renders properly", () => {
    const tree = render(<Button title="flat" buttonSize="large" buttonType="flat" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test("Disabled large button renders properly", () => {
    const tree = render(<Button title="disabled" buttonSize="large" buttonType="disabled" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Primary small button renders properly", () => {
    const tree = render(<Button title="test" buttonSize="small" buttonType="primary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Secondary small button renders properly", () => {
    const tree = render(<Button title="testingsecondary" buttonSize="small" buttonType="secondary" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test("Tertiary small button renders properly", () => {
    const tree = render(<Button title="tert" buttonSize="small" buttonType="tertiary" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Buy Now small button renders properly", () => {
    const tree = render(<Button title="buynow" buttonSize="small" buttonType="buynow" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test("Flat small button renders properly", () => {
    const tree = render(<Button title="flat" buttonSize="small" buttonType="flat" onClick={jest.fn()} />)
    expect(tree).toMatchSnapshot()
  })
  test("Disabled small button renders properly", () => {
    const tree = render(<Button title="disabled" buttonSize="small" buttonType="disabled" onClick={jest.fn()} />)

    expect(tree).toMatchSnapshot()
  })
  test("Primary large button with icon as LocalSVGSource renderer.creates properly", () => {
    const tree = render(
      <Button title="has svg" buttonSize="large" buttonType="primary" icon={LocationPinFill} onClick={jest.fn()} />,
    )

    expect(tree).toMatchSnapshot()
  })
  test("Primary small button with icon as LocalSVGSource renderer.creates properly", () => {
    const tree = render(
      <Button title="has svg" buttonSize="small" buttonType="primary" icon={LocationPinFill} onClick={jest.fn()} />,
    )

    expect(tree).toMatchSnapshot()
  })
})
