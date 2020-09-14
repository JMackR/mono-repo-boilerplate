import {
  translate,
  OnboardingFlowAnalyticsController,
  OnboardingFlowAnalyticsStep1,
  AnalyticsElementType,
  OnboardingFlowStepOneElement,
  OnboardingFlowElement,
  AnalyticsActionType,
} from "shared-lib"
import { LocalImage, LocalImageProps, Margin, useLoadingState, Border } from "uc-lib"
import React, { FC, useEffect } from "react"
import { Navigation, CommonNavs } from "../../../../../navigation/navigation"
import { NavigableRoute } from "../../../../../navigation/navigator/navigableroute"
import {
  ActionSheetParams,
  DraggableList,
  DraggableListItem,
  PhotoImageIdentifier,
  useActionSheet,
  downloadRemotePhoto,
} from "../../../../../widgets"
import { usePhotoSelection } from "../../photo-selection-provider"

interface OnboardingSelectedPhotosProps {
  selectedPhotos: PhotoImageIdentifier[]
}

const THUMBNAIL_PROPS: LocalImageProps = {
  width: 64,
  height: 64,
  borderRadius: 4,
  resizeMode: "cover",
  source: {
    uri: "",
  },
}
const MARGIN_STEP = 2
const CANCEL_ACTION_INDEX = 3
const DELETE_ACTION_INDEX = 2
interface ActionSheetActionType {
  label: string
  perform: (photo: PhotoImageIdentifier) => void
}

export const OnboardingSelectedPhotos: FC<OnboardingSelectedPhotosProps> = ({ selectedPhotos }) => {
  const { setSelectedPhotos, removePhoto, setPhotoAsCoverPhoto, directoryPath } = usePhotoSelection()
  const { show: showActionSheet } = useActionSheet()
  const { startLoading, stopLoading } = useLoadingState()

  useEffect(() => {
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionShowEvent(AnalyticsElementType.Image, OnboardingFlowElement.Edit)
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionShowEvent(
      AnalyticsElementType.Button,
      OnboardingFlowStepOneElement.CoverPhoto,
    )
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionShowEvent(
      AnalyticsElementType.Button,
      OnboardingFlowStepOneElement.Delete,
    )
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionShowEvent(
      AnalyticsElementType.Button,
      OnboardingFlowElement.Cancel,
    )
  }, [])

  const Actions: ActionSheetActionType[] = [
    {
      label: translate("onboarding-flow.photo-selection.action-sheet-menu.edit"),
      perform: async (photo: PhotoImageIdentifier) => {
        OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionClickEvent(
          AnalyticsElementType.Button,
          OnboardingFlowStepOneElement.Edit,
        )

        if (photo.uuid) {
          try {
            startLoading()
            const downloadedPhoto = await downloadRemotePhoto({
              urlToDownload: photo.uri,
              directoryPath,
            })
            Navigation.navigateToRoute(NavigableRoute.OnboardingFlowPhotoEdit, { photo: { ...photo, ...downloadedPhoto } })
          } catch (error) {
            CommonNavs.presentError({ error })
          } finally {
            stopLoading()
          }
        } else {
          Navigation.navigateToRoute(NavigableRoute.OnboardingFlowPhotoEdit, { photo })
        }
      },
    },
    {
      label: translate("onboarding-flow.photo-selection.action-sheet-menu.set-as-cover-photo"),
      perform: (photo: PhotoImageIdentifier) => {
        OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionClickEvent(
          AnalyticsElementType.Button,
          OnboardingFlowStepOneElement.CoverPhoto,
        )
        setPhotoAsCoverPhoto(photo)
      },
    },
    {
      label: translate("onboarding-flow.photo-selection.action-sheet-menu.remove"),
      perform: (photo: PhotoImageIdentifier) => {
        OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionClickEvent(
          AnalyticsElementType.Button,
          OnboardingFlowStepOneElement.Delete,
        )
        removePhoto(photo.id)
      },
    },
    {
      label: translate("onboarding-flow.photo-selection.action-sheet-menu.cancel"),
      perform: () => {
        OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionClickEvent(
          AnalyticsElementType.Button,
          OnboardingFlowElement.Cancel,
        )
      },
    },
  ]
  const ouActionSheetOptions: ActionSheetParams = {
    options: Actions.map(action => action.label),
    cancelButtonIndex: CANCEL_ACTION_INDEX,
    destructiveButtonIndex: DELETE_ACTION_INDEX,
  }

  const renderPhoto = ({
    item,
    index,
    drag,
    isActive,
  }: {
    item: PhotoImageIdentifier
    drag: () => void
    index?: number
    isActive: boolean
  }) => {
    const openActionMenu = () => {
      OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionEvent(
        AnalyticsElementType.Button,
        `${OnboardingFlowStepOneElement.Photo}${index}`,
        AnalyticsActionType.Show,
      )
      showActionSheet(ouActionSheetOptions, (pressed: number) => {
        Actions[pressed].perform(item)
      })
    }
    return (
      <DraggableListItem
        onPressHandler={openActionMenu}
        longPressHandler={drag}
        isDragging={isActive}
        testID={"onboarding-flow.selected.photo." + index}
      >
        <Margin marginRightStep={MARGIN_STEP}>
          <Border color={"limestonePressed"} cornerRadius={"small"}>
            <LocalImage {...THUMBNAIL_PROPS} source={{ uri: item.uri }} />
          </Border>
        </Margin>
      </DraggableListItem>
    )
  }

  const keyExtractor = (item: PhotoImageIdentifier): string => {
    return item.uri
  }

  const dragEnd = ({ data, from }: { data: PhotoImageIdentifier[]; from: number }) => {
    OnboardingFlowAnalyticsStep1.trackPhotosAfterSelectionEvent(
      AnalyticsElementType.Button,
      `${OnboardingFlowStepOneElement.Photo}${from}`,
      AnalyticsActionType.Reorder,
    )
    setSelectedPhotos([selectedPhotos[0], ...data])
  }

  return (
    <DraggableList
      data={selectedPhotos.slice(1, selectedPhotos.length)}
      horizontal={true}
      renderItem={renderPhoto}
      keyExtractor={keyExtractor}
      onDragEnd={dragEnd}
      testID="onboarding-flow.draggable-list"
    />
  )
}
