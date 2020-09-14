import React, { createContext, FC, useContext, useState, useEffect } from "react"
import { LayoutRectangle, useWindowDimensions } from "react-native"
import { getTooltipCoordinate } from "./helper.native"
import { Tooltip } from "./tooltip"
import { TooltipShowParam } from "./tooltip-props.native"
import { TOOLTIP_DURATION } from "./constants.native"
import _ from "lodash"

const TooltipContext = createContext({
  showTooltip: (_param: TooltipShowParam) => {},
  hideTooltip: () => {},
})

const DEFAULT = {
  tooltipWidth: 200,
  tooltipHeight: 52,
  emptyRectangle: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
}

export const TooltipProvider: FC = ({ children }) => {
  const [clickComponentRect, setClickComponentRect] = useState<LayoutRectangle>(DEFAULT.emptyRectangle)
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipRect, setTooltipRect] = useState<LayoutRectangle>(DEFAULT.emptyRectangle)
  const [showTooltipParam, setShowTooltipParam] = useState<TooltipShowParam>({} as TooltipShowParam)
  const [timer, setTimer] = useState<number>()

  useEffect(() => {
    calculateAndSetTooltipPosition(showTooltipParam)
  }, [screenHeight, screenWidth, showTooltipParam])

  const calculateAndSetTooltipPosition = (param: TooltipShowParam) => {
    if (param.clickComponent && param.clickComponent.measureInWindow) {
      param.clickComponent.measureInWindow((x, y, width, height) => {
        const _clickComponentRect = { x, y, width, height } as LayoutRectangle
        setClickComponentRect(_clickComponentRect)

        const coordinate = getTooltipCoordinate({
          originRectangle: _clickComponentRect,
          tooltipWidth: param.width,
          tooltipHeight: param.height,
          screenWidth,
          screenHeight,
          tryAlignCenter: param.tryAlignCenter,
        })
        setTooltipRect({
          x: coordinate.x,
          y: coordinate.y,
          width: param.width,
          height: param.height,
        })
      })
    }
  }

  const showTooltip = async (param: TooltipShowParam) => {
    setShowTooltipParam(param)
    setIsVisible(true)

    if (param.type === "highlight") {
      clearTimeout(timer)
      setTimer(setTimeout(hideTooltip, TOOLTIP_DURATION))
    }
  }

  const hideTooltip = () => {
    setIsVisible(false)
  }

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}
      {isVisible && (
        <Tooltip
          tooltipRect={tooltipRect}
          clickComponentRect={clickComponentRect}
          onClose={hideTooltip}
          type={showTooltipParam.type}
        >
          {showTooltipParam.content}
        </Tooltip>
      )}
    </TooltipContext.Provider>
  )
}

export const useTooltip = () => {
  return useContext(TooltipContext)
}
