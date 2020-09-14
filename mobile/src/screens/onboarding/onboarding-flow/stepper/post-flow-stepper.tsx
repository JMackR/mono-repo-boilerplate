import React from "react"
import { View, StyleProp, ViewStyle } from "react-native"
import { useColorsForTextColorsCollection, Stack, Text, Flex, TextColors } from "uc-lib"

export interface OnboardFlowStepperProps {
  steps: OnboardFlowStep[]
  progress: number
}

export interface OnboardFlowStep {
  text?: string
}

const STEPPER_SEPARATION = 1
const STEPPER_BASE_STYLES: StyleProp<ViewStyle> = {
  flexGrow: 1,
  height: 4,
  borderRadius: 2,
}

export const OnboardingFlowStepper: React.FC<OnboardFlowStepperProps> = ({ steps, progress }) => {
  const [completedStepColor, uncompletedStepColor] = useColorsForTextColorsCollection(["brand", "hint"])

  return (
    <Stack direction="row" childSeparationStep={STEPPER_SEPARATION}>
      {steps.map((step, index) => {
        const stepHasBeenReached = index <= progress
        const stepColor = stepHasBeenReached ? completedStepColor : uncompletedStepColor
        const textTint: keyof TextColors = stepHasBeenReached ? "brand" : "hint"
        const stepperStyles: StyleProp<ViewStyle> = {
          ...STEPPER_BASE_STYLES,
          backgroundColor: stepColor,
        }
        return (
          <Stack key={index} direction="column" grow={1} childSeparationStep={STEPPER_SEPARATION}>
            <View style={stepperStyles} />
            {!!step.text && (
              <Flex width="100%" axisDistribution="center">
                <Text
                  textAlign="center"
                  textType="tertiaryBody1"
                  color={textTint}
                  testID={"onboarding-flow.stepper." + index}
                  text={step.text}
                />
              </Flex>
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}
