import React from "react"
import * as renderer from "react-test-renderer"
import { shallow } from "enzyme"
import { RemoteImage } from "../remote-image"

describe("RemoteImage Snapshot Tests", () => {
  const photoURL =
    "https://media-exp1.licdn.com/dms/image/C4E03AQHXHzRJLFryWw/profile-displayphoto-shrink_200_200/0?e=1585785600&v=beta&t=36ZZ3awsowdk_mAFr9oTQ5IS9moXDqNP9jRx_qR1hJU"
  const width = 100
  const height = 150
  const borderRadius = 4
  const aspectRatio = 1.2

  test("RemoteImage renders width/height/resizeMode/borderRadius", () => {
    const tree = renderer.create(
      <RemoteImage
        width={width}
        height={height}
        resizeMode="center"
        borderRadius={borderRadius}
        source={{ uri: photoURL }}
      />,
    )
    expect(tree).toMatchSnapshot()
  })

  test("RemoteImage renders width/height/resizeMode/borderRadius and children", () => {
    const tree = renderer.create(
      <RemoteImage width={width} height={height} resizeMode="center" borderRadius={borderRadius} source={{ uri: photoURL }}>
        <p>Hype!</p>
      </RemoteImage>,
    )
    expect(tree).toMatchSnapshot()
  })

  test("RemoteImage renders width/aspectRatio/resizeMode", () => {
    const tree = renderer.create(
      <RemoteImage
        width={width}
        aspectRatio={aspectRatio}
        resizeMode="contain"
        borderRadius={0}
        source={{ uri: photoURL }}
      />,
    )
    expect(tree).toMatchSnapshot()
  })

  test("RemoteImage renders height/aspectRatio/resizeMode", () => {
    const tree = renderer.create(
      <RemoteImage height={height} aspectRatio={aspectRatio} resizeMode="cover" source={{ uri: photoURL }} />,
    )
    expect(tree).toMatchSnapshot()
  })

  test("RemoteImage does not render with only height", () => {
    expect(() => shallow(<RemoteImage height={height} resizeMode="cover" source={{ uri: photoURL }} />)).toThrowError()
  })

  test("RemoteImage does not render with only width", () => {
    expect(() => shallow(<RemoteImage width={width} resizeMode="cover" source={{ uri: photoURL }} />)).toThrowError()
  })

  test("RemoteImage does not render with only aspectRatio", () => {
    expect(() =>
      shallow(<RemoteImage aspectRatio={aspectRatio} resizeMode="cover" source={{ uri: photoURL }} />),
    ).toThrowError()
  })
})
