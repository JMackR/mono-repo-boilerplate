import React, { memo } from "react"
import { ActionRightChevron, AlertHelpLine } from "uc-lib/assets"
import { Margin, Stack, SVG, Text, Toggle, ToggleProps } from "uc-lib/controls"
import { useColor, useMargin } from "uc-lib/themes"
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { FlexibleRowProps, FlexibleMainContentRow, FlexibleAction } from "./flexible-row-props"
import invariant from "invariant"
import { formattedSubContentRowFromProps } from "./common"
const MARGIN_MULTIPLIER = 4
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
export const FlexibleRow = memo((props: FlexibleRowProps) => {
  const { colors } = useColor()
  const { baseMargin } = useMargin()
  const { doNotApplyHorizontalPadding, testID } = props
  const horizontalRowPadding = doNotApplyHorizontalPadding ? undefined : baseMargin * MARGIN_MULTIPLIER
  const styles = StyleSheet.create({
    container: {
      paddingLeft: horizontalRowPadding,
      paddingRight: horizontalRowPadding,
      paddingTop: props.height ? 0 : baseMargin * MARGIN_MULTIPLIER,
      paddingBottom: props.height ? 0 : baseMargin * MARGIN_MULTIPLIER,
      minHeight: 42,
      height: props.height,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.crystal,
    },
    flex: {
      flexGrow: 1,
    },
    leftIconColumn: {
      marginRight: 8,
      alignSelf: props.leftAlignIconTop ? "flex-start" : "center",
    },
    leftActionColumn: {
      paddingRight: 8,
      alignSelf: "center",
    },
    mainContentColumn: {
      flexShrink: 1,
      flexGrow: 1,
      flexDirection: "column",
    },
    rightIconNotificationText: {
      alignSelf: "flex-start",
    },
    rightIconNotificationBadge: {
      alignSelf: "flex-end",
      width: 6,
      height: 6,
      borderRadius: 10,
      position: "absolute",
      zIndex: 1,
      right: -5,
      backgroundColor: colors.paintbrushRed,
    },
    rightIconColumn: {
      paddingLeft: 8,
    },
    rightActionColumn: {
      paddingLeft: 8,
      alignSelf: "center",
    },
    mainContentRow: {
      height: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    mainContentRowWithPadding: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    mainContentRowLeftText: {
      alignSelf: "center",
    },
    mainContentRowLeftHelpIcon: {
      flex: 1,
      paddingLeft: 4,
      justifyContent: "center",
    },
    mainContentRowSpacer: {
      flex: 1,
    },
    mainContentRowRightText: {
      alignSelf: "center",
    },
    subtextContainer: {
      paddingTop: 4,
    },
  })
  const renderFlexibleMainRows = () => {
    if (typeof props.mainContent === "string") {
      return (
        <Stack grow={0} direction={"row"} crossAxisDistribution={"center"} childSeparationStep={5}>
          <Text
            textType={props.mainContentTextType || "primaryBody2"}
            color={props.mainContentTint || "primary"}
            testID={testID}
            text={props.mainContent}
          />
          {props.additionalMainText && <Text textType={"secondaryBody2"} text={props.additionalMainText} />}
        </Stack>
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
      const mainContentTestID = (testID || "uc-lib.flex-row") + ".main-content.row."
      outputRows.push(
        <View
          key={index}
          style={lastRow ? styles.mainContentRow : styles.mainContentRowWithPadding}
          testID={mainContentTestID + index}
          accessibilityLabel={mainContentTestID + index}
        >
          <View style={styles.mainContentRowLeftText}>
            <MainText testID={mainContentTestID + index + ".main-text"}>{row.mainText}</MainText>
          </View>
          {row.mainTextHelpTooltipClickAction ? (
            <TouchableOpacity
              onPress={row.mainTextHelpTooltipClickAction}
              testID={mainContentTestID + index + ".main-text-tooltip"}
              accessibilityLabel={mainContentTestID + index + ".main-text-tooltip"}
            >
              <View style={styles.mainContentRowLeftHelpIcon}>
                <View collapsable={false} ref={row.helperIconRef}>
                  <SVG
                    tint="hint"
                    localSVG={{
                      SVG: AlertHelpLine.SVG,
                      size: { width: 16, height: 16 },
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ) : null}
          <View style={styles.mainContentRowSpacer} />
          {row.rightText ? (
            <View style={styles.mainContentRowRightText}>
              <Text textType="primaryBody2" testID={mainContentTestID + index + ".right-text"} text={row.rightText} />
            </View>
          ) : null}
        </View>,
      )
    })
    return outputRows
  }
  const renderSubContent = () => {
    const formattedSubContentRow = formattedSubContentRowFromProps(props)
    return (
      <>
        {!!formattedSubContentRow && (
          <View style={styles.subtextContainer}>
            {!!formattedSubContentRow.subText && (
              <Text
                textType="secondaryBody2"
                color="secondary"
                testID="redibs-ucl.flex-row.sub-content.sub-text"
                text={formattedSubContentRow.subText}
              />
            )}
            {!!formattedSubContentRow.clickableSubText && (
              <Text
                textType="secondaryBody1"
                color="brand"
                onPress={formattedSubContentRow.clickableSubTextClickAction}
                testID="redibs-ucl.flex-row.sub-content.sub-text"
                text={formattedSubContentRow.clickableSubText}
              />
            )}
          </View>
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
        invariant(typeof action.props === "string", "FlexibleAction props must be a string with linktext type")
        actionItem = () => (
          <Text
            color="brand"
            textType="secondaryBody1"
            testID={(testID || "uc-lib.flex-row") + ".action.text"}
            text={action.props}
          />
        )
        break
      case "switch":
        const castedProps: ToggleProps = { ...(action.props as ToggleProps) }
        actionItem = () => <Toggle {...castedProps} testID="redibs-ucl.flex-row.action.toggle" />
        break
    }
    return actionItem()
  }
  const renderLeftIconOrAction = () => {
    return (
      <>
        {props.leftIcon ? (
          <View
            style={styles.leftIconColumn}
            testID="redibs-ucl.flex-row.left-action"
            accessibilityLabel="redibs-ucl.flex-row.left-action"
          >
            <SVG
              tint={props.iconTint || "primary"}
              localSVG={{
                SVG: props.leftIcon.SVG,
                size: { width: 24, height: 24 },
              }}
            />
          </View>
        ) : props.leftAction ? (
          <View
            style={styles.leftActionColumn}
            testID="redibs-ucl.flex-row.left-action"
            accessibilityLabel="redibs-ucl.flex-row.left-action"
          >
            {renderAction(props.leftAction)}
          </View>
        ) : null}
      </>
    )
  }
  const renderRightNotificationText = () => {
    return (
      <>
        {props.rightNotification ? (
          <View style={styles.rightIconNotificationText}>
            <Text
              color="error"
              textType="tertiaryBody1"
              testID="redibs-ucl.flex-row.right-notification.text"
              text={props.rightNotification}
            />
          </View>
        ) : null}
      </>
    )
  }
  const renderRightIconOrAction = () => {
    return (
      <>
        {props.rightIcon ? (
          <RightIcon />
        ) : props.rightAction ? (
          <View
            style={styles.rightActionColumn}
            testID="redibs-ucl.flex-row.right-action"
            accessibilityLabel="redibs-ucl.flex-row.right-action"
          >
            {renderAction(props.rightAction)}
          </View>
        ) : null}
      </>
    )
  }
  const renderRightArrow = () => {
    const showArrow = !props.rightArrowHidden && props.clickAction !== undefined
    return (
      <>
        {showArrow ? (
          <View
            style={styles.rightIconColumn}
            testID="redibs-ucl.flex-row.right-arrow"
            accessibilityLabel="redibs-ucl.flex-row.right-arrow"
          >
            <SVG tint="hint" localSVG={ActionRightChevron} />
          </View>
        ) : null}
      </>
    )
  }
  const RightIcon = () => {
    const nobadge = (
      <View
        style={styles.rightIconColumn}
        testID="redibs-ucl.flex-row.right-action"
        accessibilityLabel="redibs-ucl.flex-row.right-action"
      >
        {props.rightIcon ? <SVG tint={props.iconTint || "primary"} localSVG={props.rightIcon} /> : null}
      </View>
    )
    const badge = (
      <View
        style={styles.rightIconColumn}
        testID="redibs-ucl.flex-row.right-action"
        accessibilityLabel="redibs-ucl.flex-row.right-action"
      >
        {props.rightIcon ? (
          <View
            testID="redibs-ucl.flex-row.right-action.badge"
            accessibilityLabel={"uc-lib.flex-row.right-action.badge"}
          >
            <View style={styles.rightIconNotificationBadge} />
            <SVG tint={props.iconTint || "primary"} localSVG={props.rightIcon} />
          </View>
        ) : null}
      </View>
    )
    return props.rightNotification ? badge : nobadge
  }
  const FlexContainer = props.clickAction ? TouchableOpacity : TouchableWithoutFeedback
  return (
    <FlexContainer
      style={styles.flex}
      onPress={props.clickAction}
      testID={testID || "uc-lib.flexible-row"}
      accessibilityLabel={testID || "uc-lib.flexible-row"}
    >
      <View style={styles.container}>
        {renderLeftIconOrAction()}
        <View style={styles.mainContentColumn}>
          {renderFlexibleMainRows()}
          {renderSubContent()}
        </View>
        {renderRightNotificationText()}
        {renderRightIconOrAction()}
        {renderRightArrow()}
      </View>
    </FlexContainer>
  )
})
