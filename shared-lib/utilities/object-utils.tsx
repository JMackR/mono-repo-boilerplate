import deepFreeze from "deep-freeze"
export { deepFreeze }

// Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/discussions/11209
// >>> Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value all together.
// tslint:disable-next-line: no-any
export const sanitizeUndefinedToNull = (obj: Record<string, any> | undefined): void => {
  if (obj == null) {
    return
  }
  Object.keys(obj).forEach((key: string) => {
    if (obj[key] && typeof obj[key] === "object") {
      sanitizeUndefinedToNull(obj[key])
    } else if (typeof obj[key] === "undefined") {
      obj[key] = null
    }
  })
}

import { flatMap } from "lodash"
// Expose lodash's `flatMap` as `FlatMap` because Array.prototype.flatMap is not defined on pre-iOS 12 environments.
// We've also banned direct ussages of Array.prototype.flatMap via tslint.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
export const ouFlatMap = flatMap
