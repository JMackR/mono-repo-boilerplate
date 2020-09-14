import { translate, OnboardingFlowAnalyticsStep1, OnboardingFlowElement, AnalyticsActionType } from "shared-lib"
import { Background, Flex, Margin, Stack, Text, SVG, PhotoRotateIcon } from "uc-lib"
import React, { FC, useEffect } from "react"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { ScreenRoute } from "../../navigation/route"
import { Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator"
import { Screen } from ".."
import { RefreshableImage } from ".."
import { usePhotoSelection } from "../../providers/photo-selection-provider"
import { usePhotoEdit } from "./usePhotoEdit"

const TOP_BAR_BASIS = 24

export const OnboardingFlowPhotoEdit: FC<ScreenRoute<NavigableRoute.OnboardingFlowPhotoEdit>> = ({ route }) => {
  const photo = route.params.props.photo
  const { updatePhoto } = usePhotoSelection()
  const { uri, changeToken, rotate, reset } = usePhotoEdit(photo)

  useEffect(() => {
    OnboardingFlowAnalyticsStep1.trackPhotoEdit(OnboardingFlowElement.Cancel, AnalyticsActionType.Show)
    OnboardingFlowAnalyticsStep1.trackPhotoEdit(OnboardingFlowElement.Done, AnalyticsActionType.Show)
  }, [])

  const goBack = () => {
    OnboardingFlowAnalyticsStep1.trackPhotoEdit(OnboardingFlowElement.Cancel, AnalyticsActionType.Click)
    Navigation.goBack()
  }

  const donePhotoEdit = async () => {
    OnboardingFlowAnalyticsStep1.trackPhotoEdit(OnboardingFlowElement.Done, AnalyticsActionType.Click)
    if (changeToken !== "") {
      await updatePhoto(photo.id, { uri, uuid: undefined })
    }
    Navigation.popToTop()
  }

  return (
    <Screen safeAreaMode="top">
      <Background type="alwaysDark" />
      <Stack direction="column" height="100%" width="100%">
        <Margin marginStep={4} basis={TOP_BAR_BASIS}>
          <Stack grow={1} direction="row">
            <Flex axisDistribution="flex-start">
              <TouchableWithoutFeedback onPress={goBack} testID="onboarding-flow.photo-edit.cancel-button">
                <Text color="alwaysLight" textType="primaryBody2">
                  {translate("onboarding-flow.photo-edit.cancel")}
                </Text>
              </TouchableWithoutFeedback>
            </Flex>
            <Flex grow={1} axisDistribution="flex-end">
              {changeToken !== "" && (
                <TouchableWithoutFeedback onPress={reset} testID="onboarding-flow.photo-edit.reset-button">
                  <Text color="alwaysLight" textType="primaryBody2">
                    {translate("onboarding-flow.photo-edit.reset")}
                  </Text>
                </TouchableWithoutFeedback>
              )}
            </Flex>
          </Stack>
        </Margin>
        <Flex grow={1}>
          <RefreshableImage refreshToken={changeToken} width="100%" height="100%" resizeMode="contain" source={{ uri }} />
        </Flex>
        <Margin marginTopStep={8} marginLeftStep={4} marginRightStep={4} marginBottomStep={12}>
          <Stack direction="row" grow={1} crossAxisDistribution="center">
            <Flex grow={1} axisDistribution="flex-start">
              <TouchableWithoutFeedback onPress={rotate} testID="onboarding-flow.photo-edit.rotate-button">
                <Stack direction="column" crossAxisDistribution="center" childSeparationStep={2}>
                  <SVG localSVG={PhotoRotateIcon} tint="alwaysLight" />
                  <Text color="alwaysLight" textType="primaryBody2">
                    {translate("onboarding-flow.photo-edit.rotate")}
                  </Text>
                </Stack>
              </TouchableWithoutFeedback>
            </Flex>
            <Flex grow={1} axisDistribution="flex-end">
              <TouchableWithoutFeedback onPress={donePhotoEdit} testID="onboarding-flow.photo-edit.done-button">
                <Text color="alwaysLight" textType="primaryBody1">
                  {translate("onboarding-flow.photo-edit.done")}
                </Text>
              </TouchableWithoutFeedback>
            </Flex>
          </Stack>
        </Margin>
      </Stack>
    </Screen>
  )
}
