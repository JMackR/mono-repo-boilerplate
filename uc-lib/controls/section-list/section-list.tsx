import React, { forwardRef, Ref } from "react"
import { SectionListProps, SectionListItem } from "./section-list-props"
import { Flex, Margin } from "../layout"
import { List, ListRef, ListProps } from "../list"
import { Text } from "../text"
import { ouFlatMap } from "shared-lib/utilities/object-utils"

export const SectionList = forwardRef(
  // tslint:disable-next-line: no-any
  <HeaderData extends any, RowData extends any>(props: SectionListProps<HeaderData, RowData>, ref: Ref<ListRef>) => {
    const { sections, renderSectionHeader, renderRow, ...rest } = props

    interface ListItemType extends SectionListItem<HeaderData, RowData> {}

    const formattedSections: ListItemType[] | undefined = ouFlatMap(sections, (section, sectionIndex) => {
      const sectionAsItem: ListItemType = {
        type: "header",
        sectionIndex,
        content: section.headerData,
      }
      const rowsAsItems = section.rows.map<ListItemType>((row, rowIndex) => {
        const rowAsItem: ListItemType = {
          type: "row",
          sectionIndex,
          rowIndex,
          content: row,
        }
        return rowAsItem
      })
      return [sectionAsItem, ...rowsAsItems]
    })

    const sectionListProps: ListProps<SectionListItem<HeaderData, RowData>> = {
      ...rest,
      data: formattedSections || [],
      renderItem: (item: SectionListItem<HeaderData, RowData>) => {
        if (item.type === "header") {
          if (renderSectionHeader) {
            return renderSectionHeader(item.content as HeaderData, item.sectionIndex)
          } else {
            const str = typeof item.content === "string" ? item.content : JSON.stringify(item.content)
            return renderDefaultSectionListHeader(str)
          }
        } else {
          return renderRow(item.content as RowData, item.sectionIndex, item.rowIndex)
        }
      },
    }
    return (
      <Flex direction="column" grow={1}>
        <List ref={ref} {...sectionListProps} />
      </Flex>
    )
  },
)

const MARGIN_STEP = 4

export const renderDefaultSectionListHeader = (headerString: string) => {
  return (
    <Margin marginTopStep={MARGIN_STEP} marginLeftStep={MARGIN_STEP} marginRightStep={MARGIN_STEP}>
      <Text textType="headline3" text={headerString} />
    </Margin>
  )
}
