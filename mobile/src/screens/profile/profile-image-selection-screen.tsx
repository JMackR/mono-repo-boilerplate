import React, { FC, useContext, useState, useEffect } from "react"
import _ from "lodash"
import { PhotoUploadContext } from "shared-lib/network/photo-upload-provider"
import { useMutation } from "@apollo/react-hooks"
import { AccountDataContext } from "shared-lib/providers"
import { translate, CheckResult, Permission } from "shared-lib/utilities"
import { AccountAnalyticsController } from "shared-lib/analytics/account/analytics-account"
import { AccountScreenNames, AccountSettingsScreenElement } from "shared-lib/analytics/constants/profile-constants"
import { Button, Spacer, Text, Flex, LocalImage, Margin, Separator, Stack } from "uc-lib/controls"
import { CameraOutline, ChatPhotoSelect } from "uc-lib/assets"
import { AVATAR_SIZE_EXTRA_LARGE, NavigationBar } from "uc-lib/widgets"
import { getNavigationCancelButton } from "../../navigation/common"
import { CommonNavs, Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator"
import { PermissionHelper } from "../../permissions/permission-helper"
import { useImageAccess } from "../../providers/image-access-provider"
import { Screen } from "../../widgets"

export const ProfileImageSelectionScreen: FC = () => {
  const { data, refetch } = useContext(AccountDataContext)
  const { selectedPhotos } = useImageAccess()
  const [loading, setLoading] = useState(false)
  const avatar = _.property("profile.avatars.xlImage")(data) as string
  const userId = _.property("id")(data) as string
  const { uploadPhotos } = React.useContext(PhotoUploadContext)
  const [updateProfileImage] = useMutation<Mutation, { userId: string; photoUuid: string }>(UPDATE_PROFILE_IMAGE_MUTATION, {
    onCompleted: () => {
      refetch()
    },
  })

  useEffect(() => {
    AccountAnalyticsController.trackUserPhotoChangeElementShow(AccountSettingsScreenElement.TakePhoto)
    AccountAnalyticsController.trackUserPhotoChangeElementShow(AccountSettingsScreenElement.SelectPhoto)
    AccountAnalyticsController.trackUserPhotoChangeElementShow(AccountSettingsScreenElement.Cancel)
  }, [])

  const onTakePhotoClick = async () => {
    AccountAnalyticsController.trackUserPhotoChangeElementClick(AccountSettingsScreenElement.TakePhoto)
    const cameraPermissionResult = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
    if (cameraPermissionResult === CheckResult.GRANTED) {
      const storagePermissionResult = await PermissionHelper.checkAndRequestPermission(Permission.Storage)
      if (storagePermissionResult === CheckResult.GRANTED) {
        Navigation.navigateToRoute(NavigableRoute.AccountProfileCameraRoll)
      }
    }
  }

  const onSelectPhotoClick = async () => {
    AccountAnalyticsController.trackUserPhotoChangeElementClick(AccountSettingsScreenElement.SelectPhoto)
    const galleryPermission = await PermissionHelper.checkAndRequestPermission(Permission.PhotoGallery)
    if (galleryPermission === CheckResult.GRANTED) {
      Navigation.navigateToRoute(NavigableRoute.AccountProfileImagePicker)
    }
  }
  const onCancelButtonPressed = () => {
    AccountAnalyticsController.trackUserPhotoChangeElementClick(AccountSettingsScreenElement.Cancel)
  }

  const { uri = avatar } = _.first(selectedPhotos) || {}

  const onPhotoSelect = async () => {
    if (uri === avatar) {
      Navigation.goBack()
      return
    }
    setLoading(true)
    try {
      const [photoUuid] = await uploadPhotos([uri])
      await updateProfileImage({
        variables: {
          userId: userId + "",
          photoUuid,
        },
      })
      Navigation.goBack()
    } catch (error) {
      CommonNavs.presentError({ error })
    }

    setLoading(false)
  }

  const isSelectedNewPhoto = uri !== avatar

  return (
    <Screen safeAreaMode="all" screenName={AccountScreenNames.ChangeProfilePhoto}>
      <NavigationBar
        title={translate("profile-stack.profile-image-select.title")}
        rightItems={[getNavigationCancelButton("profile-image-select.navigation-bar", onCancelButtonPressed)]}
        testID="profile-image-select.navigation-bar"
      />
      <Spacer direction="column" sizeStep={15} />
      <Margin grow={1} direction="column" marginStep={4}>
        <Flex grow={1} direction="column" crossAxisDistribution="center" axisDistribution="center">
          <LocalImage
            borderRadius={AVATAR_SIZE_EXTRA_LARGE / 2}
            source={{ uri }}
            aspectRatio={1}
            resizeMode="cover"
            width={AVATAR_SIZE_EXTRA_LARGE}
            testID="profile-image-select.image"
          />
        </Flex>
        <Stack grow={1} direction="column" childSeparationStep={4} axisDistribution="flex-start">
          <Spacer direction="column" sizeStep={3} />
          <Text
            textAlign="center"
            color="secondary"
            textType="tertiaryBody2"
            testID="account-stack.profile-image-select.change-photo"
          >
            {translate("profile-stack.profile-image-select.change-profile-photo")}
          </Text>
          <Button
            icon={CameraOutline}
            title={translate("profile-stack.profile-image-select.take-photo")}
            buttonType="secondary"
            buttonSize="large"
            onClick={onTakePhotoClick}
            testID="profile-image-select.take-photo"
          />
          <Button
            icon={ChatPhotoSelect}
            title={translate("profile-stack.profile-image-select.select-photo")}
            buttonType="secondary"
            buttonSize="large"
            onClick={onSelectPhotoClick}
            testID="profile-image-select.select-image"
          />
        </Stack>
        {isSelectedNewPhoto && (
          <Stack
            grow={0}
            direction="column"
            childSeparationStep={4}
            crossAxisDistribution="stretch"
            axisDistribution="center"
          >
            <Separator />
            <Button
              title={translate("profile-stack.profile-image-select.use-photo")}
              buttonType={loading ? "disabled" : "primary"}
              buttonSize="large"
              onClick={onPhotoSelect}
              loading={loading}
              testID="profile-image-select.use-photo"
            />
          </Stack>
        )}
      </Margin>
    </Screen>
  )
}
