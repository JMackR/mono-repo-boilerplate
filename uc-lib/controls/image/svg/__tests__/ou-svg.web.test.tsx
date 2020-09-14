import React from "react"
import * as renderer from "react-test-renderer"
import { shallow } from "enzyme"
import { SVG } from "../svg"
import { RemoteSVGSource } from "../svg.props-base"
import { TabBarHomeFill } from "../../../../assets"

describe("SVG Snapshot Tests", () => {
  const remoteSVGData: RemoteSVGSource = {
    uri: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/compass.svg",
    size: {
      width: 120,
      height: 120,
    },
  }

  test("SVG renders remoteSVG", () => {
    const tree = renderer.create(<SVG remoteSVG={remoteSVGData} />)
    expect(tree).toMatchSnapshot()
  })

  test("SVG does not render remoteSVG with tint parameter", () => {
    expect(() => shallow(<SVG remoteSVG={remoteSVGData} tint="error" />)).toThrowError()
  })

  test("SVG renders tintable localSVG with error tint", () => {
    const tree = renderer.create(<SVG localSVG={TabBarHomeFill} tint="error" />)
    expect(tree).toMatchSnapshot()
  })

  test("SVG renders tintable localSVG with link tint", () => {
    const tree = renderer.create(<SVG localSVG={TabBarHomeFill} tint="brand" />)
    expect(tree).toMatchSnapshot()
  })

  test("SVG renders tintable localSVG without tint", () => {
    const tree = renderer.create(<SVG localSVG={TabBarHomeFill} />)
    expect(tree).toMatchSnapshot()
  })

  test("SVG does not render with no SVG parameter", () => {
    expect(() => shallow(<SVG />)).toThrowError()
  })
})
