import type { RootState } from "../store";

export const selectTodos = (state:RootState) => state.todos.todos;
export const selectTotalPages = (state:RootState) => state.todos.totalPage;
export const selectLoading= (state:RootState) => state.todos.loading;
export const selectSearchValue = (state:RootState) => state.todos.searchValue;
export const selectFilterValue = (state:RootState) => state.todos.filters;




