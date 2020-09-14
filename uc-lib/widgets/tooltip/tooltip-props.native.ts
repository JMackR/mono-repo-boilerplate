import { LayoutRectangle, NativeComponent } from "react-native"

export interface PointerProps {
  isDown: boolean
  clickComponentRect: LayoutRectangle
  tooltipRect: LayoutRectangle
  type?: TooltipType
}

export interface TooltipShowParam {
  clickComponent: NativeComponent
  content: string
  width: number
  height: number
  tryAlignCenter?: boolean
  type?: TooltipType
}

export interface TooltipProps {
  tooltipRect: LayoutRectangle
  clickComponentRect: LayoutRectangle
  onClose: () => void
  type?: TooltipType
}

export type TooltipType = "primary" | "highlight"
