export interface ProfileImageSelectorProps {
  onSelect?: (image: string) => void
  onClick?: () => void
  children: React.ReactNode
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string
}
