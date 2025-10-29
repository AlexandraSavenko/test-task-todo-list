import { keepPreviousData, useQuery } from "@tanstack/react-query"
import css from "./App.module.css"
import { useState } from "react"
import Pagination from "./components/Pagination/Pagination"
import Modal from "./components/Modal/Modal"
import SearchBox from "./components/SearchBox/SearchBox"
import { useDebounce } from 'use-debounce';
import TodoList from "./components/TodoList/TodoList"
import { fetchTodos } from "./services/todoService"
function App() {
const [searchQuery, setSearchQuery] = useState<string>("")
const [searchValue] = useDebounce(searchQuery, 1000);
const [isModalOpen, setIsModalOpen] = useState(false)
const [page, setPage] = useState(1)
const queryParams = {
  searchValue,
}
// useEffect(()=> {console.log(searchValue)}, [searchQuery, searchValue])
  const {data, isFetching} = useQuery({
    queryKey: ['todos', searchValue],
    queryFn: () => fetchTodos(queryParams),
    placeholderData: keepPreviousData
  })
const notes = data ?? [] 
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false)
  return (
    <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox onChange={setSearchQuery}/>
    {/* <Pagination totalPages={2} setPage={setPage}/> */}
    <button onClick={openModal} className={css.button}>Create note +</button>
  </header>
  <TodoList todos={notes} loading={isFetching}/>
  {isModalOpen && <Modal onClose={closeModal}/>}
</div>
  )
}

export default App
