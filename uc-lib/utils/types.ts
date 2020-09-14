/**
 * Type required for the case where type cannot be infered - expected when component is wrapped
 * as an observer. Assign the component value as `Placeholder<Props>` and then attach Placeholder.
 * TODO Perhaps there's a cleaner way to do this, can MST's type be nicer?
 */
import * as React from "react"
import { ViewProps } from "react-native"

export type PlaceholderComponent<Props> = React.FunctionComponent<Props> & {
  Placeholder: React.FunctionComponent<ViewProps>
}
