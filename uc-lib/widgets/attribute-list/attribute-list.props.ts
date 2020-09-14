export interface AttributeListProps {
  title: string
  expandThreshold: number
  testID?: string
}

export interface Attribute {
  label: string
  value: string
}

export interface AttributeProps extends Attribute {
  testID?: string
}
