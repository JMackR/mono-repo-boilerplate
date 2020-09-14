import { PermissionHelper } from "../../../../../permissions/permission-helper"
import { Permission, CheckResult } from "shared-lib"
import { Navigation } from "../../../../../navigation/navigation"
import { NavigableRoute } from "../../../../../navigation/navigator/navigableroute"
import { Platform } from "react-native"

export const attemptNavigationToCamera = async () => {
  const cameraPermissionResult = await PermissionHelper.checkAndRequestPermission(Permission.Camera)
  if (cameraPermissionResult === CheckResult.GRANTED) {
    if (Platform.OS === "android") {
      const storagePermissionResult = await PermissionHelper.checkAndRequestPermission(Permission.Storage)
      if (storagePermissionResult === CheckResult.GRANTED) {
        Navigation.navigateToRoute(NavigableRoute.OnboardingFlowCameraRoll)
      }
    } else {
      Navigation.navigateToRoute(NavigableRoute.OnboardingFlowCameraRoll)
    }
  }
}

export const attemptNavigationToPhotoGallery = async () => {
  const galleryPermission = await PermissionHelper.checkAndRequestPermission(Permission.PhotoGallery)
  if (galleryPermission === CheckResult.GRANTED) {
    Navigation.navigateToRoute(NavigableRoute.OnboardingFlowImagePicker)
  }
}
