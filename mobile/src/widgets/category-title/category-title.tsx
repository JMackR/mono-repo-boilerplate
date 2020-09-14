import React from "react"
import { Text } from "uc-lib"
import { CategoryTitleProps } from "./category-title.d"
import _ from "lodash"
import { useCategoryTaxonomy } from "../../providers"

export const CategoryTitle: React.FC<CategoryTitleProps> = ({ id, testID }) => {
  const { getCategory } = useCategoryTaxonomy()
  const [category] = getCategory(id!)
  return (
    <Text textType="headline3" testID={testID || "category-title"}>
      {category && category.label}
    </Text>
  )
}
