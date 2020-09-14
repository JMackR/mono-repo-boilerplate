import Reanimated from "react-native-reanimated"
import { LayoutChangeEvent } from "react-native"
import { GridProps, ListProps, ListRef, LayoutContainerProps } from "uc-lib"

export interface PullToRefreshHeaderContainerProps {
  type: "leading" | "trailing"
  headerTy: Reanimated.Adaptable<number>
  refreshHandler: () => Promise<void>
  headerOffset?: number
  onLayout?: (e: LayoutChangeEvent) => void
  onRefreshComplete?: () => void
}

export interface StockPTRGridRef {
  scrollToTop: (animated: boolean) => void
}

export interface PullToRefreshListContainerProps {
  listTy: Reanimated.Adaptable<number>
}

export interface StockPTRHeaderProps extends PullToRefreshHeaderContainerProps {
  text?: string
}

interface StockPTRProps extends LayoutContainerProps {
  leadingRefreshHandler?: () => Promise<void>
  trailingRefreshHandler?: () => Promise<void>
  leadingHeaderOffset?: number
  trailingHeaderOffset?: number
  listRef?: React.MutableRefObject<ListRef>
}

export interface StockPTRListProps<T> extends Omit<ListProps<T>, "ref">, StockPTRProps {}

export interface StockPTRGridProps<T> extends Omit<GridProps<T>, "ref">, StockPTRProps {}
