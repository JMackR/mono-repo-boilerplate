import { ScreenRouteAndStackNavigation } from "../../../navigation/route"
import React from "react"
import { NavigableRoute, NavigatorParamList } from "../../../navigation/navigator"
import { translate } from "shared-lib/utilities/i18n"
import { useMutation, useQuery } from "@apollo/react-hooks"
import {
  Flex,
  NavigationBar,
  NAVIGATION_BAR_HEIGHT,
  List,
  Button,
  ActivityIndicator,
  SelectableRowProps,
  SelectableRow,
  Margin,
} from "uc-lib"
import { Screen } from "../../../widgets"
import { property } from "lodash"
import { SelectableContextProvider } from "uc-lib/hooks"
import { CommonNavs } from "../../../navigation/navigation"
import { getNavigationCloseButton } from "../../../navigation/common"

export enum NotificationPreferenceType {
  Email,
  Push,
}

export const NotificationPreferencesScreen: React.FC<ScreenRouteAndStackNavigation<
  NavigatorParamList,
  NavigableRoute.NotificationPreferences
>> = ({ navigation, route }) => {
  const { notificationType } = route.params.props

  const { loading: queryLoading, data } = useQuery<Query>(
    notificationType === NotificationPreferenceType.Email ? EMAIL_PREFERENCES_QUERY : PUSH_PREFERENCES_QUERY,
    { fetchPolicy: "no-cache" },
  )
  const [notificationPreferenceMutation, { loading: mutationLoading }] = useMutation(
    notificationType === NotificationPreferenceType.Email ? EMAIL_PREFERENCES_MUTATION : PUSH_PREFERENCES_MUTATION,
  )

  const getTitle = () => {
    return translate(
      notificationType === NotificationPreferenceType.Email
        ? "profile-stack.notification-preferences.email"
        : "profile-stack.notification-preferences.push",
    )
  }

  const onSave = async () => {
    const oldPrefs = data?.notificationPreferences.preferences || []

    const newPreferences: NotificationPreference[] = oldPrefs.map((preference: NotificationPreference) => {
      const pref: NotificationPreference = {
        type: preference.type,
        enabled: preference.enabled,
        displayString: preference.displayString,
      }
      return pref
    })

    const newVersion = data?.notificationPreferences.version
    try {
      await notificationPreferenceMutation({
        variables: {
          preferences: newPreferences,
          version: newVersion,
        },
      })

      navigation.pop()
    } catch (err) {
      CommonNavs.presentError(err)
    }
  }

  return (
    <Screen safeAreaMode={"all"}>
      <Flex direction="column" grow={0} height={NAVIGATION_BAR_HEIGHT}>
        <NavigationBar
          title={getTitle()}
          leftItems={[getNavigationCloseButton("notification-preferences.navigation-bar")]}
          testID="notification-preferences.navigation-bar"
        />
      </Flex>
      <Flex direction="column" grow={1}>
        {renderContentView(queryLoading, property("notificationPreferences.preferences")(data) as [NotificationPreference])}
      </Flex>
      <Margin direction="column" grow={0} marginStep={4}>
        <Button
          buttonSize="large"
          buttonType={queryLoading || mutationLoading ? "disabled" : "primary"}
          title={translate("profile-stack.notification-preferences.save")}
          onClick={onSave}
        />
      </Margin>
    </Screen>
  )
}

const renderContentView = (loading: boolean, preferences: [NotificationPreference]) => {
  if (loading) {
    return <ActivityIndicator />
  }

  const preselected: string[] = []
  preferences.forEach(element => {
    if (element.enabled) {
      preselected.push(element.type)
    }
  })

  return (
    <SelectableContextProvider multiSelect={true} initialSelections={preselected}>
      <List data={preferences} renderItem={renderItem} />
    </SelectableContextProvider>
  )
}

const renderItem = (preference: NotificationPreference) => {
  const props: SelectableRowProps = {
    selectId: preference.type,
    mainContent: preference.displayString,
    onDidSelect: () => {
      preference.enabled = true
    },
    onDidDeselect: () => {
      preference.enabled = false
    },
  }

  return <SelectableRow {...props} />
}
