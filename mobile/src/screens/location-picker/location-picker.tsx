import React, { useState, FC, useEffect } from "react"
import {
  Margin,
  Spacer,
  Stack,
  Flex,
  Text,
  Button,
  Input,
  LocationPinFill,
  ErrorBorder,
  Background,
  SpacerFlex,
} from "uc-lib"
import { Navigation, CommonNavs } from "../../navigation/navigation"
import { translate, CheckResult, AnalyticsDebug, LocationProvider, GeocodingProvider, Exception } from "shared-lib"
import { PermissionHelper } from "../../permissions/permission-helper"
import { Permission } from "shared-lib/utilities/permission/permission"
import { Screen, ModalCardProps, ModalCardHost } from "../../widgets"
import { ScreenRoute } from "../../navigation/route"
import { NavigatorParamList, NavigableRoute } from "../../navigation/navigator"
import { LocationDetails, hasFullLocationDetails } from "shared-lib"
import {
  KeyboardAvoidanceView,
  KeyboardAvoidanceRollawayContainer,
  KeyboardAvoidanceOverlayContainer,
} from "../../keyboardavoidance"

const ZIPCODE_INPUT_WIDTH = `50%`
const ZIPCODE_CHARACTER_LENGTH = 5

export enum LocationPickerType {
  Search,
  FirstSearch,
  Onboarding,
  User,
  Meetup,
}

export interface LocationPickerScreenProps {
  testID?: string
  pickerType: LocationPickerType
  screenName: string
  resultCallback: (locationDetails: LocationDetails) => void
  prefillLocationDetails?: LocationDetails
  changeCallback?: (locationDetails: LocationDetails) => void
  onGetMyLocationClick?: () => void
  onZipCodeInputDidEnd?: (zip: string) => void
  onSaveLocationClick?: (success?: boolean) => void
  onFocusZipCodeTextInput?: () => void
  isFTUE?: boolean
  onLocationPickerShow?: () => void
  onPermissionsShow?: () => void
  onLocationPermissionEnableClick?: (success?: boolean) => void
  onLocationPermissionNotNowClick?: () => void
  onNavigationBarRightButtonClick?: () => void
}

export const LocationPickerModalContent: FC<LocationPickerScreenProps> = (props) => {
  const {
    pickerType,
    screenName,
    resultCallback,
    prefillLocationDetails,
    onLocationPickerShow,
    onGetMyLocationClick,
    onSaveLocationClick,
    onZipCodeInputDidEnd,
    onFocusZipCodeTextInput,
    onLocationPermissionEnableClick,
    onLocationPermissionNotNowClick,
    onPermissionsShow,
    testID,
  } = props

  useEffect(() => {
    onLocationPickerShow && onLocationPickerShow()
  }, [])

  const [selectedLocation, setSelectedLocation] = useState<LocationDetails>(prefillLocationDetails || {})
  const [errorText, setErrorText] = useState<string>()
  const handleGetMyLocationPressed = () => {
    setErrorText(undefined)
    onGetMyLocationClick && onGetMyLocationClick()

    // For analytics, doing it here is easier than passing things to the actual dialog
    onPermissionsShow && onPermissionsShow()

    const permissionType = permissionTypeForPickerType(pickerType)
    PermissionHelper.checkAndRequestPermission(permissionType)
      .then((r) => {
        if (r === CheckResult.GRANTED) {
          LocationProvider.getCurrentLocation(
            (locationDetails) => {
              onLocationPermissionEnableClick && onLocationPermissionEnableClick(true)
              setSelectedLocation({
                ...locationDetails,
                didUseGPS: true,
              })
            },
            (error) => {
              onLocationPermissionEnableClick && onLocationPermissionEnableClick(false)
              handleLocationError(error)
            },
          )
        } else {
          onLocationPermissionNotNowClick && onLocationPermissionNotNowClick()
        }
      })
      .catch((err) => {
        AnalyticsDebug.logLocationError({ name: "Permission Handler Error", message: err.message })
      })
  }

  const handleFocusZipCodeTextInput = () => {
    onFocusZipCodeTextInput && onFocusZipCodeTextInput()
  }

  const zipcodeTextChangeFunc = (text?: string) => {
    setErrorText(undefined)
    setSelectedLocation({
      zipcode: text,
    })
  }

  const handleZipcodeDidEndEditing = (zip: string) => {
    onZipCodeInputDidEnd && onZipCodeInputDidEnd(zip)
  }

  const hasZipcodeEntered = selectedLocation.zipcode && selectedLocation.zipcode.length === ZIPCODE_CHARACTER_LENGTH
  const handleSaveLocationPressed = async () => {
    const missingFullLocationObject = !hasFullLocationDetails(selectedLocation)
    if (missingFullLocationObject) {
      if (hasZipcodeEntered) {
        reverseGeocodeCurrentZipcodeOnSave()
      } else {
        setErrorText(translate("location-picker.zipcode-required"))
        onSaveLocationClick && onSaveLocationClick(false)
      }
    } else {
      handleSuccessfulSaveLocation(selectedLocation)
    }
  }

  const reverseGeocodeCurrentZipcodeOnSave = () => {
    GeocodingProvider.geocodeZipcode(
      selectedLocation.zipcode!,
      (locationDetails) => {
        handleSuccessfulSaveLocation(locationDetails)
      },
      () => {
        setErrorText(translate("location-picker.invalid-zipcode"))
        onSaveLocationClick && onSaveLocationClick(false)
      },
    )
  }

  const handleSuccessfulSaveLocation = (location: LocationDetails) => {
    onSaveLocationClick && onSaveLocationClick(true)
    resultCallback(location)
    Navigation.goBack()
  }

  const handleLocationError = (error: Exception) => {
    CommonNavs.presentError({ ouException: error })
  }

  const localtestID = testID || "location-picker"
  const locationQuestion = locationQuestionTextForType(pickerType)
  const locationButtonTitle = translate("location-picker.get-my-location")
  const zipcodePlaceholderText = translate("location-picker.zipcode-placeholder")
  const saveLocationButtonTitle = translate("location-picker.save-location")
  const locationPickerOr = translate("location-picker.or")

  return (
    <Screen safeAreaMode={"all"} screenName={screenName}>
      <KeyboardAvoidanceRollawayContainer>
        <Stack direction="column" childSeparationStep={4} width="100%" crossAxisDistribution="center">
          <Text textAlign="center" testID={localtestID + ".question"}>
            {locationQuestion}
          </Text>
          <ErrorBorder
            errorText={errorText}
            direction="column"
            width={ZIPCODE_INPUT_WIDTH}
            testID={localtestID + ".zipcode"}
          >
            <Stack direction="column" childSeparationStep={4}>
              <Flex direction="column" crossAxisDistribution="stretch">
                <Button
                  buttonType="secondary"
                  buttonSize="large"
                  icon={LocationPinFill}
                  title={locationButtonTitle}
                  onClick={handleGetMyLocationPressed}
                  testID={localtestID + ".get-my-location"}
                />
              </Flex>
              <Stack direction={"column"}>
                <Text textAlign="center">{locationPickerOr}</Text>
              </Stack>

              <KeyboardAvoidanceView
                direction="column"
                axisDistribution="center"
                crossAxisDistribution="center"
                stackOrder={1}
              >
                <Input
                  textAlign="center"
                  focusState="unfocused"
                  hint={zipcodePlaceholderText}
                  inputCharLimit={ZIPCODE_CHARACTER_LENGTH}
                  keyboardType="number-pad"
                  endEditingHandler={handleZipcodeDidEndEditing}
                  textChangeHandler={zipcodeTextChangeFunc}
                  focusHandler={handleFocusZipCodeTextInput}
                  text={selectedLocation.zipcode}
                  testID={localtestID + ".zipcode"}
                />
              </KeyboardAvoidanceView>
            </Stack>
          </ErrorBorder>
          <Text textAlign="center">{selectedLocation.locationName}</Text>
        </Stack>
      </KeyboardAvoidanceRollawayContainer>
      <SpacerFlex />
      <KeyboardAvoidanceOverlayContainer shrink={0} absoluteBottom={0}>
        <KeyboardAvoidanceView shrink={0} stackOrder={0} activeInGroups={[]} direction="column" grow={1}>
          <Background />
          <Margin direction="column" crossAxisDistribution="stretch" grow={1} marginStep={4}>
            <Button
              buttonType={hasZipcodeEntered ? "primary" : "disabled"}
              buttonSize="large"
              title={saveLocationButtonTitle}
              onClick={handleSaveLocationPressed}
              testID={localtestID + ".save"}
            />
          </Margin>
        </KeyboardAvoidanceView>
      </KeyboardAvoidanceOverlayContainer>
    </Screen>
  )
}

