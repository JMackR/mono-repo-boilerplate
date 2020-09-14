export enum AccountEventName {
  MyAccount = "myaccount_ui_event",
  Share = "share_ui_event",
  PublicProfile = "public_profile_ui_event",
  EmailVerification = "email_verification_ui_event",
  UserLoggedIn = "user_logged_in",
  UserRegistered = "user_registered",
  ResetPassword = "reset_password_ui_event",
  Login = "login_ui_event",
  PhoneVerification = "phone_verification_ui_event",
  AccountCreation = "account_creation_ui_event",
  AccountChallenge = "account_challenge_ui_event",
  AccountChallenged = "account_challenged",
  PhoneVerified = "phone_verified",
}

export enum AccountScreenElement {
  SettingsGear = "SettingsGear",
  ChangePhoto = "ChangePhoto",
  StarRating = "StarRating",
  Reputationlink = "ReputationLink",
  EmailVerifiedIcon = "EmailVerifiedIcon",
  ImageAddedIcon = "ImageAddedIcon",
  PhoneVerifiedIcon = "PhoneVerifiedIcon",
  TruYouIcon = "TruYouIcon",
  FacebookConnectedIcon = "FacebookConnectedIcon",
  PurchasesAndSales = "PurchasesAndSales",
  Payments = "Payments",
  SavedItems = "SavedItems",
  SavedSearched = "SavedSearches",
  AccountSettings = "AccountSettings",
  PublicProfile = "PublicProfile",
  CustomProfileLink = "CustomProfileLink",
  PromotePlus = "PromotePlus",
  Help = "help",
  CommunityForums = "CommunityForums",
  InviteFriends = "InviteFriends",

  // for modals
  X = "X",

  // invite friends modal
  InviteFriendsShareLink = "ShareLink",
  InviteFriendsCopy = "Copy",
  InviteFriendsHowInvitesWork = "HowInvitesWork",
}

export enum AccountSettingsScreenElement {
  // main settings
  Name = "Name",
  PhoneNumber = "PhoneNumber",
  Email = "Email",
  TruYou = "TruYou",
  Facebook = "Facebook",
  ChangePassword = "ChangePassword",
  Location = "Location",
  EmailNotification = "EmailNotification",
  PushNotification = "PushNotification",
  Aboutredibs = "AboutRedibs",
  LogOut = "LogOut",
  // dialogs, links, sub pages
  Cancel = "Cancel",
  Save = "Save",
  TakePhoto = "TakePhoto",
  SelectPhoto = "SelectPhoto",
  Done = "Done",
  NewsletterToggle = "NewsletterToggle",
  TermsOfService = "TermsOfService",
  // TruYou
  LearnMore = "LearnMore",
  VerifyPhone = "VerifyPhone",
  VerifyID = "VerifyID",
  Close = "Close",
  Back = "Back",
}

export enum AccountScreenNames {
  PublicProfileUser = "PublicProfileUser",
  PublicProfileDealer = "PublicProfileDealer",
  PublicProfileMerchant = "PublicProfileMerchant",
  InviteFriendsPromo = "InviteFriendsPromo",
  MyAccountHomePage = "MyAccountHomePage",
  MyAccountSettings = "MyAccountSettings",
  EnterEmail = "EnterEmail",
  ChangeProfilePhoto = "ChangeProfilePhoto",
  ChangeProfileTakePhoto = "ChangeProfileTakePhoto",
  ChangeProfilePhotoCameraRoll = "ChangeProfilePhotoCameraRoll",
  TruYouVerify = "TruYouVerify",
  TruYouVerifyLicense = "TruYouVerifyLicense",
  MyAccountSettings_Name = "MyAccountSettings_Name",
  MyAccountSettings_EmailNotification = "MyAccountSettings_EmailNotification",
  MyAccountSettings_PushNotification = "MyAccountSettings_PushNotification",
  MyAccountSettings_Location = "MyAccountSettings_Location",
  MyAccountSettingsCustomProfile = "MyAccountSettingsCustomProfile",
}

export enum PublicProfileScreenElement {
  Share = "Share",
  Report = "Report",
  Cancel = "Cancel",
  Call = "Call",
  ShareReportDialogue = "ShareReportDialogue",

  UnblockUser = "UnblockUser",
  ShareOrReport = "ShareOrReport",
  Reviews = "Reviews",
  CallDealer = "CallDealer",
  Address = "Address",
  Website = "Website",
  SeeHours = "SeeHours",
  HideHours = "HideHours",
  Item = "Item",
  ViewAll = "ViewAll",

  SeeMore = "SeeMore",
  SeeLess = "SeeLess",
}
