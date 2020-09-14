import { types } from "mobx-state-tree"
import moment from "moment"

/** An ISO8601-formatted timestamp, validated */
export const iso8601 = types.refinement(types.string, s => moment(s.toString()).isValid())
