import { ActionSheetIOSOptions } from "react-native"
import { LocalSVGSource } from "uc-lib"

export type ActionSheetCallback = (buttonIndex: number) => void

export interface ActionSheetParams extends ActionSheetIOSOptions {
  icons?: LocalSVGSource[]
}
