import React from "react"
import * as renderer from "react-test-renderer"
import { Avatar } from "../avatar"

describe("Avatar Snapshot Tests", () => {
  const avatarSize = 100
  const photoURL =
    "https://media-exp1.licdn.com/dms/image/C4E03AQHXHzRJLFryWw/profile-displayphoto-shrink_200_200/0?e=1585785600&v=beta&t=36ZZ3awsowdk_mAFr9oTQ5IS9moXDqNP9jRx_qR1hJU"

  test("Avatar renders properly without children", () => {
    const tree = renderer.create(<Avatar size={avatarSize} source={{ uri: photoURL }} />)
    expect(tree).toMatchSnapshot()
  })

  test("Avatar renders properly with children", () => {
    const tree = renderer.create(
      <Avatar size={avatarSize} source={{ uri: photoURL }}>
        <p>Hype!</p>
      </Avatar>,
    )
    expect(tree).toMatchSnapshot()
  })
})
