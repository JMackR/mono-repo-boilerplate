export enum OnboardingFlowStep {
  Step1 = 0,
  Step2 = 1,
  Step3 = 2,
  Step4 = 3,
  Step5 = 4
}

export enum OnboardingFlowScreenName {
  OnboardingItem1_Photo = 'OnboardingItem1Photo',
  OnboardingItem2_Details = 'OnboardingItem2Detail',
  OnboardingItem3_Price = 'OnboardingItem3Price',
  OnboardingItem4_Delivery = 'OnboardingItem4Finish',
  OnboardingItem5_AfterOnboarding = 'OnboardingItem5Confirm',
  EditItem1_Photo = 'EditItem1Photo',
  EditItem2_Details = 'EditItem2Details',
  EditItem3_Price = 'EditItem3Price',
  EditItem4_Delivery = 'EditItem4Finish',
  EditItem5_AfterOnboarding = 'EditItem5Confirm'
}

export enum OnboardingFlowElement {
  X = 'X',
  Next = 'Next',
  Onboarding = 'Onboarding',
  Done = 'Done',
  Close = 'Close',
  Save = 'Save',
  Set = 'Set',
  Edit = 'Edit',
  Cancel = 'Cancel',
  Discard = 'Discard',
  DiscardEditsDialog = 'DiscardEditsDialog',
  Back = 'Back'
}

export enum OnboardingFlowStepFiveElement {
  SellFaster = 'SellFaster',
  Share = 'Share',
  OnboardingAnother = 'OnboardingAnother',
  ItemDetail = 'ItemDetail',
  PayPerOnboardingLearnMore = 'PayPerOnboardingLearnMore'
}

export enum OnboardingFlowStepFourElement {
  EditLocation = 'EditLocation',
  Shipping = 'Shipping',
  ShipToggle = 'ShipToggle',
  ShippingHelp = 'ShippingHelp',
  ShippingPolicy = 'ShippingPolicy',
  HelpMeDecide = 'HelpMeDecide',
  PackageSize = 'PackageSize',
  BuyNowToggle = 'BuyNowToggle',
  BuyNowHelp = 'BuyNowHelp',
  TermsOfService = 'TermsOfService',
  PackageSizeListItem = 'PackageSizeListItem',
  PayPerOnboardingLearnMore = 'PayPerOnboardingLearnMore',
  Onboarding = 'Onboarding',
  GetMyLocation = 'GetMyLocation',
  EnterZipcode = 'EnterZipcode',
  Save = 'Save',
  TurnOnLocationDialogue = 'TurnOnLocationDialogue',
  NotNow = 'NotNow',
  Enable = 'Enable',
  Cancel = 'Cancel'
}

export enum OnboardingFlowStepFourSubElement {
  Ship = 'Ship',
  NoShip = 'NoShip',
  BuyNow = 'BuyNow',
  NoBuyNow = 'NoBuyNow'
}

export enum OnboardingFlowStepThreeElement {
  Price = 'Price',
  FirmOnPrice = 'FirmOnPrice',
  Firm = 'Firm',
  NotFirm = 'NotFirm'
}

export enum OnboardingFlowStepTwoElement {
  AddMoreDetails = 'AddMoreDetails',
  ShowLess = 'ShowLess',
  AutoSuggestCategory = 'AutoSuggestCategory',
  SelectCategory = 'SelectCategory'
}

export enum OnboardingFlowStepOneElement {
  TitleName = 'TitleName',
  Edit = 'Edit',
  TakePhoto = 'TakePhoto',
  SelectPhoto = 'SelectPhoto',
  AddPhoto = 'AddPhoto',
  CoverPhotoDelete = 'CoverPhotoDelete',
  EditPhotoDialogue = 'EditPhotoDialogue',
  CoverPhoto = 'CoverPhoto',
  Delete = 'Delete',
  Albums = 'Albums',
  Done = 'Done',
  SelectedPhotos = 'SelectedPhotos',
  Rotate = 'Rotate',
  FlashOn = 'FlashOn',
  FlashOff = 'FlashOff',
  CameraRoll = 'CameraRoll',
  Reset = 'Reset',
  Photo = 'Photo'
}

export enum PhotoAlbumType {
  CameraRoll = 'CameraRoll',
  OtherAlbum = 'OtherAlbum'
}
