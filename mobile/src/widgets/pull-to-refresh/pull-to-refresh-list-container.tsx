import React from "react"
import Reanimated from "react-native-reanimated"
import { StyleSheet } from "react-native"
import { PullToRefreshListContainerProps } from "./pull-to-refresh"

export const PullToRefreshListContainer: React.FC<PullToRefreshListContainerProps> = props => {
  const { children, listTy } = props
  const styles = StyleSheet.create({
    pull_to_refresh_list_container: {
      flex: 1,
      overflow: "hidden",
    },
  })

  return (
    <Reanimated.View style={[styles.pull_to_refresh_list_container, { transform: [{ translateY: listTy }] }]}>
      {children}
    </Reanimated.View>
  )
}
