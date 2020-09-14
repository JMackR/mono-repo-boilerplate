import { propertyOf } from "lodash"
import { useColorForBackgroundColor, useMargin, AVATAR_SIZE_LARGE } from "uc-lib"
import React, { FC, useEffect, useRef } from "react"
import { TabBarPostFill } from "../../assets"
import { Margin, SVG, Overlay, Touchable, Border, Flex, Background } from "../../controls"
import { ProfileImageSelectorProps } from "./account-profile-image-selector.props"

export const AccountProfileImageSelector: FC<ProfileImageSelectorProps> = props => {
  const { onSelect, children } = props
  const element = useRef<any>(null)
  const { baseMargin } = useMargin()
  useEffect(() => {
    if (!element.current) {
      return
    }
    element.current.onchange = onImageChange
  }, [element.current])
  const onClick = async () => {
    element && element.current && element.current.click()
  }
  const onImageChange = async (event: any) => {
    const file = propertyOf(event)("target.files.0")
    onSelect && onSelect(file)
  }
  return (
    <Touchable onPress={onClick}>
      <Border direction="column" grow={0} lineWeight="none" width={AVATAR_SIZE_LARGE} cornerRadius="circle">
        <Flex direction="column" grow={0}>
          {children}
        </Flex>
        <Overlay direction="column" grow={0} width="100%" insetBottomStep={0}>
          <Background type="overlay" />
          <Margin marginStep={1} direction="column" crossAxisDistribution="center">
            <SVG
              localSVG={{
                SVG: TabBarPostFill.SVG,
                size: {
                  height: baseMargin * 5,
                  width: baseMargin * 5,
                },
              }}
              tint="primaryAlt"
            />
            <input
              ref={element}
              style={{ display: "none" }}
              type="file"
              onChange={onImageChange}
              accept="image/png, image/jpeg"
            />
          </Margin>
        </Overlay>
      </Border>
    </Touchable>
  )
}
