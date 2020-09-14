import { useEffect, useState } from "react"

/**
 * Provides a wrapper around a state-backed or context-backed object and setter that allows
 * you to apply changes to the object upon completion of an asychronous task
 * without overwriting the changes to the object that may have occured before the asynchronous task completed.
 * @param obj - The object being manipulated
 * @param setObj - The setter for the object
 * @returns A function that takes a newPartialObj of type Partial<T> and applies those changes on the current values of obj.
 *  You can call the returned function at the end of an async task without having to worry about overriding obj with stale data.
 */
export const useAsyncUpdate = <T extends {}>(obj: T, setObj: (obj: T) => void): ((newPartialObj: Partial<T>) => void) => {
  const [partialChange, applyChange] = useState<Partial<T> | null>(null)
  useEffect(() => {
    if (partialChange) {
      setObj({ ...obj, ...partialChange })
    }
  }, [partialChange])
  return applyChange
}
