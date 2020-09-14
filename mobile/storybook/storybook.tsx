import React, { useEffect } from "react"
import { addParameters, configure, getStorybookUI } from "@storybook/react-native"
import SplashScreen from "react-native-splash-screen"
import { SafeAreaView, ViewStyle } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { Params } from "@storybook/react-native/dist/preview"
import { RootStore, RootStoreModel, RootStoreSnapshot } from "../app/models/root-store"
import { Environment } from "../app/models/environment"
import { Reactotron } from "../app/services/reactotron"
import { SnapshotIn } from "mobx-state-tree"
import { User } from "../app/models/user"
import { UserStore } from "../app/models/user-store"
import R from "ramda"

addParameters({
  options: {
    hierarchyRootSeparator: /\|/,
  },
})

configure(() => {
  require("./storybook-registry")
}, module)

require("./rn-addons")

const StorybookUI = getStorybookUI({
  port: 9001,
  host: "localhost",
  onDeviceUI: true,
  shouldPersistSelection: true,
  asyncStorage: AsyncStorage as Params["asyncStorage"],
})

const SAFE_AREA_STYLE: ViewStyle = {
  flex: 1,
}

export const StorybookUIRoot: React.FunctionComponent = () => {
  useEffect(() => {
    SplashScreen.hide()
    if (typeof __TEST__ === "undefined" || !__TEST__) {
      const Reactotron = require("../app/services/reactotron")
      const reactotron = new Reactotron.Reactotron()
      reactotron.setup()
    }
  }, [])

  return (
    <SafeAreaView style={SAFE_AREA_STYLE}>
      <StorybookUI />
    </SafeAreaView>
  )
}

/**
 * Creates a User snapshot for a user with ID `user-{index}`, with stubbed data
 * @param index an index
 */
export function storyUser(index: number): SnapshotIn<User> {
  return {
    id: `user-${index}`,
    name: `User${index.toLocaleString()}`,
    profile: {
      image: `https://api.adorable.io/avatars/256/user-${index}.png`,
      moji: "assassin",
      info: {
        country: index % 3 === 0 ? "US" : undefined,
      },
    },
    crewMembership: {
      crew: "test-crew",
      rank: index % 2 === 0 ? 1234 : undefined,
    },
  }
}

/**
 * Creates a UserStore snapshot with given number of users
 * @param count the number of users (default 10) created thru storyUser
 */
export function storyUserStore(count = 10): SnapshotIn<UserStore> {
  const snapshot = {} as any
  snapshot.local = {
    id: "local",
    name: "LocalUser",
    fullName: "Local User",
    profile: {
      image: `https://api.adorable.io/avatars/256/local-user.png`,
      moji: "assassin",
    },
  }
  R.forEach(i => (snapshot[`user-${i}`] = storyUser(i)), R.range(1, 1 + count))
  return snapshot
}

/** Default storyStore, if expanding */
export const defaultStoryStore = {
  authenticationStore: {
    userId: "local",
  },
  mojiStore: {
    mojis: {
      assassin: { id: "assassin" },
    },
  },
  walletStore: {
    balance: 1234,
  },
  crewStore: {
    crews: {
      "test-crew": {
        id: "test-crew",
        artistId: "user-100",
        name: "Test Crew",
        rank: 1234,
        score: 654321987,
        userCount: 8064,
      },
    },
  },
  userStore: { users: storyUserStore(100) },
}

/**
 * Creates a RootStore from a snapshot, destined for a Story
 * This is safe outside of Jest (unlike MockEnvironment)
 * Injects a stubbed apiStore
 * @param snapshot optional root store snapshot, defaults to dummy data
 */
export function storyStore(
  snapshot: any & Partial<RootStoreSnapshot> = defaultStoryStore,
): [RootStore, Environment] {
  const env = {
    reactotron: new Reactotron({
      useAsyncStorage: false,
      state: {
        initial: false,
        snapshots: false,
      },
    }),
    api: {
      request: () => {},
    },
  } as any // This is a TS fudge
  env.apiStore = {
    dispatch: () => {},
  }
  env.rootStore = RootStoreModel.create(snapshot, env)
  return [env.rootStore, env as Environment]
}
