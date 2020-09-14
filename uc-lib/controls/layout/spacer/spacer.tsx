import React, { useMemo, FC } from "react"
import { useMargin } from "uc-lib/themes"
import { StyleSheet, css } from "aphrodite/no-important"
import { SpacerProps } from "./spacer.d"
import invariant from "invariant"

export const Spacer: FC<SpacerProps> = props => {
  const { children, sizeStep, direction } = props

  invariant(React.Children.count(children) === 0, "Spacer does not allow children")

  const { baseMargin } = useMargin()

  const styles = useMemo(() => {
    const multipliedSize = sizeStep * baseMargin
    return StyleSheet.create({
      root: {
        height: direction === "column" ? multipliedSize : undefined,
        width: direction === "row" ? multipliedSize : undefined,
        display: direction === "row" ? "inline-block" : "block",
      },
    })
  }, [sizeStep, direction, baseMargin])

  return <div className={css(styles.root)} />
}
