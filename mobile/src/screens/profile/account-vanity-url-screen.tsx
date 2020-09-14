import _ from "lodash"
import React, { useEffect, useState, useContext } from "react"
import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Subject } from "rxjs"
import { debounceTime, switchMap } from "rxjs/operators"
import {
  ACCNT_REGISTER_VANITY_URL_MUTATION,
  ACCNT_VANITY_URL_CHECK_QUERY,
  ACCNT_VANITY_URL_QUERY,
  translate,
  ACCNT_VANITY_MERCHANT_URL_CHECK_QUERY,
  Query,
  AccountScreenNames,
  AccountAnalyticsController,
  AccountSettingsScreenElement,
  AccountDataContext,
} from "shared-lib"
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks"
import { Share } from "shared-lib/utilities/share/share.native"
import {
  NAVIGATION_BAR_HEIGHT,
  Background,
  Button,
  Flex,
  Input,
  Margin,
  MessageSentSuccess,
  NavigationBar,
  ProfileShareVanityUrlGraphic,
  ScrollView,
  Spacer,
  SpacerFlex,
  Stack,
  SVG,
  Text,
  MaxLengthValidator,
  MinLengthValidator,
  useValidated,
  VanityUrlValidator,
} from "uc-lib"
import { AccountLoadingScreen } from "uc-lib/widgets/account/account-loading-screen"
import { AffirmRejectDialogScreenProps } from "../onboarding/dialog"
import { Navigation } from "../../navigation/navigation"
import { NavigableRoute } from "../../navigation/navigator/navigableroute"
import { CommonNavs } from "../../navigation/navigation"
import { getNavigationBackButton } from "../../navigation/common"
import { useSettingsWebViewLinks } from "../../providers/settings-provider"
import {
  KeyboardAvoidanceOverlayContainer,
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceView,
} from "../../keyboardavoidance"
import { Screen } from "../../widgets"

/**
 * Controls how long the debouncer should wait before asking the server if a URL is available
 */
const SERVER_QUERY_REFRESH_INTERVAL_MS = 300
const MIN_CHARACTERS_ALLOWED = 3
const MAX_CHARACTERS_ALLOWED = 30

export const AccountVanityUrlScreen = () => {
  const { data: accountData } = useContext(AccountDataContext)

  /**
   * Lazy query for refreshing whether you have a vanity url
   */
  const {
    refetch: refetchAccountVanityUrl,
    called: loadingVanityUrlCalled,
    loading: loadingVanityUrl,
    error,
    data,
  } = useQuery(ACCNT_VANITY_URL_QUERY, {
    variables: { userId: _.toInteger(accountData?.id) },
  })

  useEffect(() => {
    AccountAnalyticsController.trackUserSetVanityUrlElementShow(AccountSettingsScreenElement.Back)
  }, [])

  const isSmallBusiness = accountData?.account?.identityAttributes?.isSmallBusiness || false

  const getShouldShowLoadingScreen = () => {
    return loadingVanityUrl || !loadingVanityUrlCalled
  }

  const vanityUrlExists = () => {
    return data && data.vanityUrl
  }

  const getScreenTitle = () => {
    if (getShouldShowLoadingScreen()) {
      return ""
    } else if (vanityUrlExists()) {
      return translate("profile-stack.vanity-url-screen.title-share-vanity-url")
    } else {
      return translate("profile-stack.vanity-url-screen.title-create-vanity-url")
    }
  }

  const onLeftItemClick = () => {
    AccountAnalyticsController.trackUserSetVanityUrlElementClick(AccountSettingsScreenElement.Back)
  }

  return (
    <Screen safeAreaMode={"top"} screenName={AccountScreenNames.MyAccountSettingsCustomProfile}>
      <Flex direction="column" grow={0} height={NAVIGATION_BAR_HEIGHT}>
        <NavigationBar
          leftItems={[getNavigationBackButton("vanity-url-screen.navigation-bar", onLeftItemClick)]}
          title={getScreenTitle()}
          testID="vanity-url-screen.navigation-bar"
        />
      </Flex>
      {getShouldShowLoadingScreen() ? (
        <AccountLoadingScreen />
      ) : vanityUrlExists() ? (
        <VanityUrlShare url={data.vanityUrl.url} />
      ) : (
        <VanityUrlSetup isSmallBusiness={isSmallBusiness} refresh={refetchAccountVanityUrl} />
      )}
    </Screen>
  )
}

