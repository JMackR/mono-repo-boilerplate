import React from "react"
import { View, StyleSheet } from "react-native"
import { Spacer } from "../spacer"
import { StackProps } from "./stack.d"
import { defaultLayoutContainerProps } from "../container-props"

const Stack: React.FunctionComponent<StackProps> = (props) => {
  const {
    debugColor,
    width,
    height,
    axisDistribution,
    crossAxisDistribution,
    basis,
    grow,
    shrink,
    children,
    direction,
    childSeparationStep,
    testID,
    overflow,
  } = props
  const filteredChildren = React.Children.toArray(children).filter((o) => o)

  const styles = StyleSheet.create({
    stack: {
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: debugColor,
      height,
      width,
      overflow,
    },
  })

  return (
    <View style={styles.stack} testID={testID} accessibilityLabel={testID}>
      {React.Children.map(filteredChildren, (child, i) => {
        const separation = childSeparationStep !== undefined ? childSeparationStep : 0
        const step = i === filteredChildren.length - 1 ? 0 : separation
        if (step > 0) {
          return (
            <>
              {child}
              <Spacer direction={direction} sizeStep={step} />
            </>
          )
        } else {
          return <>{child}</>
        }
      })}
    </View>
  )
}

Stack.defaultProps = {
  ...defaultLayoutContainerProps,
  childSeparationStep: 0,
}

export { Stack }
