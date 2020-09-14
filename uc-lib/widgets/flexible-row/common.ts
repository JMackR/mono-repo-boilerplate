import { FlexibleRowProps, FlexibleSubContentRow } from "./flexible-row-props"

export const ICON_MARGIN_MULTIPLIER = 5

export const formattedSubContentRowFromProps = (props: FlexibleRowProps): FlexibleSubContentRow | undefined => {
  if (typeof props.subContent === "string") {
    return {
      subText: props.subContent as string,
    }
  } else if (isFlexibleSubContentRow(props.subContent)) {
    return props.subContent
  }
  return undefined
}

function isFlexibleSubContentRow(subContent?: string | FlexibleSubContentRow): subContent is FlexibleSubContentRow {
  if (subContent === undefined) {
    return false
  } else if ((subContent as FlexibleSubContentRow).subText !== undefined) {
    return true
  } else if ((subContent as FlexibleSubContentRow).clickableSubText !== undefined) {
    return true
  }
  return false
}
