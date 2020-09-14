import { PhotoImageIdentifier, downloadRemotePhoto, rotatePhoto } from ".."
import { useState, useEffect } from "react"
import { UUID } from "../../utilities"
import { usePhotoSelection } from "../../providers/photo-selection-provider"
import { OnboardingFlowAnalyticsStep1, OnboardingFlowStepOneElement, AnalyticsActionType } from "shared-lib"

export const usePhotoEdit = (photo: PhotoImageIdentifier) => {
  const [uri, setUri] = useState(photo.uri)
  const [changeToken, setChangeToken] = useState("")
  const { directoryPath } = usePhotoSelection()
  const refreshChangeToken = () => setChangeToken(UUID.uuid())

  useEffect(() => {
    OnboardingFlowAnalyticsStep1.trackPhotoEdit(OnboardingFlowStepOneElement.Reset, AnalyticsActionType.Show)
    OnboardingFlowAnalyticsStep1.trackPhotoEdit(OnboardingFlowStepOneElement.Rotate, AnalyticsActionType.Show)
  }, [])

  const reset = async () => {
    OnboardingFlowAnalyticsStep1.trackPhotoEdit(OnboardingFlowStepOneElement.Reset, AnalyticsActionType.Click)
    setUri(photo.uri)
    setChangeToken("")
  }

  const rotate = async () => {
    OnboardingFlowAnalyticsStep1.trackPhotoEdit(OnboardingFlowStepOneElement.Rotate, AnalyticsActionType.Click)
    const rotateImageUri = await rotatePhoto({ uri, rotationDegree: 90, directoryPath })
    setUri(rotateImageUri)
    refreshChangeToken()
  }

  const freeRotate = async (degrees: number) => {
    OnboardingFlowAnalyticsStep1.trackPhotoEdit(OnboardingFlowStepOneElement.Rotate, AnalyticsActionType.Click)
    const rotateImageUri = await rotatePhoto({ uri, rotationDegree: degrees, directoryPath })
    setUri(rotateImageUri)
    refreshChangeToken()
    return rotateImageUri
  }

  return {
    freeRotate,
    rotate,
    changeToken,
    uri,
    reset,
  }
}
