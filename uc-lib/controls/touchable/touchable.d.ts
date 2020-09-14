import { MouseEvent } from "react"
import { StyleDeclaration } from "aphrodite/no-important"
import { TouchableCommonProps } from "./touchable.d.common"

export interface TouchableProps extends TouchableCommonProps {
  onPress?(event: MouseEvent): void
  /* Define style in web via aphrodite */
  className?: StyleDeclaration
  /* Whether to treat it a link or not on web */
  href?: string
}
