import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./TodoList.module.css";
import Loader from "../Loader/Loader";
import type { Todo } from "../../types/todo";
import { deleteTodo } from "../../services/todoService";
import { CiEdit } from "react-icons/ci";
interface TodoListProps {
  todos?: Todo[];
  loading: boolean;
  openEditModal: (todo: Todo) => void;
}
const TodoList: React.FC<TodoListProps> = ({ openEditModal, todos, loading }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = (todoId: number) => {
    console.log(todoId);
    mutation.mutate(todoId);
  };
  return (
    <>
      {loading && <Loader />}
      {todos && (
        <ul className={css.list}>
          {todos.map((todo) => (
            <li key={todo.id} className={css.listItem}>
              <h2 className={css.title}>{todo.title}</h2>
              <p>{todo.content}</p>
              <span
                className={todo.completed ? css.isDone : css.notDone}
              ></span>
              
              <button className={css.editBtn} onClick={() => openEditModal(todo)}>
                <CiEdit />
              </button>
              <div className={css.footer}>
                <button
                  disabled={mutation.isPending}
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                  className={css.button}
                >
                  Delete
                </button>
                <p className={css.tag}>{todo.tag}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;
