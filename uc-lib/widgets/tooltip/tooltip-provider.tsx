import React, { useState, createContext, FC, useContext } from "react"
import { Tooltip } from "./tooltip"
import { TooltipContextProps, TooltipProps } from "./tooltip.d"

export const TOOLTIP_DURATION = 5000
const initValue: TooltipContextProps = {
  showTooltip: (_data: TooltipProps) => {},
  hideTooltip: () => {},
}

export const TooltipContext = createContext<TooltipContextProps>(initValue)

export const useTooltip = (): TooltipContextProps => {
  return useContext(TooltipContext)
}

export const TooltipProvider: FC = props => {
  const { children } = props
  const [show, setShow] = useState(false)
  const [data, setData] = useState<TooltipProps | undefined>(undefined)

  const showTooltip = (tooltipData: TooltipProps) => {
    setData(tooltipData)
    setShow(true)
    if (tooltipData.autoHide) {
      setTimeout(hideTooltip, TOOLTIP_DURATION)
    }
  }
  const hideTooltip = () => {
    setShow(false)
  }
  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}
      {data && show && <Tooltip onClose={hideTooltip} {...data} />}
    </TooltipContext.Provider>
  )
}