const VanityUrlShare = ({ url }: { url: string }) => {
  const share = () => {
    Share.share(
      {
        title: translate("profile-stack.vanity-url-screen.share-url-action-title"),
        url,
      },
      { skipUrlMutation: true },
    )
  }

  return (
    <Margin marginStep={4} grow={1}>
      <Stack direction="column" grow={1}>
        <Stack
          direction="column"
          childSeparationStep={8}
          crossAxisDistribution={"center"}
          axisDistribution="center"
          grow={3}
        >
          <SVG localSVG={ProfileShareVanityUrlGraphic} />
          <Text textType={"primaryBody1"} textAlign={"center"}>
            {translate("profile-stack.vanity-url-screen.share-screen-message")}
          </Text>
          <Text textType={"primaryBody2"} textAlign={"center"}>
            {translate("profile-stack.vanity-url-screen.share-screen-message-subtext")}
          </Text>
        </Stack>
        <SpacerFlex />
        <Stack direction="column" childSeparationStep={12}>
          <Text textType={"secondaryBody1"} textAlign={"center"}>
            {url}
          </Text>
          <Button
            onClick={share}
            buttonSize="large"
            buttonType="primary"
            title={translate("profile-stack.vanity-url-screen.share-button-title")}
          />
        </Stack>
      </Stack>
    </Margin>
  )
}

const useCheckVanityUrlAvailable = () => {
  const [loading, setLoading] = useState(false)

  /**
   * Lazy query to check whether a url is available
   */
  const [checkQuery, { called, loading: accountQueryLoading, data }] = useLazyQuery<Query>(ACCNT_VANITY_URL_CHECK_QUERY)
  /**
   * Lazy query to check whether a url is available
   */
  const [
    checkMerchantQuery,
    { called: merchantCalled, loading: accountMerchantQueryLoading, data: merchantData },
  ] = useLazyQuery<Query>(ACCNT_VANITY_MERCHANT_URL_CHECK_QUERY)

  /**
   * Helper to determine whether a url is available based on state
   */
  const urlAvailable = () => {
    return !accountQueryLoading && called && data && data.vanityUrlCheck.available
  }

  /**
   * Helper to determine whether a url is available based on state
   */
  const merchantUrlAvailable = () => {
    return !accountMerchantQueryLoading && merchantCalled && merchantData && merchantData.vanityUrlCheck.available
  }

  const checkUrl = async (url: string) => {
    setLoading(true)

    // check user urls
    await checkQuery({ variables: { url } })
    if (!urlAvailable) {
      setLoading(false)
      return false
    }

    // check merchant URLs
    await checkMerchantQuery({ variables: { url } })
    if (!merchantUrlAvailable) {
      setLoading(false)
      return false
    }

    // we are ok
    setLoading(false)
    return true
  }

  return { checkUrl, loading }
}

