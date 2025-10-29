export interface Todo {
  // userId: number;
  id: number;
  title: string;
  completed: boolean;
  tag: string;
}

export interface TodoFormValues {
  userId: number,
    id: number,
    title: string,
    completed: boolean
}