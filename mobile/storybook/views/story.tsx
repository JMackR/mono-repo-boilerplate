import * as React from "react"
import { ScrollView, View, ViewStyle } from "react-native"
import { size } from "../../app/theme"
import { TestContainer } from "../../test/container"

export interface StoryProps {
  fixed?: boolean
  children?: React.ReactNode
}

const ROOT: ViewStyle = { flex: 1 }
const SCROLL: ViewStyle = { paddingBottom: size(5) }

export function Story(props: StoryProps) {
  const Wrapper = props.fixed ? View : ScrollView

  if (process.env.JEST_WORKER_ID) {
    // This is a fudge, so that we inject the TestContainer when running in test mode
    const container = TestContainer()
    return (
      <container.Wrapper>
        <View style={ROOT}>
          <Wrapper contentContainerStyle={SCROLL}>{props.children}</Wrapper>
        </View>
      </container.Wrapper>
    )
  } else {
    return (
      <View style={ROOT}>
        <Wrapper contentContainerStyle={SCROLL}>{props.children}</Wrapper>
      </View>
    )
  }
}
