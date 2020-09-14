import React, { FC } from "react"
import { useQuery } from "@apollo/react-hooks"
import { PillList, SVG, CategoriesOutline, PillDataProps } from "uc-lib"
import { CategoryBarProps } from "./category-bar.d"
import { translate } from "../../utilities/i18n"

export const CategoryBar: FC<CategoryBarProps> = ({ onPressAllCategories, onPressCategory, paddingLeft, testID }) => {
  const { data } = useQuery(GET_CATEGORY_TAXONOMY)
  const categoryList: PillDataProps[] = [
    {
      text: translate("search-stack.all-categories"),
      icon: <SVG localSVG={CategoriesOutline} tint={"primary"} />,
      onClick: onPressAllCategories,
      testID: "category.all-categories",
    },
  ]
  if (data) {
    const categories = data.getTaxonomy.children
    categories.map((category: CategoryNode) => {
      const { label, id } = category
      const cat = {
        text: label,
        onClick: () => {
          if (onPressCategory) {
            onPressCategory(id)
          }
        },
        testID: "category." + id,
      }
      categoryList.push(cat)
    })
  }
  return <PillList data={categoryList} paddingLeft={paddingLeft} testID={testID || "category-bar"} />
}
