import React, { FC } from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { useColor } from "../../themes"
import { CircleProps } from "./circle.d"

export const Circle: FC<CircleProps> = props => {
  const { size, color, children } = props
  const { colors } = useColor()

  const circleStyles = React.useMemo(() => {
    return StyleSheet.create({
      container: {
        borderRadius: size / 2,
        width: size,
        height: size,
        backgroundColor: color ? colors[color] : undefined,
        overflow: "hidden",
      },
    })
  }, [size, color])

  return <div className={css(circleStyles.container)}>{children}</div>
}
