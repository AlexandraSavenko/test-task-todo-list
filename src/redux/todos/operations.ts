import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import type {
  EditTodoFormValues,
  Todo,
  TodoFormValues,
} from "../../types/todo";
import axios from "axios";

interface FetchTodosParams {
  searchValue: string;
  page: number;
  filterValue: string;
}

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (
    { searchValue = "", page = 1, filterValue = "all" }: FetchTodosParams,
    { rejectWithValue }
  ) => {
    const searchParams: Record<string, string> = {};
    if (searchValue) searchParams.search = searchValue;
    if (page) searchParams.page = page.toString();
    if (filterValue !== "all") searchParams.completed = filterValue;
    searchParams.limit = "8";
    const query = new URLSearchParams(searchParams);
    try {
      const res = await api.get<Todo[]>(`/your-todos?${query}`);
      const totalRes = await api.get<Todo[]>("/your-todos");
      return { todos: res.data, totalCount: totalRes.data.length };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue("Failed to fetch todos");
      }
    }
  }
);
export const createTodo = createAsyncThunk<Todo, TodoFormValues, {rejectValue: string}>(
  "todos/createTodos",
  async (newTodo, { rejectWithValue }) => {
    try {
      const res = await api.post<Todo>("/your-todos", newTodo);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue("Failed to save new todo");
      }
      return rejectWithValue("Some error")
    }
  }
);
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodos",
  async (todoId: number, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/your-todos/${todoId}`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(`Failed to delete todo ${todoId}`);
      }
            return rejectWithValue("Some error")

    }
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodos",
  async (updatedTodo: EditTodoFormValues, { rejectWithValue }) => {
    try {
      const res = await api.put<Todo>(
        `/your-todos/${updatedTodo.id}`,
        updatedTodo
      );
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(`Failed to edit todo ${updatedTodo.id}`);
      }
            return rejectWithValue("Some error")

    }
  }
);
