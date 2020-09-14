export interface TranslationsFuncDict {
  [locale: string]: () => object
}

export type TranslateFunction = (scope: import('i18n-js').Scope, options?: import('i18n-js').TranslateOptions) => string

export type MemoizedTranslateFunction = TranslateFunction & import('lodash').MemoizedFunction

export type LocalizeNumberFunction = (num: number, options?: import('i18n-js').ToNumberOptions) => string

export type LocalizePercentageFunction = (num: number, options?: import('i18n-js').ToPercentageOptions) => string

export type LocalizeCurrencyFunction = (num: number, options?: import('i18n-js').ToCurrencyOptions) => string

export type LocalizeDateTimeFunction = (scope: import('i18n-js').Scope, value: string | number | Date) => string

export type LocalizeHumanSizeFunction = (num: number, options?: import('i18n-js').ToHumanSizeOptions) => string

export type LocalizePhoneNumberFunction = (number: string) => string
