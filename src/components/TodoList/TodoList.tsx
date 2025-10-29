import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./TodoList.module.css";
import Loader from "../Loader/Loader";
import type { Todo } from "../../types/todo";
import { deleteTodo } from "../../services/todoService";
interface TodoListProps {
  todos?: Todo[];
  loading: boolean;
}
const TodoList: React.FC<TodoListProps> = ({ todos, loading }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const handleDelete = (todoId: number) => {
    console.log(todoId)
    mutation.mutate(todoId)
  }
  return (
    <>
      {loading && <Loader/>}
      {todos && (
        <ul className={css.list}>
          {todos.map((todo) => (
            <li key={todo.id} className={css.listItem}>
              <h2 className={css.title}>{todo.title}</h2>
              <span className={todo.completed ? css.isDone : css.notDone}></span>
              <p>{todo.tag}</p>
              <div className={css.footer}>
                <button disabled={mutation.isPending} onClick={() => {handleDelete(todo.id)}} className={css.button}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;

