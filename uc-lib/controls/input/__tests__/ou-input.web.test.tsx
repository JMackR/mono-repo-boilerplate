import React, { ChangeEvent } from "react"
import { Input } from "uc-lib"
import * as renderer from "react-test-renderer"
import { StyleSheetTestUtils } from "aphrodite/no-important"
import { TabBarHomeFill } from "uc-lib"
import { createSerializer } from "jest-aphrodite-react/no-important"
import { shallow } from "enzyme"

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

describe("Input Functionality Tests", () => {
  let wrapper: ShallowWrapper
  const onChange = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<Input textChangeHandler={onChange} />)
  })
  test.skip("Text change calls passed in onTextChange function", () => {
    wrapper
      .find("input")
      .props()
      .onChange({ target: {} as React.ChangeEvent } as ChangeEvent<HTMLInputElement>)
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})

describe("Input Snapshot Tests", () => {
  test("Default ipnut renders properly", () => {
    const tree = renderer.create(<Input />)

    expect(tree).toMatchSnapshot()
  })
  test("input with no error and loading", () => {
    const tree = renderer.create(
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
    const tree = renderer.create(
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
    const tree = renderer.create(
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
    const tree = renderer.create(
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
