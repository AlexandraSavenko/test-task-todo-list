import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createTodo, deleteTodo, editTodo, fetchTodos } from "./operations";
import type { Todo } from "../../types/todo";

interface todosInitialState {
    todos: Todo[],
    totalPage: number,
    loading: boolean,
    error: boolean,
}
const InitialState: todosInitialState = {
    todos: [],
    totalPage: 1,
    loading: false,
    error: false,
  }
const todoSlice = createSlice({
  name: "todos",
  initialState: InitialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
        state.totalPage = Math.ceil(action.payload.totalCount / 8);
        state.error = false;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = [...state.todos, action.payload]
        state.error = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        state.error = false;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)
        state.error = false;
      })
      .addMatcher( isAnyOf(fetchTodos.pending, createTodo.pending, deleteTodo.pending, editTodo.pending),
        (state) => {
          state.loading = false;
          state.error = true;
        })
      .addMatcher( isAnyOf(fetchTodos.rejected, createTodo.rejected, deleteTodo.rejected, editTodo.rejected),
        (state) => {
          state.loading = false;
          state.error = true;
        });
  },
});

export default todoSlice.reducer;

// export const {
  
// } = todoSlice.actions;
