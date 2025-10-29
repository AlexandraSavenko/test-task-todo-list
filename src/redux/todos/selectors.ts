import type { RootState } from "../store";

export const selectTodos = (state:RootState) => state.todos.todos;
export const selectTotalPages = (state:RootState) => state.todos.totalPage;
export const selectLoading= (state:RootState) => state.todos.loading;


