export interface Todo {
  id: number;
  title: string;
  content: string;
  tag: string;
  completed: boolean;
  
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
