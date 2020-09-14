import React, { useRef, useEffect } from "react"
import { VisibilityCheckProps } from "./visibility-check.d"

export const VisibilityCheck: React.FC<VisibilityCheckProps> = props => {
  const { index, children, onVisibilityChange } = props
  const element = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        onVisibilityChange(entry.isIntersecting, index)
      },
      {
        threshold: 0,
      },
    )
    observer.observe(element.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={element}>{children}</div>
}
