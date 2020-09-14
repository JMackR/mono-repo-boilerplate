import { FC } from "react"
import { LocalImageProps } from "./local-image-props"
import invariant from "invariant"

export const LocalImage: FC<LocalImageProps> = () => {
  invariant(false, "LocalImage is only for native.")
  return <></>
}
