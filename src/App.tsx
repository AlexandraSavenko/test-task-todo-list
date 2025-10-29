import css from "./App.module.css";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination/Pagination";
import Modal from "./components/Modal/Modal";
import SearchBox from "./components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import TodoList from "./components/TodoList/TodoList";
import EditTodoForm from "./components/EditTodoForm/EditTodoForm";
import type { Todo } from "./types/todo";
import CreateTodoFrom from "./components/CreateTodoForm/CreateTodoForm";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./redux/store";
import {
  selectTodos,
  selectTotalPages,
} from "./redux/todos/selectors";
import { fetchTodos } from "./redux/todos/operations";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchValue] = useDebounce(searchQuery, 1000);
  const [isModalOpen, setIsModalOpen] = useState<
    "" | "createTodo" | "editTodo"
  >("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [page, setPage] = useState(1);
  const todos = useSelector(selectTodos);
  // const loading = useSelector(selectLoading);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
  dispatch(fetchTodos({searchValue, page}));
  }, [dispatch, searchValue, page]);


  const notes = todos ?? [];
  const openCreateModal = () => {
    setEditingTodo(null);
    setIsModalOpen("createTodo");
  };
  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen("editTodo");
  };
  const closeModal = () => setIsModalOpen("");
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={setSearchQuery} />

        <button onClick={openCreateModal} className={css.button}>
          Create note +
        </button>
      </header>
      <TodoList openEditModal={openEditModal} todos={notes}/>
      <Pagination totalPages={totalPages} setPage={setPage} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {isModalOpen === "createTodo" && (
            <CreateTodoFrom onClose={closeModal} />
          )}
          {isModalOpen === "editTodo" && editingTodo && (
            <EditTodoForm todoToEdit={editingTodo} onClose={closeModal} />
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
