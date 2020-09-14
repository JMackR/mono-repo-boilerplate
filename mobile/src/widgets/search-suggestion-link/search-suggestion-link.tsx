import React, { FC } from "react"
import { SearchSuggestionLinkProps } from "./search-suggestion-link.d"
import { Stack, Touchable } from "uc-lib"
import { Text } from "uc-lib/controls/text"
import { translate } from "shared-lib"

const SearchSuggestionLink: FC<SearchSuggestionLinkProps> = ({ originalQuery, searchWithOriginalQuery }) => {
  return (
    <Stack direction="row">
      <Text textType="secondaryBody1">{translate("search-stack.search-suggestion.search-instead-for")}</Text>
      <Touchable onPress={searchWithOriginalQuery}>
        <Text textType="secondaryBody1" color="brand">
          {originalQuery}
        </Text>
      </Touchable>
    </Stack>
  )
}

export { SearchSuggestionLink }
