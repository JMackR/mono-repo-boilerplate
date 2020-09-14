import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"

import { ActionRightChevron, AlertHelpLine } from "uc-lib/assets"
import { SVG, Text, Toggle, ToggleProps } from "uc-lib/controls"
import { useColor, useMargin } from "uc-lib/themes"
import { FlexibleRowProps, FlexibleMainContentRow, FlexibleAction } from "./flexible-row-props"
import { ICON_MARGIN_MULTIPLIER, formattedSubContentRowFromProps } from "./common"
import { FC } from "react"

const VERTICAL_MARGIN_MULTIPLIER = 1
const HORIZONTAL_MARGIN_MULTIPLIER = 4

/**
 * FlexibleRow:
 *
 * consists of different combinations, layed out in the following columns:
 *    - left icon / left action
 *    - mainContent
 *        can be multiple rows
 *    - rightNotification
 *    - right icon / right action
 */
export const FlexibleRow = (props: FlexibleRowProps) => {
  const colors = useColor().colors
  const { baseMargin } = useMargin()
  const { doNotApplyHorizontalPadding } = props
  const horizontalRowPadding = doNotApplyHorizontalPadding ? undefined : baseMargin * HORIZONTAL_MARGIN_MULTIPLIER
  const styles = StyleSheet.create({
    container: {
      paddingLeft: horizontalRowPadding,
      paddingRight: horizontalRowPadding,
      paddingTop: props.height ? 0 : baseMargin * VERTICAL_MARGIN_MULTIPLIER,
      paddingBottom: props.height ? 0 : baseMargin * VERTICAL_MARGIN_MULTIPLIER,
      minHeight: 42,
      height: props.height,
      flex: 1,
      display: "flex",
      flexDirection: "row",
      "user-select": props.clickAction ? undefined : "none",
      cursor: props.clickAction ? "pointer" : undefined,
      alignItems: "center",
      verticalAlign: "middle",
      backgroundColor: colors.crystal,
    },
    leftIconColumn: {
      marginRight: 8,
      alignSelf: props.leftAlignIconTop ? "flex-start" : "center",
      alignContent: "center",
    },
    leftIcon: {
      display: "inline-block",
      height: 24,
      verticalAlign: "middle",
      width: 24,
    },
    leftActionColumn: {
      marginRight: 8,
      alignSelf: "center",
    },
    mainContentColumn: {
      flexGrow: 1,
      alignSelf: "center",
      flexDirection: "column",
    },
    mainContentRow: {
      height: 20,
      display: "flex",
    },
    mainContentRowWithPadding: {
      height: 20,
      display: "flex",
      marginBottom: 8,
    },
    mainContentRowLeftText: {
      textAlign: "center",
      verticalAlign: "center",
      alignSelf: "center",
    },
    mainContentRowLeftHelpIcon: {
      marginLeft: 4,
      height: 16,
      width: 16,
      cursor: "pointer",
      alignSelf: "center",
    },
    mainContentRowSpacer: {
      flexGrow: 1,
    },
    mainContentRowRightText: {
      alignSelf: "center",
    },
    rightIconNotificationText: {
      display: "inline-flex",
      alignSelf: "flex-start",
    },
    rightIconNotificationBadge: {
      alignSelf: "flex-end",
      width: 6,
      height: 6,
      borderRadius: 10,
      position: "absolute",
      zIndex: 1,
      right: baseMargin * ICON_MARGIN_MULTIPLIER,
      backgroundColor: colors.paintbrushRed,
    },
    rightIconColumn: {
      display: "inline-flex",
      paddingLeft: 8,
    },
    rightActionColumn: {
      marginLeft: 8,
    },
    rightActionSwitch: {
      cursor: "pointer",
      height: 30,
    },
    subtextContainer: {
      marginTop: 4,
      display: "flex",
      flexDirection: "column",
    },
  })

  const renderFlexibleMainRows = () => {
    const MainText: FC = ({ children }) => {
      return (
        <Text
          textType={props.mainContentTextType || "primaryBody2"}
          color={props.mainContentTint || "primary"}
          text={children}
        />
      )
    }

    if (typeof props.mainContent === "string") {
      return (
        <span>
          <MainText>{props.mainContent}</MainText>
        </span>
      )
    }
    const outputRows: React.ReactNode[] = []

    // flexible row can be an array of rows or just one row
    // make our propRows object
    let formattedPropRows: FlexibleMainContentRow[]
    let count: number
    if ((props.mainContent as FlexibleMainContentRow).mainText) {
      // it's a FlexibleMainContentRow
      count = 1
      formattedPropRows = []
      formattedPropRows.push(props.mainContent as FlexibleMainContentRow)
    } else {
      // it's a FlexibleMainContentRow[]
      formattedPropRows = props.mainContent as FlexibleMainContentRow[]
      count = formattedPropRows.length
    }

    // iterate through our formatted prop rows
    formattedPropRows.forEach((row, index) => {
      const lastRow = count - 1 === index
      outputRows.push(
        <div key={index} className={css(lastRow ? styles.mainContentRow : styles.mainContentRowWithPadding)}>
          <div className={css(styles.mainContentRowLeftText)}>
            <MainText>{row.mainText}</MainText>
          </div>
          {row.mainTextHelpTooltipClickAction ? (
            <div className={css(styles.mainContentRowLeftHelpIcon)} ref={row.helperIconRef}>
              <SVG
                tint="hint"
                localSVG={{
                  SVG: AlertHelpLine.SVG,
                  size: { width: 16, height: 16 },
                }}
              />
            </div>
          ) : null}
          <div className={css(styles.mainContentRowSpacer)} />
          {row.rightText ? (
            <div className={css(styles.mainContentRowRightText)}>
              <Text textType="primaryBody2" text={row.rightText} />
            </div>
          ) : null}
        </div>,
      )
    })
    return outputRows
  }

  const renderSubContent = () => {
    const formattedSubContentRow = formattedSubContentRowFromProps(props)

    return (
      <>
        {!!formattedSubContentRow && (
          <div className={css(styles.subtextContainer)}>
            {!!formattedSubContentRow.subText && (
              <Text textType="secondaryBody2" color="secondary">
                {formattedSubContentRow.subText}
              </Text>
            )}
            {!!formattedSubContentRow.clickableSubText && (
              <Text textType="secondaryBody1" color="brand" onPress={formattedSubContentRow.clickableSubTextClickAction}>
                {formattedSubContentRow.clickableSubText}
              </Text>
            )}
          </div>
        )}
      </>
    )
  }

  const renderAction = (action?: FlexibleAction) => {
    if (action === undefined) {
      return
    }
    let actionItem
    switch (action.type) {
      default:
        return
      case "brandtext":
        actionItem = () => (
          <Text color="brand" textType="secondaryBody1">
            {action.props}
          </Text>
        )

        break

      case "switch":
        const customProps: ToggleProps = { ...(action.props as ToggleProps) }
        actionItem = () => (
          <div className={css(styles.rightActionSwitch)}>
            <Toggle {...customProps} />
          </div>
        )
        break
    }
    return actionItem()
  }

  const renderLeftIconOrAction = () => {
    return (
      <>
        {props.leftIcon ? (
          <div className={css(styles.leftIconColumn)}>
            <span className={css(styles.leftIcon)}>
              <SVG
                tint={props.iconTint || "primary"}
                localSVG={{
                  SVG: props.leftIcon.SVG,
                  size: { width: 24, height: 24 },
                }}
              />
            </span>
          </div>
        ) : props.leftAction ? (
          <div className={css(styles.leftActionColumn)}>{renderAction(props.leftAction)}</div>
        ) : null}
      </>
    )
  }

  const renderRightNotificationText = () => {
    return (
      <>
        {props.rightNotification ? (
          <div className={css(styles.rightIconNotificationText)}>
            <Text color="error" textType="tertiaryBody1">
              {props.rightNotification}
            </Text>
          </div>
        ) : null}
      </>
    )
  }

  const renderRightIconOrAction = () => {
    return (
      <>
        {props.rightIcon ? (
          <RightIcon />
        ) : (
          <div className={css(styles.rightActionColumn)}>{renderAction(props.rightAction)}</div>
        )}
      </>
    )
  }

  const renderRightArrow = () => {
    const showArrow = !props.rightArrowHidden && props.clickAction !== undefined
    return (
      <>
        {showArrow ? (
          <div className={css(styles.rightIconColumn)}>
            <SVG tint="hint" localSVG={ActionRightChevron} />
          </div>
        ) : null}
      </>
    )
  }

  const RightIcon = () => {
    const nobadge = (
      <div className={css(styles.rightIconColumn)}>
        {props.rightIcon ? <SVG tint={props.iconTint || "primary"} localSVG={props.rightIcon} /> : null}
      </div>
    )
    const badge = (
      <div className={css(styles.rightIconColumn)}>
        {props.rightIcon ? (
          <div>
            <span className={css(styles.rightIconNotificationBadge)} />
            <SVG tint={props.iconTint || "primary"} localSVG={props.rightIcon} />
          </div>
        ) : null}
      </div>
    )

    return props.rightNotification ? badge : nobadge
  }

  return (
    <div onClick={props.clickAction} className={css(styles.container)}>
      {renderLeftIconOrAction()}
      <div className={css(styles.mainContentColumn)}>
        {renderFlexibleMainRows()}
        {renderSubContent()}
      </div>
      {renderRightNotificationText()}
      {renderRightIconOrAction()}
      {renderRightArrow()}
    </div>
  )
}
