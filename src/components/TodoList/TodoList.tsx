import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./TodoList.module.css";
import Loader from "../Loader/Loader";
import type { Todo } from "../../types/todo";
import { deleteTodo, markAsDone } from "../../services/todoService";
import { CiEdit } from "react-icons/ci";
interface TodoListProps {
  todos?: Todo[];
  loading: boolean;
  openEditModal: (todo: Todo) => void;
}
const TodoList: React.FC<TodoListProps> = ({ openEditModal, todos, loading }) => {
  const queryClient = useQueryClient();
  const mutationDel = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
const mutationDone = useMutation({
    mutationFn: markAsDone,
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], old => old?.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleDelete = (todoId: number) => {
    mutationDel.mutate(todoId);
  };

  const handleMarkAsDone = (todo: Todo) => {
    const toggle = !todo.completed
    const completedTask = {
      ...todo,
      completed: toggle
    }
    console.log(completedTask)
mutationDone.mutate(completedTask);
  }
  return (
    <>
      {loading && <Loader />}
      {todos && (
        <ul className={css.list}>
          {todos.map((todo) => (
            <li key={todo.id} className={css.listItem}>
              <h2 className={css.title}>{todo.title}</h2>
              <p>{todo.content}</p>
              <span onClick={() => handleMarkAsDone(todo)}
                className={`${css.completed} ${todo.completed ? css.isDone : css.notDone}`}
              ></span>
              
              <button className={css.editBtn} onClick={() => openEditModal(todo)}>
                <CiEdit />
              </button>
              <div className={css.footer}>
                <button
                  disabled={mutationDel.isPending}
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
