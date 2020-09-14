import React from "react"
import { ThemeProviderProps } from "./theme-provider.props"
import { ColorThemeContextProvider } from "./color-theme-context-provider"
import { FontThemeContextProvider } from "./font-theme-context-provider"
import { SystemThemeProvider } from "./system-theme-provider/system-theme-provider"

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props

  return (
    <SystemThemeProvider>
      <ColorThemeContextProvider>
        <FontThemeContextProvider>{children}</FontThemeContextProvider>
      </ColorThemeContextProvider>
    </SystemThemeProvider>
  )
}
