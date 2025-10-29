import api from "../api/api"
import type { Todo, TodoFormValues } from "../types/todo";

interface FetchTodosParams {
    searchValue: string,
}
interface CreateTodoResponce {
    todo: Todo
}

export const fetchTodos = async ({searchValue}: FetchTodosParams): Promise<Todo[]> => {
    const searchParams: Record<string, string> = {}
    if(searchValue) searchParams.search = searchValue
        const query = new URLSearchParams(searchParams)
const res = await api.get<Todo[]>(`/your-todos?${query}`);
console.log(res.data)
return res.data
}

export const createTodo = async (newNote: TodoFormValues) => {
    const res = await api.post<CreateTodoResponce>('/your-todos', newNote);
    return res.data
}
export const deleteTodo = async (todoId: number) => {
     const res = await api.delete(`/your-todos/${todoId}`);
    return res.data
}