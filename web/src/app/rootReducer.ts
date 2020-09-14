import { combineReducers } from "@reduxjs/toolkit"

import todos from "@web-features/example/exampleSlice"

const rootReducer = combineReducers({
  example: todos,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
