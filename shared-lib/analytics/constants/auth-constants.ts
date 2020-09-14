export enum AuthScreenElement {
  Back = "Back",
  Submit = "Submit",

  LoginFacebook = "LoginFacebook",
  LoginGoogle = "LoginGoogle",
  LoginApple = "LoginApple",
  LoginEmail = "LoginEmail",
  Login = "Login",
  Cancel = "Cancel",
  TermsOfService = "TOS",
  PrivacyPolicy = "Policy",
  Help = "Help",
  HaveAccount = "HaveAccount",
  CreateAccount = "CreateAccount",
  ForgotPassword = "ForgotPassword",
  CheckYourEmail = "CheckYourEmail",
  GotIt = "GotIt",
  Resend = "Resend",
  SendCode = "SendCode",
  WhatIsThis = "WhatIsThis?",
  Save = "Save",
  Send = "Send",
  VerifyPinCode = "VerifyPinCode",
  NoPhone = "NoPhone",
  Done = "Done",
  LearnMore = "LearnMore",
}

export enum AuthScreenContext {
  SocialAccountLogin = "SocialAccountLogin",
  PhoneNumberChange = "PhoneNumberChange",
  NewDevice = "NewDevice",
  AccountUpdate = "AccountUpdate",
  Registration = "Registration",
  ExistingUser = "ExistingUser",
  EmailUpdate = "EmailUpdate",
  None = "None",
}

export enum AuthScreen {
  CreateAccount = "CreateAccount",
  ChangePassword = "ChangePassword",
  EmailLanding = "EmailLanding",
  EmailLogin = "EmailLogin",
  EmailVerifyPrompt = "EmailVerifyPrompt",
  LoginCreateAccount = "LoginCreateAccount",
  PhoneNumberInput = "PhoneNumberInput",
  PinCodeInput = "PinCodeInput",
  ResetPasswordThroughEmail = "ResetPasswordThroughEmail",
  PhoneVerifyThroughEmail = "PhoneVerifyThroughEmail",
  CodeInputThroughEmail = "CodeInputThroughEmail",
  ConfirmationSent = "ConfirmationSent",
}
export enum OnboardingScreen {
  OnboardingFlowStep1 = "OnboardingFlowStep1",
  OnboardingFlowStep2 = "OnboardingFlowStep2",
  OnboardingFlowStep3 = "OnboardingFlowStep3",
  OnboardingFlowStep4 = "OnboardingFlowStep4",
  OnboardingFlowStep5 = "OnboardingFlowStep5",
}
export enum AuthChannel {
  Email = "email",
  Facebook = "facebook",
  Apple = "apple",
  Google = "google",
  Phone = "phone",
}
