import React, { forwardRef } from "react"
import { ViewBlockProps } from "./view-block.d"

export const ViewBlock = forwardRef<HTMLDivElement, ViewBlockProps>((props, ref) => {
  const { className, testID, children } = props
  return (
    <div ref={ref} className={className} data-test-id={testID || "uc-lib.view-block"}>
      {children}
    </div>
  )
})
