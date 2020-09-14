export interface SectionListPropsBase<HeaderData, RowData> {
  /**
   * If this method is not defined, the header will be text rendered by stringify the contents of HeaderData.
   * The most common use case is that HeaderData will be of type "string".
   */
  renderSectionHeader?: (headerData: HeaderData, sectionIndex?: number) => JSX.Element
  /**
   * Funtion to render the row given the data and index.
   */
  renderRow: (rowData: RowData, sectionIndex?: number, rowIndex?: number) => JSX.Element
  /**
   * The data to be rendered.
   * Consists of an array of sections, which contains the HeaderData and an array of rows of type RowData.
   */
  sections: Section<HeaderData, RowData>[]
}

export interface Section<HeaderData, RowData> {
  headerData: HeaderData
  rows: RowData[]
}
