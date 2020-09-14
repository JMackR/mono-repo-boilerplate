import * as React from "react"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { useLocalStore } from "mobx-react-lite"
import { RootStore, RootStoreContext } from "../../app/models/root-store"
import { color } from "../../app/theme"
import { iif } from "../../app/utils"
import { SocketStoreModel } from "../../app/models/socket-store"
import { SocketStoreProvider } from "../../app/services/socket/socket-context"
import { storyStore } from "../storybook"

const ROOT: ViewStyle = { backgroundColor: "#eee" }
const TITLE: TextStyle = { fontWeight: "600", color: "#3d3d3d" }
const TITLE_WRAPPER: ViewStyle = {}
const USAGE: TextStyle = { color: "#666", fontSize: 10, paddingTop: 0 }
const HEADER: ViewStyle = {
  backgroundColor: "#eee",
  paddingTop: 10,
  paddingBottom: 10,
  paddingHorizontal: 10,
  borderBottomColor: "#e6e6e6",
  borderBottomWidth: 1,
  zIndex: 100,
}
const COMPONENT: ViewStyle = {
  backgroundColor: color.storyBackgroundLight,
  alignItems: "flex-start",
}

export interface UseCaseProps {
  /** The title. */
  text: string
  /** When should we be using this? */
  usage?: string
  /** The component use case. */
  children: React.ReactNode
  /** A style override. Rarely used. */
  style?: ViewStyle
  /** Don't use any padding because it's important to see the spacing. */
  noPad?: boolean
  /** Don't use background color because it's important to see the color. */
  noBackground?: boolean
  /** Store values */
  store?: RootStore
  /** Whether to use the dark background */
  dark?: boolean
  /** Whether to fill children (no pad, stretch) - applied before custom style */
  fill?: boolean
}

export function UseCase(props: UseCaseProps) {
  const fallbackBackground = props.noBackground ? "rgba(0,0,0,0)" : COMPONENT.backgroundColor
  const backgroundColor = props.dark ? color.storyBackgroundDark : fallbackBackground
  const style = {
    ...COMPONENT,
    ...{ padding: props.noPad ? 0 : 10 },
    ...{ backgroundColor },
    ...iif(props.fill, { padding: 0, alignItems: "stretch" }),
    ...props.style,
  }
  const store = useLocalStore(() => props.store || storyStore()[0])
  const socketStore = useLocalStore(() => SocketStoreModel.create({}))
  return (
    <View style={ROOT}>
      <View style={HEADER}>
        <View style={TITLE_WRAPPER}>
          <Text style={TITLE}>{props.text}</Text>
        </View>
        {props.usage ? <Text style={USAGE}>{props.usage}</Text> : null}
      </View>
      <SocketStoreProvider value={socketStore}>
        {store ? (
          <RootStoreContext.Provider value={store}>
            <View style={style}>{props.children}</View>
          </RootStoreContext.Provider>
        ) : (
          <View style={style}>{props.children}</View>
        )}
      </SocketStoreProvider>
    </View>
  )
}
