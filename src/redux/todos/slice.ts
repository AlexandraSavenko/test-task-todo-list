import { createSlice } from "@reduxjs/toolkit";
import { createTodo, deleteTodo, editTodo, fetchTodos } from "./operations";
import type { Todo } from "../../types/todo";

interface todosInitialState {
  todos: Todo[];
  searchValue: string;
  filters: string;
  totalPage: number;
  loading: boolean;
  error: boolean;
}
const InitialState: todosInitialState = {
  todos: [],
   searchValue: "",
  filters: "all",
  totalPage: 1,
  loading: false,
  error: false,
};
const todoSlice = createSlice({
  name: "todos",
  initialState: InitialState,
  reducers: {
    setSearchValue(state, action){
state.searchValue = action.payload
    },
    setFilterValue(state, action){
      state.filters = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload?.todos || [];
        const pageCount = action.payload ? Math.ceil(action.payload.totalCount / 8) : 0;
        state.totalPage = pageCount
        state.error = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.todos = [];
      })
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = [action.payload, ...state.todos];
        state.error = false;
      })
      .addCase(createTodo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.error = false;
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editTodo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
        state.error = false;
      })
      .addCase(editTodo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default todoSlice.reducer;

export const {
setSearchValue, setFilterValue
} = todoSlice.actions;
