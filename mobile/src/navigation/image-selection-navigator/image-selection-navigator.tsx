import { createStackNavigator } from "@react-navigation/stack"
import React, { FC } from "react"
import { ImageAccessProvider } from "../../providers/image-access-provider"
import { ProfileImageSelectionScreen } from "../../screens/profile/profile-image-selection-screen"
import { ProfileImageCameraRoll } from "../../screens/profile/profile-image/profile-image-camera-screen"
import { ProfileImageGalleryPicker } from "../../screens/profile/profile-image/profile-image-gallery-picker-screen"
import { NavigationPayload } from "../navigation"
import { NavigableRoute } from "../navigator/navigableroute"
import { FullScreenModalOptions } from "../common"

// tslint:disable-next-line: interface-over-type-literal
export type ProfileImageSelectionStackNavigatorParamList = {
  [NavigableRoute.ProfileImageSelect]: NavigationPayload<{}>
  [NavigableRoute.ProfileCameraRoll]: NavigationPayload<{}>
  [NavigableRoute.ProfileImagePicker]: NavigationPayload<{}>
}

const Stack = createStackNavigator<ProfileImageSelectionStackNavigatorParamList>()

export const ImageSelectionStackNavigator: FC = () => {
  return (
    <ImageAccessProvider>
      <Stack.Navigator initialRouteName={NavigableRoute.ProfileImageSelect} headerMode="none">
        <Stack.Screen
          name={NavigableRoute.ProfileImageSelect}
          component={ProfileImageSelectionScreen}
          options={FullScreenModalOptions}
        />
        <Stack.Screen
          name={NavigableRoute.ProfileCameraRoll}
          component={ProfileImageCameraRoll}
          options={FullScreenModalOptions}
        />
        <Stack.Screen
          name={NavigableRoute.ProfileImagePicker}
          component={ProfileImageGalleryPicker}
          options={FullScreenModalOptions}
        />
      </Stack.Navigator>
    </ImageAccessProvider>
  )
}
