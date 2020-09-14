import React, { FC } from "react"
import { Button, Spacer, Margin, Stack, Text, SVG, Center, RemoteImage, Flex } from "uc-lib/controls"
import { Dialog } from "./dialog"
import { Exception, ExceptionAction } from "shared-lib"
import { WarningIcon } from "../../assets"

const MARGIN = 4
const ICON_SIZE = 48
const MAX_NUMBER_OF_BUTTONS = 2

export interface ErrorDialogProps {
  onDismissPressed: () => void
  ouException: Exception
  onActionItemPressed: (action: ExceptionAction) => void
}

export const ErrorDialog: FC<ErrorDialogProps> = props => {
  const { ouException, onDismissPressed: onDismissPressed, onActionItemPressed } = props

  const ErrorDialogActions = () => {
    const { actions, dismissible } = ouException
    if (!actions || actions.length === 0) {
      return (
        <Button
          title={"OK"}
          onClick={onDismissPressed}
          buttonType={"primary"}
          buttonSize={"large"}
          testID="error-dialog-ok-button"
        />
      )
    }
    const actionsToRender = actions.slice(0, MAX_NUMBER_OF_BUTTONS - (dismissible ? 1 : 0))
    return (
      <Stack direction="row" grow={1} childSeparationStep={MARGIN}>
        {dismissible && (
          <Flex direction="column" basis="50%">
            <Button
              title={"Dismiss"}
              onClick={onDismissPressed}
              buttonType="secondary"
              buttonSize={"large"}
              testID="error-dialog-dismiss-button"
            />
          </Flex>
        )}
        {actionsToRender.map(action => {
          const onClickHandler = () => onActionItemPressed(action)
          return (
            <Flex
              direction="column"
              key={action.actionPath}
              basis={dismissible ? "50%" : `${100 / actionsToRender.length}%`}
            >
              <Button
                title={action.label}
                onClick={onClickHandler}
                buttonType={"primary"}
                buttonSize={"large"}
                testID={`error-dialog-action-button_${action.actionPath}`}
              />
            </Flex>
          )
        })}
      </Stack>
    )
  }

  return (
    <Dialog>
      <Margin marginStep={MARGIN}>
        <Stack direction={"column"} grow={1}>
          <Margin marginLeftStep={MARGIN} marginRightStep={MARGIN}>
            <Center>
              <Stack direction={"column"} childSeparationStep={MARGIN}>
                <Center>
                  {ouException.icon ? (
                    <RemoteImage
                      source={{ uri: ouException.icon.url }}
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      resizeMode="contain"
                    />
                  ) : (
                    <SVG
                      localSVG={{
                        SVG: WarningIcon.SVG,
                        size: { width: ICON_SIZE, height: ICON_SIZE },
                      }}
                      tint={"error"}
                    />
                  )}
                </Center>
                <Text textType={"headline3"} textAlign="center">
                  {ouException.title}
                </Text>
                <Text textType={"primaryBody2"} textAlign="center">
                  {ouException.message}
                </Text>
                <Spacer sizeStep={MARGIN} direction={"column"} />
              </Stack>
            </Center>
          </Margin>
          <ErrorDialogActions />
        </Stack>
      </Margin>
    </Dialog>
  )
}
