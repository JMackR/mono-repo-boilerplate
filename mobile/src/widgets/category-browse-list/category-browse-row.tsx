import React, { FC, useState } from "react"
import {
  FlexibleRow,
  FlexibleRowProps,
  Margin,
  Stack,
  ActionDownChevron,
  ActionUpChevron,
  Touchable,
  Text,
  SVG,
  SpacerFlex,
  CheckIcon,
} from "uc-lib"
import { translate } from "shared-lib"
import { Navigation } from "../../navigation/navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator/navigableroute"
import { CategoryBrowseListRowProps } from "./category-browse-list-props"
import { useCategoryTaxonomy } from "../../providers"

const SelectedIcon = {
  SVG: CheckIcon.SVG,
  size: {
    width: 24,
    height: 24,
  },
}

export const CategoryBrowseRow: FC<CategoryBrowseListRowProps> = ({
  category,
  onCategoryNodeClick,
  preSelectedCategoryId = "",
  showViewAll,
  testID,
}) => {
  const parentPreselectedId = preSelectedCategoryId.split(".")[0]
  const [isSelectedCategory, setIsSelectedCategory] = useState(parentPreselectedId === category.id)
  const { getChildCategories } = useCategoryTaxonomy()
  const renderChildCategory = (childCategory: CategoryNode, index: number) => {
    const rowProps: FlexibleRowProps = {
      mainContent: childCategory.label,
      rightArrowHidden: true,
      clickAction: () => {
        onCategoryNodeClick(childCategory)
      },
    }
    if (preSelectedCategoryId === childCategory.id) {
      rowProps.rightIcon = SelectedIcon
      rowProps.iconTint = "brand"
    }
    return <FlexibleRow {...rowProps} key={index} testID={testID + ".category." + category.id + "." + index} />
  }
  const renderViewAllCategory = () => {
    const rowProps: FlexibleRowProps = {
      mainContent: translate("common-actions.view-all"),
      rightArrowHidden: true,
      clickAction: () => {
        Navigation.navigateToRoute(NavigableRoute.Search, { cid: category.id })
      },
    }
    return (
      <FlexibleRow
        {...rowProps}
        key={`view-all-${category.id}`}
        testID={testID + ".category." + category.id + ".view-all"}
      />
    )
  }
  const handlePressRow = () => {
    if (!category.children) {
      onCategoryNodeClick(category)
    }
    setIsSelectedCategory(!isSelectedCategory)
  }
  const shouldShowViewAll = showViewAll && !!category.children

  return (
    <>
      <Touchable onPress={handlePressRow} testID={testID + ".category." + category.id}>
        <Margin marginStep={3} marginLeftStep={4} marginRightStep={4}>
          <Stack grow={1} direction={"row"}>
            <Text textType="primaryBody1">{category.label}</Text>
            <SpacerFlex />
            {shouldShowViewAll && (
              <SVG localSVG={isSelectedCategory ? ActionUpChevron : ActionDownChevron} tint={"secondary"} />
            )}
          </Stack>
        </Margin>
      </Touchable>
      {isSelectedCategory && (
        <Margin grow={1} marginLeftStep={4}>
          <Stack grow={1} direction="column">
            {shouldShowViewAll && renderViewAllCategory()}
            {category.children &&
              getChildCategories(category).map((cat, index) => {
                return renderChildCategory(cat, index)
              })}
          </Stack>
        </Margin>
      )}
    </>
  )
}

CategoryBrowseRow.defaultProps = {
  showViewAll: true,
}
