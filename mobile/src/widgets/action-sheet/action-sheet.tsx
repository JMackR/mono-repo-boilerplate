import { Flex, Stack, Text, Margin, SVG, Spacer, ClickableOpacity } from "uc-lib"
import React from "react"
import { Platform, ActionSheetIOS } from "react-native"
import { ModalCardProps, ModalHostContext } from ".."
import { useModal } from "../modal-card/context/modal-provider"
import { ActionSheetParams, ActionSheetCallback } from "./action-sheet-types"
import { NAVIGATION_LOCK_EXPIRE_MS, Navigation } from "../../navigation/navigation"
import _ from "lodash"
import invariant from "invariant"

export function useActionSheet() {
  const { show: showModalInternal } = useModal()

  const show = async (params: ActionSheetParams, callback: ActionSheetCallback) => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(params, callback)
    } else {
      invariant(!params.icons || params.options.length === params.icons?.length, "options must have matching icons")

      const height = params.options.length * ITEM_HEIGHT
      const props: ModalCardProps = {
        content: () => <ActionSheetContent options={params} callback={callback} />,
        title: "",
        snapPoints: [0, height],
        initialSnap: 1,
        disableDefaultNavigationBar: true,
        useHeaderRadius: false,
        collapseOnOutsidePress: true,
      }
      showModalInternal(props)
    }
  }
  return { show }
}

const ITEM_HEIGHT = 56

const SIDE_MARGIN_STEP = 4

const ActionSheetContent: React.FC<{ options: ActionSheetParams; callback: ActionSheetCallback }> = ({
  options,
  callback,
}) => {
  const { collapse } = React.useContext(ModalHostContext)

  return (
    <Stack direction="column">
      {options.options.map((value, idx) => {
        const pressHandler = () => {
          collapse()
          // this is a hack. Ideally we should have chain of navigations running one after the other so that
          // we don't have to wait some magic numbers of millSeconds. Add new hook something similiar to ModalCardCollapseListenerController
          // or update it so that it gives hook to run callback at the end of navigation
          setTimeout(() => Navigation.performWhenAvailable(() => callback(idx)), NAVIGATION_LOCK_EXPIRE_MS + 50)
        }
        return (
          <ClickableOpacity key={idx} onClick={pressHandler}>
            <Margin marginLeftStep={SIDE_MARGIN_STEP} marginRightStep={SIDE_MARGIN_STEP}>
              <Flex direction="row" key={idx} height={ITEM_HEIGHT} crossAxisDistribution="center">
                {options.icons && options.icons[idx] && <SVG localSVG={options.icons[idx]} tint={"primary"} />}
                {options.icons && options.icons[idx] && <Spacer direction="row" sizeStep={SIDE_MARGIN_STEP} />}
                <Text>{value}</Text>
              </Flex>
            </Margin>
          </ClickableOpacity>
        )
      })}
    </Stack>
  )
}