export const LocationPicker: FC<ScreenRoute<NavigatorParamList, NavigableRoute.LocationPicker>> = ({ route }) => {
  const {
    pickerType,
    resultCallback,
    prefillLocationDetails,
    onNavigationBarRightButtonClick,
    testID,
    ...rest
  } = route.params.props
  const modalTitle =
    pickerType === LocationPickerType.Search || pickerType === LocationPickerType.FirstSearch
      ? translate("location-picker.zipcode-title")
      : translate("location-picker.page-name")
  const leftButtonType = pickerType === LocationPickerType.Search ? "back" : "none"
  const rightButtonText = pickerType === LocationPickerType.Search ? "" : translate("location-picker.cancel")
  const localTestID = testID || "location-picker"

  const handleNavigationBarRightButtonClicked = () => {
    onNavigationBarRightButtonClick && onNavigationBarRightButtonClick()
    if (pickerType !== LocationPickerType.Search) {
      Navigation.goBack()
    }
  }

  const modalProps: ModalCardProps = {
    content: () => (
      <LocationPickerModalContent
        pickerType={pickerType}
        resultCallback={resultCallback}
        prefillLocationDetails={prefillLocationDetails}
        testID={localTestID}
        {...rest}
      />
    ),
    initialSnap: 1,
    leftButtonType,
    snapPoints: [0, "90%"],
    disableDefaultNavigationBar: false,
    title: modalTitle,
    rightButtonText,
    onRightButtonOnClick: handleNavigationBarRightButtonClicked,
    testID: localTestID,
  }

  return <ModalCardHost modalProps={modalProps} />
}

const permissionTypeForPickerType = (type: LocationPickerType): Permission => {
  switch (type) {
    case LocationPickerType.Onboarding:
      return Permission.LocationOnboarding
    case LocationPickerType.User:
      return Permission.LocationUser
    case LocationPickerType.Meetup:
      return Permission.LocationMeetup
    case LocationPickerType.Search:
    case LocationPickerType.FirstSearch:
    default:
      return Permission.LocationSearch
  }
}

const locationQuestionTextForType = (type: LocationPickerType): string | undefined => {
  switch (type) {
    case LocationPickerType.Onboarding:
      return translate("location-picker.where-are-yposting")
    case LocationPickerType.User:
      return translate("location-picker.what-is-your-location")
    case LocationPickerType.Search:
    case LocationPickerType.FirstSearch:
    case LocationPickerType.Meetup:
    default:
      return translate("location-picker.where-are-ysearching")
  }
}