const VanityUrlSetup = ({ isSmallBusiness, refresh }: { isSmallBusiness: boolean; refresh: () => void }) => {
  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)
  const [urlAvailable, setUrlAvailable] = useState<boolean | undefined>(undefined)
  const [mutationError, setMutationError] = useState<string | undefined>(undefined)
  const prefix = translate("profile-stack.vanity-url-screen.url-prefix")

  const { checkUrl } = useCheckVanityUrlAvailable()

  const [value$] = useState(new Subject<string>())
  const [link, setLink] = useState("")

  useEffect(() => {
    value$.subscribe(val => setLink(val))
    AccountAnalyticsController.trackUserSetVanityUrlElementShow(AccountSettingsScreenElement.Save)
  }, [])

  /**
   * Validators for the input field.
   * 3 char minimum
   * 30 char maximum
   * No special chars
   */
  const { error: vanityUrlValidatorError, validate } = useValidated(
    [MinLengthValidator(MIN_CHARACTERS_ALLOWED), MaxLengthValidator(MAX_CHARACTERS_ALLOWED), VanityUrlValidator],
    undefined,
  )

  /**
   * What Icon to show on the right side of the input field
   */
  const trailingIcon = () => {
    if (link && !loading && !vanityUrlValidatorError) {
      return urlAvailable ? MessageSentSuccess : undefined
    }
    return undefined
  }

  /**
   * Helper to determine what error to show on the input field
   */
  const deriveError = () => {
    if (mutationError) {
      return translate("profile-stack.vanity-url-screen.error-msg-invalid-input")
    }
    if (vanityUrlValidatorError) {
      return vanityUrlValidatorError
    }
    if (!loading && urlAvailable === false) {
      return translate("profile-stack.vanity-url-screen.error-msg-name-unavailable")
    }
    return undefined
  }

  /**
   * Debouncer to handle text input on the field. Only query the server every X milliseconds
   */
  useEffect(() => {
    value$.pipe(debounceTime(SERVER_QUERY_REFRESH_INTERVAL_MS), switchMap(checkValue)).subscribe()
  }, [value$])

  const checkValue = async (value: string) => {
    if (value) {
      setLoading(true)
      await validate(value)
      if (!vanityUrlValidatorError) {
        setUrlAvailable(await checkUrl(value))
      }
      setLoading(false)
    }
  }

  const onChange = async (text?: string) => {
    if (!text) {
      setLoading(false)
    }
    if (text && !vanityUrlValidatorError) {
      // clear loading states
      setLoading(true)
    }
    // clears server errors when searching for a new vanity name
    setMutationError(undefined)

    // replaces a whitespace with hyphen
    if (text && text.charAt(text.length - 1) === " ") {
      text = text?.trimRight()
      text += "-"
    }

    value$.next(text)
  }

  const handleVanityUrlButtonClick = async () => {
    const props: AffirmRejectDialogScreenProps = {
      onAffirm: () => {
        registerVanityLink()
      },
      onReject: () => {},
      affirmText: translate("common-actions.continue"),
      rejectText: translate("common-actions.cancel"),
      title: translate("profile-stack.vanity-url-screen.create-url-modal-are-ysure"),
      body: translate("profile-stack.vanity-url-screen.create-url-modal-warning"),
    }
    Navigation.performWhenAvailable(() => {
      Navigation.navigateToRoute(NavigableRoute.AffirmRejectDialog, props)
    })
  }

  const [registerVanityUrlMutation] = useMutation(ACCNT_REGISTER_VANITY_URL_MUTATION)

  const registerVanityLink = async () => {
    const typeId = isSmallBusiness ? "SMALL_BUSINESS" : "USER"

    try {
      await registerVanityUrlMutation({
        variables: {
          url: link,
          linkType: typeId,
        },
      })
      AccountAnalyticsController.trackUserSetVanityUrlElementClick(AccountSettingsScreenElement.Save)
      refresh()
    } catch (err) {
      if (err instanceof Error) {
        setMutationError(err.message)
      }
    }
  }

  return (
    <Margin marginStep={4} grow={1} direction="column">
      <Stack direction="column" grow={1}>
        <ScrollView>
          <KeyboardAvoidanceRollawayContainer direction="row" grow={1}>
            <Stack direction="column">
              <KeyboardAvoidanceView stackOrder={1}>
                <Input
                  prefixText={prefix}
                  title={translate("profile-stack.vanity-url-screen.create-url-input-title")}
                  text={link}
                  keyboardType="default"
                  error={deriveError()}
                  loading={loading}
                  textChangeHandler={onChange}
                  hint={translate("profile-stack.vanity-url-screen.create-url-input-hint")}
                  trailingIcon={trailingIcon()}
                />
              </KeyboardAvoidanceView>
              <Spacer direction="column" sizeStep={4} />
              <BottomAttributionText />
            </Stack>
          </KeyboardAvoidanceRollawayContainer>
        </ScrollView>
      </Stack>
      <KeyboardAvoidanceOverlayContainer absoluteBottom={insets.bottom} grow={0} direction="row">
        <KeyboardAvoidanceView stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
          <Margin marginStep={4} direction="column" grow={1}>
            <Stack direction="column" childSeparationStep={4}>
              <Background />
              <Button
                onClick={handleVanityUrlButtonClick}
                buttonSize="large"
                buttonType={urlAvailable ? "primary" : "disabled"}
                title={translate("profile-stack.vanity-url-screen.create-url-button-title")}
              />
            </Stack>
          </Margin>
        </KeyboardAvoidanceView>
      </KeyboardAvoidanceOverlayContainer>
    </Margin>
  )
}

const BottomAttributionText: React.FC = () => {
  const webViewLinks = useSettingsWebViewLinks()

  useEffect(() => {
    AccountAnalyticsController.trackUserSetVanityUrlElementShow(AccountSettingsScreenElement.TermsOfService)
  }, [])

  const styles = StyleSheet.create({
    bottomAttributionText: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  })

  const openTOS = () => {
    AccountAnalyticsController.trackUserSetVanityUrlElementClick(AccountSettingsScreenElement.TermsOfService)
    CommonNavs.presentWebView(webViewLinks.redibsTerms, translate("auth.terms"))
  }

  return (
    <View style={styles.bottomAttributionText}>
      <Text>
        <Text color="secondary" textType="tertiaryBody2">
          {translate("profile-stack.vanity-url-screen.create-url-terms-of-service-info")}
        </Text>
        <Text color="brand" textType="tertiaryBody2" onPress={openTOS}>
          {translate("auth.terms")}
        </Text>
      </Text>
    </View>
  )
}
