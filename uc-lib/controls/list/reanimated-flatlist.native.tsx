import React from "react"
import hoistNonReactStatics from "hoist-non-react-statics"
import Reanimated from "react-native-reanimated"
import { FlatList, FlatListProps } from "react-native"

//
// code based upon https://github.com/software-mansion/react-native-reanimated/issues/587
//

// tslint:disable: no-any

const ReanimatedFlatListComponent = Reanimated.createAnimatedComponent(FlatList)

const _ReanimatedFlatList = React.forwardRef((props, ref) => {
  const _ref = React.useRef<any>(null)

  React.useImperativeHandle(ref, () => _ref.current.getNode())

  return <ReanimatedFlatListComponent {...props} ref={_ref} />
})

interface ReanimatedFlatListProps<T> extends FlatListProps<T> {
  ref?: React.RefObject<FlatList<T>>
}
export const ReanimatedFlatList = hoistNonReactStatics(_ReanimatedFlatList, FlatList) as React.ComponentType<
  ReanimatedFlatListProps<any>
>

ReanimatedFlatList.defaultProps = {
  ...(ReanimatedFlatList.defaultProps || {}),
}
