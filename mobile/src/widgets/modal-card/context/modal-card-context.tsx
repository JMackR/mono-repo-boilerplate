import { createContext } from "react"
import { ModalCardContextProviderProps } from "./modal-card-provider-props"
import React from "react"
import BottomSheet from "reanimated-bottom-sheet"

const defaults: ModalCardContextProviderProps = {
  backButton: "none",
  setBackButton: _which => {},
  title: "",
  setTitle: _title => {},
  snapPoints: [],
  snapIndex: 0,
  setSnapIndex: _e => {},
  setSnapPoints: _points => {},
  ref: React.createRef<BottomSheet>(),
  collapse: () => {},
  refSafeSnapTo: _i => {},
  testID: "",
  setTestID: _testID => {},
}
export const ModalHostContext = createContext(defaults)
