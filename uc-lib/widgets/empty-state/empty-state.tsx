import React, { FC } from "react"
import { Exception } from "shared-lib/network/utility"
import { Flex, Spacer, SVG, Text, Margin, LocalSVGSource, Button } from "../../controls"
import { ErrorIcon } from "../../assets"
import { TextColors } from "../../themes"
import { useEffect } from "react"

export interface EmptyStateProps {
  title?: string
  subtitle?: string
  icon?: LocalSVGSource
  iconTint?: keyof TextColors
  iconSize?: LocalSVGSource["size"]
  testID?: string
  buttonTitle?: string
  buttonHandler?: () => void
  onShow?: () => void
}

export interface ErrorStateProps {
  ouException: Exception
}

export const EmptyState: FC<EmptyStateProps | ErrorStateProps> = props => {
  const { title, subtitle, icon, iconTint, testID, buttonTitle, buttonHandler, onShow, iconSize } = formatProps(props)

  useEffect(() => {
    onShow && onShow()
  }, [])

  // Spread in the icon object so that we create a copy of the properties and don't
  // modify the icon object from the image catalog which should be static and unchanging.
  const iconToShow: LocalSVGSource | undefined = icon
    ? {
        ...icon,
      }
    : undefined

  if (iconToShow && iconSize) {
    iconToShow.size = iconSize
  }

  return (
    <Flex crossAxisDistribution="center" direction="column">
      {!!icon && <SVG localSVG={iconToShow} tint={iconTint || "primary"} />}
      <Spacer direction="column" sizeStep={4} />
      {!!title && (
        <Text textType="headline3" textAlign="center" testID={(testID || "uc-lib.empty-state") + ".title"}>
          {title}
        </Text>
      )}
      <Spacer direction="column" sizeStep={4} />
      {!!subtitle && (
        <Margin marginLeftStep={12} marginRightStep={12}>
          <Text color="primary" textAlign="center" textType="primaryBody2">
            {subtitle}
          </Text>
        </Margin>
      )}

      {buttonTitle && buttonHandler ? (
        <>
          <Spacer direction="column" sizeStep={4} />
          <Margin marginLeftStep={12} marginRightStep={12}>
            <Button buttonSize="large" buttonType="primary" title={buttonTitle} onClick={buttonHandler} />
          </Margin>
        </>
      ) : (
        undefined
      )}
    </Flex>
  )
}

const formatProps = (props: EmptyStateProps | ErrorStateProps): EmptyStateProps => {
  let emptyStateProps: EmptyStateProps = props as EmptyStateProps
  if (isErrorStateProps(props)) {
    emptyStateProps = {
      title: props.ouException.title || "",
      subtitle: props.ouException.message || "",
      icon: ErrorIcon,
    }
  }
  return emptyStateProps
}

const isErrorStateProps = (props: EmptyStateProps | ErrorStateProps): props is ErrorStateProps => {
  return (props as ErrorStateProps).ouException !== undefined
}
