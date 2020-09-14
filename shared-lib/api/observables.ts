import { IObservableValue, observable } from "mobx"
import * as React from "react"
import { useObservable } from "mobx-react-lite"
import { Response, ResponseError, ResponseOk } from "./api.types"

// TODO Reconcile the changes after the refactoring

/**
 * Update observable in various states - in flight, successful, failed
 */
type UpdateObservableType =
  | { pending: false; ok?: undefined }
  | { pending: true; ok?: undefined }
  | { pending?: boolean; ok: true }
  | { pending?: boolean; ok: false; error?: string }

/**
 * Update observable in various states - in flight, successful, failed
 */
export type ResultObservable = IObservableValue<UpdateObservableType>

/**
 * Creates an IObservableValue for a ResultObservable
 */
export const resultObservable = (pending = true): ResultObservable =>
  observable.box({ pending, ok: undefined }, { name: "ResultObservable" })

/**
 * TODO Rename `useResultObservable` since 'ResultObservable' type rename
 * A hook to use UpdateObservables cleanly
 * Returns an array of 4 objects:
 *  * [boolean] updating
 *  * [string?] error
 *  * [fn()] resetError
 *  * [fn(ResultObservable)] setUpdate
 * @param onSuccess callback invoked when successful
 */
export const useResponseObservable = (
  onSuccess: () => void,
  onError?: () => void,
): [boolean, string | undefined, () => void, (updateObservable: ResultObservable) => void] => {
  const [error, setError] = React.useState<string>()
  const [update, setUpdate] = React.useState<ResultObservable>(resultObservable(false))
  const callbackInvoked = React.useRef<ResultObservable>()
  useObservable(update)
  React.useEffect(() => {
    if (callbackInvoked.current !== update) {
      const result = update.get()
      if (result.ok) {
        onSuccess()
        callbackInvoked.current = update
      } else if (result.ok === false) {
        setError(result.error)
        setUpdate(resultObservable(false))
        if (onError) onError()
        callbackInvoked.current = update
      }
    }
  }, [onSuccess, update])
  const resetError = () => setError(undefined)
  return [!!update?.get().pending, error, resetError, setUpdate]
}

/**
 * Returns an Api Response callback that connects to a ResultObservable, setting the result
 * @param resultObservable
 * @param successCallback optional callback to be invoked AFTER updating the result
 * @param failedCallback optional callback to be invoked AFTER updating the result
 */
export function connectResponseResult<T>(
  resultObservable: ResultObservable,
  successCallback?: (response: ResponseOk<T>) => void,
  failedCallback?: (response: ResponseError<T>) => void,
): (response: Response<T>) => void {
  return response => {
    resultObservable.set({ pending: false, ok: response.ok })
    if (response.ok && successCallback) {
      successCallback(response)
    } else if (!response.ok && failedCallback) {
      failedCallback(response)
    }
  }
}
