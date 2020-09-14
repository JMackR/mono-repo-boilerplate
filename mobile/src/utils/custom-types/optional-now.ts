import { IAnyType, types } from "mobx-state-tree"
import moment from "moment"

/** Optional type, lazy defaults to now */
export const optionalNow = <IT extends IAnyType>(type: IT) =>
  types.optional(type, () => moment().toISOString())
