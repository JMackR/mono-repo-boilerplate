import React from "react"
import { Text as MockText } from "react-native"
import { render, shallow } from "react-native-testing-library"
import { SVG } from "../svg"
import { RemoteSVGSource } from "../svg.props-base"
import { TabBarHomeFill } from "../../../../assets"

jest.mock("react-native-svg", () => {
  return {
    SvgUri: ({ uri, width, height }) => {
      return <MockText>SVG: {uri + " " + width + " " + height}</MockText>
    },
  }
})

describe("SVG Snapshot Tests", () => {
  const remoteSVGData: RemoteSVGSource = {
    uri: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/compass.svg",
    size: {
      width: 120,
      height: 120,
    },
  }

  test("SVG renders remoteSVG", () => {
    const tree = render(<SVG remoteSVG={remoteSVGData} />)
    expect(tree).toMatchSnapshot()
  })

  test("SVG does not render remoteSVG with tint parameter", () => {
    expect(() => shallow(<SVG remoteSVG={remoteSVGData} tint="error" />)).toThrowError()
  })

  test("SVG renders tintable localSVG with error tint", () => {
    const tree = render(<SVG localSVG={TabBarHomeFill} tint="error" />)
    expect(tree).toMatchSnapshot()
  })

  test("SVG renders tintable localSVG with link tint", () => {
    const tree = render(<SVG localSVG={TabBarHomeFill} tint="brand" />)
    expect(tree).toMatchSnapshot()
  })

  test("SVG renders tintable localSVG without tint", () => {
    const tree = render(<SVG localSVG={TabBarHomeFill} />)
    expect(tree).toMatchSnapshot()
  })

  test("SVG does not render with no SVG parameter", () => {
    expect(() => shallow(<SVG />)).toThrowError()
  })
})
