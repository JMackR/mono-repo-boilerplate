import { ActionClose, Flex, Margin, Stack, SVG, Touchable } from "uc-lib"
import React from "react"
import { View } from "react-native"
import { ScreenRoute } from "../../navigation/route"
import { Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator"
import { PanAndZoomableImage, Screen } from ".."

export const OnboardingFlowPhotoPreview: React.FC<ScreenRoute<NavigableRoute.OnboardingFlowPhotoPreview>> = ({ route }) => {
  const photo = route.params.props.photo
  const goBack = () => Navigation.goBack()
  return (
    <Screen safeAreaMode="top" backgroundColor="alwaysDark">
      <Stack direction="column" grow={1}>
        <Margin marginLeftStep={4} marginBottomStep={4}>
          <Touchable onPress={goBack}>
            <SVG localSVG={ActionClose} tint="alwaysLight" />
          </Touchable>
        </Margin>
        <Flex grow={1}>
          <View style={{ flex: 1, overflow: "hidden" }}>
            <PanAndZoomableImage imageUri={photo.uri} />
          </View>
        </Flex>
      </Stack>
    </Screen>
  )
}
