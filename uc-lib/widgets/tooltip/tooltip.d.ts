import { BackgroundColors, TextColors } from "uc-lib/themes";

interface TooltipContainerProps {
  children: React.ReactNode;
}

export enum TooltipType {
  Primary = "primary",
  Highlight = "hightlight"
}
export interface TooltipProps {
  width?: number;
  content: React.ReactNode;
  type?: TooltipType;
  onClose?(): void;
  showCloseButton?: boolean;
  autoHide?: boolean;
}
export interface TooltipContextProps {
  showTooltip(data: TooltipProps): void;
  hideTooltip(): void;
}
export interface TooltipLayoutProps {
  bgColor: keyof BackgroundColors;
  textColor: keyof TextColors;
  closeButtonColor: keyof TextColors;
}
