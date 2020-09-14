import React, { FC } from "react"
import { Screen, ModalCardProps, ModalCardHost } from "../../../widgets"
import { Button, Text, Spacer, Margin } from "uc-lib"
import { translate } from "shared-lib"
import { Navigation } from "../../../navigation/navigation"
import { NavigableRoute } from "../../../navigation/navigator"

const VerifyPhonePromptContent: FC = () => {
  const buttonClick = () => {
    Navigation.navigateToRoute(NavigableRoute.VerifyPhone, { skippable: true })
  }

  return (
    <Screen safeAreaMode="bottom">
      <Margin marginStep={4} direction="column">
        <Text textType="primaryBody2" textAlign="center">
          {translate("profile-stack.verify-phone.prompt-body")}
        </Text>
        <Spacer direction="column" sizeStep={8} />
        <Button onClick={buttonClick} title={translate("common-actions.continue")} buttonType="primary" buttonSize="large" />
      </Margin>
    </Screen>
  )
}

export const VerifyPhonePromptModal: FC = () => {
  const skip = () => {
    Navigation.popRootNavigator()
  }

  const modalProps: ModalCardProps = {
    content: () => <VerifyPhonePromptContent />,
    initialSnap: 1,
    snapPoints: [0, "25%"],
    leftButtonType: "none",
    rightButtonText: translate("common-actions.skip"),
    onRightButtonOnClick: skip,
    collapseOnOutsidePress: true,
    title: translate("profile-stack.verify-phone.title"),
  }

  return <ModalCardHost modalProps={modalProps} />
}
