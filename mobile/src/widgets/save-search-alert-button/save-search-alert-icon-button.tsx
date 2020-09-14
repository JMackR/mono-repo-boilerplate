import React, { FC, useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react"
import { View } from "react-native"
import { SVG, ViewBlock, AlertLine, AlertFill, ActivityIndicator, Touchable, Margin } from "uc-lib"
import { useSearchAlert, useSearch, translate, StorageController, useAuth } from "shared-lib"
import { CommonNavs, Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator"
import { TooltipProvider, useTooltip } from "uc-lib/widgets/tooltip"
import {
  SaveSearchAlertButtonProps,
  SaveSearchAlertIconButtonContainerProps,
  SaveSearchAlertIconButtonRef,
} from "./save-search-alert.d"
import { SHOWED_SAVE_SEARCH_HINT_STORAGE_KEY } from "shared-lib/utilities/storage/storage-constants"

const SaveSearchAlertIconButtonBase: FC<SaveSearchAlertButtonProps> = forwardRef(({ query, onSavePress, testID }, ref) => {
  const [loading, setLoading] = useState(false)
  const { saveSearchAlert, removeSearchAlert } = useSearchAlert()
  const { state: searchState, setFeedData } = useSearch()
  const [id, setId] = useState<string | null | undefined>(undefined)
  const { showTooltip } = useTooltip()
  const saveSearchRef = useRef<View>(null)
  const auth = useAuth()

  useImperativeHandle(ref, () => ({
    save: () => {
      handleSave()
    },
  }))

  const updateSearchAlert = (alertId?: string) => {
    if (alertId) {
      setFeedData({
        searchAlert: {
          alertId,
        },
      })
      return
    }
    setFeedData({
      searchAlert: undefined,
    })
  }
  useEffect(() => {
    const saveSearchHintStorage = StorageController(SHOWED_SAVE_SEARCH_HINT_STORAGE_KEY, false)
    saveSearchHintStorage.getItem().then(isShowed => {
      if (!isShowed) {
        showTooltipSearchAlert(translate("search-stack.search-alert.saved-search-hint"))
        saveSearchHintStorage.setItem(true)
      }
    })
  }, [])
  useEffect(() => {
    setId(searchState.searchAlert?.alertId)
    setLoading(false)
  }, [searchState.searchAlert])

  const showTooltipSearchAlert = (content: string) => {
    showTooltip({
      clickComponent: saveSearchRef.current,
      content,
      width: 173,
      type: "highlight",
    })
  }
  const handleSave = async () => {
    if (!auth.isAuthed) {
      Navigation.navigateToRoute(NavigableRoute.AuthLanding)
      return
    }
    onSavePress && onSavePress()
    setLoading(true)
    try {
      const newId = await saveSearchAlert({
        query,
        ...searchState.searchParams,
      })
      updateSearchAlert(newId)
      showTooltipSearchAlert(translate("search-stack.search-alert.saved-search-confirmation"))
    } catch (error) {
      CommonNavs.presentError({ error })
      setLoading(false)
    }
  }
  const handleRemove = async () => {
    if (!id) {
      return
    }
    setLoading(true)
    try {
      await removeSearchAlert(id)
      updateSearchAlert(undefined)
      showTooltipSearchAlert(translate("search-stack.search-alert.removed-search-confirmation"))
    } catch (error) {
      CommonNavs.presentError({ error })
      setLoading(false)
    }
  }
  const defaultTestID = testID || "search-alert-button"
  return (
    <TooltipProvider>
      <ViewBlock ref={saveSearchRef}>
        {loading && (
          <SaveSearchAlertIconButtonContainer testID={defaultTestID}>
            <ActivityIndicator size={20} />
          </SaveSearchAlertIconButtonContainer>
        )}
        {!loading && (
          <>
            {!!id ? (
              <SaveSearchAlertIconButtonContainer onPress={handleRemove} testID={defaultTestID}>
                <SVG localSVG={AlertFill} />
              </SaveSearchAlertIconButtonContainer>
            ) : (
              <SaveSearchAlertIconButtonContainer onPress={handleSave} testID={defaultTestID}>
                <SVG localSVG={AlertLine} tint={"primary"} />
              </SaveSearchAlertIconButtonContainer>
            )}
          </>
        )}
      </ViewBlock>
    </TooltipProvider>
  )
})

const SaveSearchAlertIconButtonContainer: FC<SaveSearchAlertIconButtonContainerProps> = ({ children, onPress, testID }) => {
  const content = (
    <Margin marginTopStep={3} marginBottomStep={3} marginLeftStep={2} marginRightStep={2}>
      {children}
    </Margin>
  )
  if (!onPress) {
    return content
  }
  const handlePress = () => {
    onPress()
  }
  return (
    <Touchable onPress={handlePress} testID={testID}>
      {content}
    </Touchable>
  )
}

export const SaveSearchAlertIconButton: FC<SaveSearchAlertButtonProps> = forwardRef((props, ref) => {
  const buttonRef = useRef<SaveSearchAlertIconButtonRef>(null)
  useImperativeHandle(ref, () => ({
    save: () => {
      if (buttonRef && buttonRef.current) {
        buttonRef.current.save()
      }
    },
  }))
  return (
    <TooltipProvider>
      <SaveSearchAlertIconButtonBase ref={buttonRef} {...props} />
    </TooltipProvider>
  )
})
