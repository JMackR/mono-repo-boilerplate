import React from "react"
import { Border } from "../../controls/layout/border"
import { ActivityIndicator } from "../../controls/activity-indicator"
import { Text } from "../../controls/text"
import { Background } from "../../controls/background"
import { Margin } from "../../controls/layout/margin"
import { Center, Spacer, SVG, LocalSVGSource } from "../../controls"
import { CheckIcon } from "../../assets"
import { LoadingState } from "../../hooks/loading"

enum Margins {
  Base = 4,
  VerticleForNoText = 9,
}

const DIALOG_WIDTH = 160
const CHECK_ICON: LocalSVGSource = {
  SVG: CheckIcon.SVG,
  size: {
    width: 48,
    height: 48,
  },
}

interface SpinnerContentsProps {
  loadingState: LoadingState
  displayMessage?: string
}

export const SpinnerContents = (props: SpinnerContentsProps) => {
  const { loadingState, displayMessage } = props

  const marginTopBottom = !!displayMessage ? undefined : Margins.VerticleForNoText

  return (
    <>
      <Background type="overlay" />
      <Center>
        <Border width={DIALOG_WIDTH} direction="column" lineWeight="none" cornerRadius="large">
          <Background type="primary" />
          <Margin
            direction="column"
            axisDistribution="center"
            crossAxisDistribution="center"
            marginStep={Margins.Base}
            marginTopStep={marginTopBottom}
            marginBottomStep={marginTopBottom}
          >
            {loadingState === LoadingState.Successful && <SVG localSVG={CHECK_ICON} tint="brand" />}
            {loadingState === LoadingState.Loading && <ActivityIndicator size="large" />}
            {!!displayMessage && <Spacer direction="column" sizeStep={Margins.Base} />}
            {!!displayMessage && (
              <Text textType="headline3" color="primary" textAlign="center">
                {displayMessage}
              </Text>
            )}
          </Margin>
        </Border>
      </Center>
    </>
  )
}
