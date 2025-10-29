// import api from "../api/api";
// import type { EditTodoFormValues, Todo, TodoFormValues } from "../types/todo";

// interface FetchTodosParams {
//   searchValue: string;
//   page: number;
// }
// interface CreateTodoResponce {
//   todo: Todo;
// }

// export const fetchTodos = async ({
//   searchValue,
//   page,
// }: FetchTodosParams): Promise<{todos: Todo[], totalCount: number}> => {
//   const searchParams: Record<string, string> = {};
//   if (searchValue) searchParams.search = searchValue;
//   if (page) searchParams.page = page.toString();
//   searchParams.limit = "8";
//   const query = new URLSearchParams(searchParams);
//   const res = await api.get<Todo[]>(`/your-todos?${query}`);
//   const totalRes = await api.get<Todo[]>('/your-todos')
//   console.log(res.headers['x-total-count'])
//   return {todos: res.data, totalCount: totalRes.data.length,};
// };

// export const createTodo = async (newTodo: TodoFormValues) => {
//   const res = await api.post<CreateTodoResponce>("/your-todos", newTodo);
//   return res.data;
// };
// export const deleteTodo = async (todoId: number) => {
//   const res = await api.delete(`/your-todos/${todoId}`);
//   return res.data;
// };

// export const editTodo = async (updatedTodo: EditTodoFormValues) => {
//   const res = await api.put<CreateTodoResponce>(
//     `/your-todos/${updatedTodo.id}`,
//     updatedTodo
//   );
//   return res.data;
// };
