import React, { FC, useState, useEffect } from "react"
import { Button, Flex, ActivityIndicator, AlertLine } from "uc-lib"
import { useSearchAlert, useSearch, translate, useAuth } from "shared-lib"
import { CommonNavs, Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator"
import { SaveSearchAlertButtonProps } from "./save-search-alert.d"

export const SaveSearchAlertButton: FC<SaveSearchAlertButtonProps> = ({ query, onSavePress }) => {
  const [loading, setLoading] = useState(false)
  const { saveSearchAlert, removeSearchAlert } = useSearchAlert()
  const { state: searchState, setFeedData } = useSearch()
  const [id, setId] = useState<string | null | undefined>(undefined)
  const auth = useAuth()

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
    setId(searchState.searchAlert?.alertId)
    setLoading(false)
  }, [searchState.searchAlert])

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
    } catch (error) {
      CommonNavs.presentError({ error })
      setLoading(false)
    }
  }
  return (
    <>
      {loading && <ActivityIndicator size={20} />}
      {!loading && (
        <Flex direction="column" grow={1}>
          {!!id ? (
            <Button
              buttonSize="small"
              buttonType="tertiary"
              title={translate("search-stack.search-alert.remove-search")}
              onClick={handleRemove}
              icon={{ SVG: AlertLine.SVG, size: { width: 24, height: 24 } }}
            />
          ) : (
            <Button
              buttonSize="small"
              buttonType="buynow"
              title={translate("search-stack.search-alert.save-search")}
              onClick={handleSave}
              icon={{ SVG: AlertLine.SVG, size: { width: 24, height: 24 } }}
            />
          )}
        </Flex>
      )}
    </>
  )
}
