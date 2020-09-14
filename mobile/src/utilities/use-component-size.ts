import { useState, useCallback } from "react"

export const useComponentSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  const onLayout = useCallback(
    event => {
      const { width, height } = event.nativeEvent.layout
      setSize({ width, height })
    },
    [size],
  )

  return { size, onLayout }
}
