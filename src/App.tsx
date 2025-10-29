import { keepPreviousData, useQuery } from "@tanstack/react-query"
import css from "./App.module.css"
import { useState } from "react"
import Pagination from "./components/Pagination/Pagination"
import Modal from "./components/Modal/Modal"
import SearchBox from "./components/SearchBox/SearchBox"
import { useDebounce } from 'use-debounce';
import TodoList from "./components/TodoList/TodoList"
import { fetchTodos } from "./services/todoService"
import EditTodoForm from "./components/EditTodoForm/EditTodoForm"
import type { Todo } from "./types/todo"
import CreateTodoFrom from "./components/CreateTodoForm/CreateTodoForm"
function App() {
const [searchQuery, setSearchQuery] = useState<string>("")
const [searchValue] = useDebounce(searchQuery, 1000);
const [isModalOpen, setIsModalOpen] = useState<"" | "createTodo" | "editTodo">("")
const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
const [page, setPage] = useState(1)
const queryParams = {
  searchValue,
  page
}
  const {data, isFetching} = useQuery({
    queryKey: ['todos', searchValue, page],
    queryFn: () => fetchTodos(queryParams),
    placeholderData: keepPreviousData
  })

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 8) : 1

const notes = data?.todos ?? [] 
const openCreateModal = () => {
  setEditingTodo(null);
  setIsModalOpen("createTodo");
  }
  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo)
setIsModalOpen("editTodo")
  }
const closeModal = () => setIsModalOpen("")
  return (
    <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox onChange={setSearchQuery}/>
    
    <button onClick={openCreateModal} className={css.button}>Create note +</button>
  </header>
  <TodoList openEditModal={openEditModal} todos={notes} loading={isFetching}/>
  <Pagination totalPages={totalPages} setPage={setPage}/>
  {isModalOpen && <Modal onClose={closeModal}>
    {isModalOpen === "createTodo" && <CreateTodoFrom onClose={closeModal}/>}
    {isModalOpen === "editTodo" && editingTodo && (
      <EditTodoForm todoToEdit={editingTodo} onClose={closeModal}/>
    )}
    </Modal>}
</div>
  )
}

export default App
