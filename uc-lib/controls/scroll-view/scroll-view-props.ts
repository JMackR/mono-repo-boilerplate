export interface ScrollViewProps {
  /**
   * @default false
   * @warning Not yet supported on web. Need it? Add it!
   */
  horizontal?: boolean

  /**
   * @default true
   * @warning Not yet supported on web. Need it? Add it!
   */
  onlyScrollsWhenNeeded?: boolean

  /**
   * @default zero
   * @warning Not yet supported on web. Need it? Add it!
   */
  bottomContentInsetStep?: number

  /**
   * @default undefined
   * @warning Only supported on Web and required when the containing flexbox is unable to supply a height.
   */
  height?: string

  /**
   * @default false
   * Whether your content will use flexGrow: 0 when scroll is _disabled_.
   * Allows for advanced usage of centering scrollview when it does not fill in its full container.
   * Wrap with a flex layout to use.
   * @warning On Web, you must provide the _height_ prop if this is set to true.
   */
  disableFlexGrowContentWhenNotScrolling?: boolean

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
