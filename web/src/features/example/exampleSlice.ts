import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppThunk, AppDispatch } from "@web-app/store"
import { TodoType } from "@web-features/example/types"

const initialState: TodoType[] = []

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoType>) {
      state.push(action.payload)
    },
    toggleTodo(state, action: PayloadAction<TodoType>) {
      let todo = state.find(todo => todo.id === action.payload.id)

      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})

export const { toggleTodo } = todoSlice.actions

export const addTodo = (text: string): AppThunk => async (dispatch: AppDispatch) => {
  const newTodo: TodoType = {
    id: Math.random()
      .toString(36)
      .substr(2, 9),
    completed: false,
    text: text,
  }

  dispatch(todoSlice.actions.addTodo(newTodo))
}

export default todoSlice.reducer
