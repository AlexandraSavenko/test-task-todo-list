import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import type { EditTodoFormValues, Todo, TodoFormValues } from "../../types/todo";


interface FetchTodosParams {
  searchValue: string;
  page: number;
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos",  async ({
  searchValue,
  page,
}: FetchTodosParams) => {
  const searchParams: Record<string, string> = {};
  if (searchValue) searchParams.search = searchValue;
  if (page) searchParams.page = page.toString();
  searchParams.limit = "8";
  const query = new URLSearchParams(searchParams);
  const res = await api.get<Todo[]>(`/your-todos?${query}`);
  const totalRes = await api.get<Todo[]>('/your-todos')
  return {todos: res.data, totalCount: totalRes.data.length,};
}
)
export const createTodo = createAsyncThunk("todos/createTodos", async (newTodo: TodoFormValues) => {
  const res = await api.post<Todo>("/your-todos", newTodo);
  return res.data;
})
export const deleteTodo = createAsyncThunk("todos/deleteTodos", async (todoId: number) => {
  const res = await api.delete(`/your-todos/${todoId}`);
  return res.data;
})

export const editTodo = createAsyncThunk("todos/editTodos", async (updatedTodo: EditTodoFormValues) => {
  const res = await api.put<Todo>(
    `/your-todos/${updatedTodo.id}`,
    updatedTodo
  );
  return res.data;
})