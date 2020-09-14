import * as I18n from "shared-lib/utilities/i18n/i18n.d"
import React from "react"

export interface AppProviderProps {
  children?: React.ReactNode
  translations: I18n.TranslationsFuncDict
}
