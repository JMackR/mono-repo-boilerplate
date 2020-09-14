export interface ScreenProviderProps {
  screenName?: string;
  screenRoute?: string;
}

export interface ScreenProviderContext {
  setScreenName: (screenName?: string) => void;
  screenName?: string;
  screenRoute?: string;
}

export const _SCREEN_PROVIDER_DEFAULT_SCREEN_NAME = "pls_name_me";
