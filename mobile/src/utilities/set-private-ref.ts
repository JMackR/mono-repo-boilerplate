import { TextEntryRef } from "uc-lib"

/*
 * Caveats with callback refs
 * If the ref callback is defined as an inline function, it will get called twice
 * during updates, first with null and then again with the DOM element.
 * See https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
 */
export const setTextEntryPrivateRef = (element: TextEntryRef) => {
  if (element !== null) {
    element.setPrivate()
  }
}
