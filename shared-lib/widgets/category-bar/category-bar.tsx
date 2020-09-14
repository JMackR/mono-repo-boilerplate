import React, { FC } from "react"
import { useQuery } from "@apollo/react-hooks"
import { PillList, SVG, CategoriesOutline, PillDataProps } from "uc-lib"
import { CategoryBarProps } from "./category-bar.d"
import { translate } from "../../utilities/i18n"

export const CategoryBar: FC<CategoryBarProps> = ({ allCategoriesHref, getCategoryHref, testID }) => {
  const { data } = useQuery(GET_CATEGORIES)
  const categoryList: PillDataProps[] = [
    {
      text: translate("search-stack.all-categories"),
      icon: <SVG localSVG={CategoriesOutline} tint={"primary"} />,
      href: allCategoriesHref,
      testID: "category.all-categories",
    },
  ]
  if (data) {
    const { categories } = data.categories
    categories.map(({ name, id }: { name: string; id: string }) => {
      let href: string | undefined
      if (getCategoryHref) {
        href = getCategoryHref(id)
      }
      const cat = {
        text: name,
        href,
        onClick: () => {},
        testID: "category." + id,
      }
      categoryList.push(cat)
    })
  }
  return <PillList data={categoryList} testID={testID || "category-bar"} />
}
