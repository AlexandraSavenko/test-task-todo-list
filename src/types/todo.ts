export interface Todo {
  // userId: number;
  id: number;
  title: string;
  content: string;
  completed: boolean;
  tag: string;
}

export interface TodoFormValues {
    title: string;
    content: string;
    tag: string;
    completed: boolean;
}

export interface EditTodoFormValues {
  id?: number;
  title: string;
    content: string;
    tag: string;
    completed: boolean;
}