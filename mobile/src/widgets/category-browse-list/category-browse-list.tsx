import { translate, GraphGQLErrorParser } from "shared-lib"
import { Flex, List, Center, ActivityIndicator, EmptyState, Button, Stack } from "uc-lib"
import React, { FC } from "react"
import { useCategoryTaxonomy } from "../../providers"
import { CategoryBrowseRow } from "./category-browse-row"
import { CategoryBrowseListProps } from "./category-browse-list-props"

export const CategoryBrowseList: FC<CategoryBrowseListProps> = props => {
  const { categoryTaxonomy, loading, error, retry } = useCategoryTaxonomy()
  const { testID } = props
  let categories
  if (categoryTaxonomy) {
    categories = categoryTaxonomy.children
  }

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center>
        <Stack direction="column" childSeparationStep={2}>
          <EmptyState ouException={GraphGQLErrorParser(error)} />
          <Button buttonSize="small" title={translate("common-actions.retry")} buttonType="flat" onClick={retry} />
        </Stack>
      </Center>
    )
  }
  const renderCategoryRow = (category: CategoryNode, index: number) => {
    return <CategoryBrowseRow {...props} category={category} key={index} />
  }

  return (
    <Flex direction="column" grow={1}>
      <List data={categories} testID={testID} renderItem={renderCategoryRow} />
    </Flex>
  )
}
