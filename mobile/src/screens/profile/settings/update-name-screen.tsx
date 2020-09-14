import { ScreenRouteAndStackNavigation } from "mobile/src/navigation/route"
import { NavigableRoute, Navigation, NavigatorParamList } from "mobile/src"
import {
  KeyboardAvoidanceOverlayContainer,
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
} from "mobile/src/keyboardavoidance"
import { ModalCardHost, ModalCardProps, ModalHostContext, Screen } from "mobile/src/widgets"
import { translate, UPDATE_NAME_MUTATION, AccountDataContext } from "shared-lib"
import { useMutation } from "@apollo/react-hooks"
import { AccountAnalyticsController } from "shared-lib/analytics/account/analytics-account"
import { AccountScreenNames, AccountSettingsScreenElement } from "shared-lib/analytics/constants/profile-constants"
import {
  Button,
  Flex,
  Input,
  Margin,
  NavigationBarItem,
  ScrollView,
  Stack,
  TextEntryRef,
  NAVIGATION_BAR_HEIGHT,
  NavigationBar,
  RequiredValidator,
  useValidated,
  MaxLengthValidator,
} from "uc-lib"
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const UpdateNameScreen = props => {
  const name: string = props.route.params.props.name

  const modalProps: ModalCardProps = {
    content: () => <UpdateNameContent currentName={name} />,
    initialSnap: 1,
    snapPoints: [0, "100%"],
    useHeaderRadius: false,
    disableDefaultNavigationBar: true,
    leftButtonType: "none",
    title: translate("profile-stack.update-name.title"),
    testID: "profile-stack.update-name",
  }

  return <ModalCardHost modalProps={modalProps} />
}

export const UpdateNameContent: React.FC<{ currentName: string }> = () => {
  const MAX_NAME_LENGTH = 31 // Based on backend limit
  const { data: accountData, refetch } = useContext(AccountDataContext)

  const [name, setName] = useState<string>(accountData?.profile?.name || "")
  const [updateName] = useMutation(UPDATE_NAME_MUTATION, {
    onCompleted: () => {
      refetch()
    },
  })
  const [errorMessage, setErrorMessage] = useState<string | undefined | null>()
  const [enableButton, setEnableButton] = useState<boolean>(false)
  const { error: nameValidationError, validate } = useValidated([RequiredValidator, MaxLengthValidator(MAX_NAME_LENGTH)])
  const insets = useSafeAreaInsets()
  const nameRef = useRef<TextEntryRef>(null)
  const { collapse } = useContext(ModalHostContext)

  useLayoutEffect(() => {
    setTimeout(() => nameRef.current?.focus(), 300)
  }, [])

  useEffect(() => {
    AccountAnalyticsController.trackUserChangeNameElementShow(AccountSettingsScreenElement.Cancel)
    AccountAnalyticsController.trackUserChangeNameElementShow(AccountSettingsScreenElement.Save)
  }, [])

  useEffect(() => {
    setErrorMessage(nameValidationError)
    setEnableButton(!nameValidationError)
  }, [nameValidationError])

  const cancelNavButton: NavigationBarItem = {
    title: translate("common-actions.cancel"),
    testID: "update-name-screen.navigation-bar.cancel",
    pressHandler: () => {
      collapse()
      AccountAnalyticsController.trackUserChangeNameElementClick(AccountSettingsScreenElement.Cancel)
    },
  }

  const textChangeHandler = (changedText?: string) => {
    setName(changedText || "")
    validate(changedText)
  }

  const handleUpdateName = async () => {
    AccountAnalyticsController.trackUserChangeNameElementClick(AccountSettingsScreenElement.Save)
    setEnableButton(false)
    try {
      await updateName({
        variables: {
          name,
        },
      })
      Navigation.goBack()
    } catch (error) {
      setErrorMessage(error.message)
      setEnableButton(true)
    }
  }

  return (
    <Screen safeAreaMode="none" screenName={AccountScreenNames.MyAccountSettings_Name}>
      <Flex direction="column" grow={0} shrink={0} height={NAVIGATION_BAR_HEIGHT}>
        <NavigationBar
          title={translate("profile-stack.update-name.title")}
          rightItems={[cancelNavButton]}
          testID="update-name-screen.navigation-bar"
        />
      </Flex>
      <ScrollView onlyScrollsWhenNeeded={true}>
        <KeyboardAvoidanceRollawayContainer direction="row" grow={1}>
          <Flex direction="column" crossAxisDistribution="center" grow={1}>
            <Margin marginStep={4} grow={1}>
              <KeyboardAvoidanceView stackOrder={1} direction="column" shrink={0} grow={1}>
                <Stack direction="column" childSeparationStep={3} crossAxisDistribution="center" grow={0}>
                  <Flex grow={1} direction="row">
                    <Input
                      ref={nameRef}
                      title={translate("profile-stack.update-name.name")}
                      text={name}
                      keyboardType="default"
                      autoCapitalize="words"
                      textChangeHandler={textChangeHandler}
                      error={errorMessage}
                      testID="update-name-screen"
                    />
                  </Flex>
                </Stack>
              </KeyboardAvoidanceView>
            </Margin>
          </Flex>
        </KeyboardAvoidanceRollawayContainer>
      </ScrollView>
      <KeyboardAvoidanceOverlayContainer grow={0} direction="row" absoluteBottom={insets.bottom}>
        <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
          <Margin marginStep={4} direction="column" grow={1}>
            <Stack direction="column" childSeparationStep={4}>
              <Button
                onClick={handleUpdateName}
                title={translate("common-actions.save")}
                buttonSize="large"
                disabled={!enableButton}
                buttonType={enableButton ? "primary" : "disabled"}
                testID="update-name-screen.save"
              />
            </Stack>
          </Margin>
        </KeyboardAvoidanceView>
      </KeyboardAvoidanceOverlayContainer>
    </Screen>
  )
}
