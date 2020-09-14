import { ListProps } from "../list"
import { SectionListPropsBase } from "./section-list-common"

export interface SectionListProps<HeaderData, RowData>
  extends SectionListPropsBase<HeaderData, RowData>,
    Omit<ListProps<any>, "horizontal" | "data" | "renderItem"> {}

export interface SectionListItem<HeaderData, RowData> {
  type: "header" | "row"
  sectionIndex: number
  rowIndex?: number
  content: HeaderData | RowData
}
