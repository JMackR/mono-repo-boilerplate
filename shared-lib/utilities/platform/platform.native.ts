import { Platform } from "react-native"

export const getClientType = Platform.select({
  ios: "iOS",
  android: "Android",
})
