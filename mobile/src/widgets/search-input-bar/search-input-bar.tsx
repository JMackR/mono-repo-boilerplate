import { Text, ViewBlock, TextEntryRef, Search, Spacer, Stack, useMargin, Touchable } from "uc-lib"
import { Input } from "uc-lib/controls"
import React, { FC, useRef, forwardRef, useImperativeHandle } from "react"
import _ from "lodash"
import { Navigation } from "../../navigation/navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator/navigableroute"
import { SearchInputBarProps, SearchInputBarRef } from "./search-input-bar.d"
import { StyleSheet } from "react-native"
import { translate } from "shared-lib"

const SEPERATION_MARGIN = 4
const PLACEHOLDER_MARGIN_TOP = 2.5
const PLACEHOLDER_MARGIN_LEFT = 3

export const SearchInputBar = forwardRef<SearchInputBarRef, SearchInputBarProps>((props, ref) => {
  const { query, cid, showSearchPlaceholder, showSearchAlertButton, onSaveAlertPress, testID } = props
  const queryKeyword = _.toString(query)
  const { baseMargin } = useMargin()
  const inputRef = useRef<TextEntryRef>(null)

  let searchHintText = translate("search-stack.hint.search")

  const STYLES = StyleSheet.create({
    placeholder: {
      position: "absolute",
      marginTop: -baseMargin * PLACEHOLDER_MARGIN_TOP,
      marginLeft: baseMargin * PLACEHOLDER_MARGIN_LEFT,
    },
    saveAlertButtonContainer: {
      position: "absolute",
      right: 0,
    },
  })

  const handleInputFocus = () => {
    // Navigation.navigateToRoute(NavigableRoute.SearchSuggestion, { q: queryKeyword, cid: _.toString(cid) })
  }
  const handlePlaceholderPress = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }
  const shouldShowSearchPlaceholder = showSearchPlaceholder && !queryKeyword
  return (
    <>
      <Stack direction="row" crossAxisDistribution="center" testID={testID || "search-input-bar"}>
        {shouldShowSearchPlaceholder && (
          <Touchable onPress={handlePlaceholderPress} style={STYLES.placeholder}>
            <Stack direction="row">
              <Text textType="primaryBody2" color={"brand"} text={translate("search-stack.hint.search")} />
            </Stack>
          </Touchable>
        )}
        <Input
          ref={inputRef}
          autoCapitalize="sentences"
          autoCorrect={false}
          focusState="unfocused"
          showSoftInputOnFocus={false}
          text={queryKeyword}
          hint={shouldShowSearchPlaceholder ? undefined : searchHintText}
          trailingIcon={Search}
          focusHandler={handleInputFocus}
          testID={testID || "search-input-bar"}
        />
      </Stack>
    </>
  )
})
SearchInputBar.defaultProps = {
  showSearchPlaceholder: true,
}
