import css from "./App.module.css";
import { Suspense, useEffect, useState } from "react";
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
import { selectTodos, selectTotalPages } from "./redux/todos/selectors";
import { fetchTodos } from "./redux/todos/operations";
import FilterTodos from "./components/FilterTodos/FilterTodos";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import TodoPage from "./pages/todoPage/TodoPage";
function App() {
  const [isModalOpen, setIsModalOpen] = useState<
    "" | "createTodo" | "editTodo"
  >("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  return (
    <div className={css.app}>
      <Layout>
        <Suspense>
          <Routes>
            <Route path="/" element={<TodoPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
