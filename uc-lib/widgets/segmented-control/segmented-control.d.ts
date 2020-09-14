export interface TabInfo {
  key: string;
  title: string;
  tabContent: JSX.Element;
  showGleam?: boolean;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}

export interface SegmentedControlProps {
  tabs: TabInfo[];
  onSelect?: (selectedIndex: number) => void;
  selectedIndex?: number;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}
