import css from "./TodoList.module.css";
import Loader from "../Loader/Loader";
import type { Todo } from "../../types/todo";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { selectLoading } from "../../redux/todos/selectors";
import { deleteTodo } from "../../redux/todos/operations";
interface TodoListProps {
  todos?: Todo[];
  openEditModal: (todo: Todo) => void;
}
const TodoList: React.FC<TodoListProps> = ({
  openEditModal,
  todos,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector(selectLoading)
  // const queryClient = useQueryClient();
  // const mutationDel = useMutation({
  //   mutationFn: deleteTodo,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });
  const handleDelete = (todoId: number) => {
   dispatch(deleteTodo(todoId))
  };
  
  return (
    <>
      {loading && <Loader />}
      {todos && (
        <ul className={css.list}>
          {todos.map((todo) => (
            <li key={todo.id} className={css.listItem}>
              <div className={css.titleWrap}>
                <span
                  className={`${css.completed} ${
                    todo.completed ? css.isDone : css.notDone
                  }`}
                ></span>
                <h2 className={css.title}>{todo.title}</h2>
              </div>
              <p>{todo.content}</p>
              <button
                className={css.editBtn}
                onClick={() => openEditModal(todo)}
              >
                <CiEdit />
              </button>
              <div className={css.footer}>
                <button
                  disabled={loading}
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
