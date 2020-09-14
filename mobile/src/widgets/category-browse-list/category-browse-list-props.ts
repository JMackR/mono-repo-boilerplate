import { CategoryNode } from "shared-lib"

export interface CategoryBrowseListProps {
  preSelectedCategoryId?: string
  onCategoryNodeClick: (category: CategoryNode) => void
  /**
   * This flag determines whether we show `View All` button for L2 categories
   * default value: true
   */
  showViewAll?: boolean
  testID?: string
}

export interface CategoryBrowseListRowProps extends CategoryBrowseListProps {
  category: CategoryNode
}
