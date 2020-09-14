import React, { FC } from "react"
import { Screen, ModalCardProps, ModalCardHost } from "../../widgets"
import { Button, Text, Spacer, Margin, SVG, HomeImage1, Stack, Border, Background } from "uc-lib"
import { translate } from "shared-lib"
import { Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator/navigableroute"
import { BlurView } from "@react-native-community/blur"

const ModalContent: FC = () => {
  const buttonClick = () => {
    Navigation.navigateToRoute(NavigableRoute.PortfolioStack)
  }

  return (
    <Stack direction={"column"} crossAxisDistribution={"center"}>
      <Margin marginStep={1}>
        <Border hidden={false} color={"limestone"} cornerRadius="small">
          <Background type="alwaysLight" isOverlay={true} />
          <Margin marginStep={8} marginLeftStep={4} marginRightStep={4}>
            <Stack direction={"column"} crossAxisDistribution={"center"}>
              <SVG localSVG={HomeImage1} />
              <Spacer direction="column" sizeStep={4} />
              <Margin marginStep={4} marginLeftStep={4} marginRightStep={4} direction="column">
                <Text
                  textType="headline4"
                  textAlign="center"
                  text={translate("dashboard-stack.dashboard-screen.dashboard-almost-ready")}
                />

                <Spacer direction="column" sizeStep={4} />
                <Text
                  textType="primaryBody2"
                  textAlign="center"
                  text={translate("dashboard-stack.dashboard-screen.dashboard-modal-message")}
                />

                <Spacer direction="column" sizeStep={8} />
                <Button
                  onClick={buttonClick}
                  title={translate("dashboard-stack.dashboard-screen.goto-portolio")}
                  buttonType="primary"
                  buttonSize="large"
                />
              </Margin>
            </Stack>
          </Margin>
        </Border>
      </Margin>
    </Stack>
  )
}

export const DashboardReadyModal: FC = () => {
  const modalProps: ModalCardProps = {
    content: () => <ModalContent />,
    initialSnap: 1,
    snapPoints: [0, "70%"],
    leftButtonType: "none",
    collapseOnOutsidePress: true,
  }

  return (
    <BlurView
      blurType={"light"}
      blurAmount={5}
      reducedTransparencyFallbackColor={"white"}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <ModalCardHost modalProps={modalProps} />
    </BlurView>
  )
}
