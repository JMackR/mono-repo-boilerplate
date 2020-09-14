import {
  AccountScreenElement,
  AccountScreenNames,
  PublicProfileScreenElement,
  AccountSettingsScreenElement,
  AccountEventName,
} from "../constants/profile-constants"
import { AnalyticsElementType } from "../analytics-constants"
import { AnalyticsUIEvent, buildClickEventParams, buildScreenViewEventParams } from "../analytics-common"
import { logEvent } from "../analytics-event-logger"

/**
 * These analytics events are for reporting our biz ops events
 */
export class AccountAnalyticsController {
  /**
   * Account screen click events
   */
  public static trackMyAccountUIEventClick(element: AccountScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AccountScreenNames.MyAccountHomePage, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  /**
   * Account Settings click events
   */
  public static trackMyAccountSettingsUIEventClick(element: AccountSettingsScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AccountScreenNames.MyAccountSettings, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  public static trackMyAccountSettingsUIEventShow(element: AccountSettingsScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildScreenViewEventParams(AccountScreenNames.MyAccountSettings),
      element_name: element,
      element_type: AnalyticsElementType.Button,
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  /**
   * Invite friends modal click events
   */
  public static trackInviteFriendsModalClickEvent(element: AccountScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AccountScreenNames.InviteFriendsPromo, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.Share, params)
  }

  public static trackPublicProfileElementClick(screenName: AccountScreenNames, element: PublicProfileScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(screenName, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.PublicProfile, params)
  }

  public static trackUserClickedItemFromUserProfile(listingId: string) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(
        AccountScreenNames.PublicProfileUser,
        PublicProfileScreenElement.Item,
        AnalyticsElementType.Button,
      ),
      item_id: listingId,
    }
    logEvent(AccountEventName.PublicProfile, params)
  }

  /**
   * When user clicks share profile screen and dialog shows
   */
  public static trackPublicProfileShareDialogueShow(screenName: AccountScreenNames) {
    const params: AnalyticsUIEvent = {
      ...buildScreenViewEventParams(screenName),
      element_name: PublicProfileScreenElement.ShareReportDialogue,
      element_type: AnalyticsElementType.Dialogue,
    }
    logEvent(AccountEventName.Share, params)
  }

  /**
   * When user clicks on share dialog option
   */
  public static trackPublicProfileShareDialogueActionClick(
    element: PublicProfileScreenElement,
    screenName: AccountScreenNames,
  ) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(screenName, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.Share, params)
  }

  /**
   * When user clicks call on dealer public profile SHARE and dialog shows
   */
  public static trackDealerCallDialogueShareShow() {
    const params: AnalyticsUIEvent = {
      ...buildScreenViewEventParams(AccountScreenNames.PublicProfileDealer),
      element_name: PublicProfileScreenElement.ShareReportDialogue,
      element_type: AnalyticsElementType.Dialogue,
    }
    logEvent(AccountEventName.PublicProfile, params)
  }

  /**
   * When user clicks on share dialog option
   */
  public static trackDealerCallDialogueActionClick(element: PublicProfileScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AccountScreenNames.PublicProfileDealer, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.PublicProfile, params)
  }

  /**
   * from verify email screen
   */
  public static trackUserVerifiedEmailElementClick(element: AccountSettingsScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AccountScreenNames.EnterEmail, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.EmailVerification, params)
  }

  /**
   * from change photo screen
   */
  public static trackUserPhotoChangeElementClick(element: AccountSettingsScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AccountScreenNames.ChangeProfilePhoto, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  public static trackUserPhotoChangeElementShow(element: AccountSettingsScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildScreenViewEventParams(AccountScreenNames.ChangeProfilePhoto),
      element_name: element,
      element_type: AnalyticsElementType.Button,
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  /**
   * From change name screen
   */
  public static trackUserChangeNameElementClick(element: AccountSettingsScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AccountScreenNames.MyAccountSettings_Name, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  public static trackUserChangeNameElementShow(element: AccountSettingsScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildScreenViewEventParams(AccountScreenNames.MyAccountSettings_Name),
      element_name: element,
      element_type: AnalyticsElementType.Button,
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  public static trackUserTruYouVerifiedElementClick(element: AccountSettingsScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AccountScreenNames.TruYouVerify, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  public static trackUserTruYouVerifiedElementShow(element: AccountSettingsScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildScreenViewEventParams(AccountScreenNames.TruYouVerify),
      element_name: element,
      element_type: AnalyticsElementType.Button,
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  /**
   * From Set Vanity URL Screen
   */
  public static trackUserSetVanityUrlElementClick(element: AccountSettingsScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildClickEventParams(AccountScreenNames.MyAccountSettingsCustomProfile, element, AnalyticsElementType.Button),
    }
    logEvent(AccountEventName.MyAccount, params)
  }

  public static trackUserSetVanityUrlElementShow(element: AccountSettingsScreenElement) {
    const params: AnalyticsUIEvent = {
      ...buildScreenViewEventParams(AccountScreenNames.MyAccountSettingsCustomProfile),
      element_name: element,
      element_type: AnalyticsElementType.Button,
    }
    logEvent(AccountEventName.MyAccount, params)
  }
}
