import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { Todo } from "../../types/todo";
import {
  selectFilterValue,
  selectSearchValue,
  selectTodos,
  selectTotalPages,
} from "../../redux/todos/selectors";
import { fetchTodos } from "../../redux/todos/operations";
import TodoList from "../../components/TodoList/TodoList";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import CreateTodoFrom from "../../components/CreateTodoForm/CreateTodoForm";
import EditTodoForm from "../../components/EditTodoForm/EditTodoForm";
import type { AppDispatch } from "../../redux/store";
import {
  selectEditingTodo,
  selectIsModalOpen,
} from "../../redux/modal/selectors";
import { setEditingTodo, setModalOpen } from "../../redux/modal/slice";

const TodoPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const todos = useSelector(selectTodos);
  const searchValue = useSelector(selectSearchValue);
  const filterValue = useSelector(selectFilterValue);
  const isModalOpen = useSelector(selectIsModalOpen);
  const editingTodo = useSelector(selectEditingTodo);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchTodos({ searchValue, page, filterValue }));
  }, [dispatch, searchValue, page, filterValue]);

  const notes = todos ?? [];

  const openEditModal = (todo: Todo) => {
    dispatch(setEditingTodo(todo));
    dispatch(setModalOpen("editTodo"));
  };
  const closeModal = () => dispatch(setModalOpen(""));
  return (
    <>
      <TodoList openEditModal={openEditModal} todos={notes} />
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
    </>
  );
};

export default TodoPage;
