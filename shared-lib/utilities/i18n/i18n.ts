import I18n from "i18n-js"
import * as RNI18n from "./i18n.d"
import en from "../../translations/en.json"
// See formats: https://github.com/fnando/i18n-js
import _ from "lodash"

// See plurals: http://cldr.unicode.org/index/cldr-spec/plural-rules
// E.g. zero, one, two, few, many, other

// export const translate: RNI18n.MemoizedTranslateFunction = memoize(
//   (scope, options) => I18n.translate(scope, options),
//   (scope, options) => (options ? scope + JSON.stringify(options) : scope)
// )

// TO-DO temporary solution
export const translate = (key: string, _options?: I18n.TranslateOptions): string => {
  return _.property<any, string>(key)(en) || key
}
export const localizeNumber: RNI18n.LocalizeNumberFunction = (num, options) => {
  return I18n.toNumber(num, options)
}

export const localizePercentage: RNI18n.LocalizePercentageFunction = (num, options) => {
  return I18n.toPercentage(num, options)
}

export const localizeCurrency: RNI18n.LocalizeCurrencyFunction = (num, options) => {
  return I18n.toCurrency(num, options)
}

export const localizeDateTime: RNI18n.LocalizeDateTimeFunction = (scope, value) => {
  return I18n.toTime(scope, value)
}

export const localizeHumanSize: RNI18n.LocalizeHumanSizeFunction = (num, options) => {
  return I18n.toHumanSize(num, options)
}

export const setI18nConfig = (_translations: RNI18n.TranslationsFuncDict) => {
  // TODO
}
