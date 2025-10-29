import { keepPreviousData, useQuery } from "@tanstack/react-query"
import css from "./App.module.css"
import { useEffect, useState } from "react"
import { fetchNotes } from "./services/noteService"
import NoteList from "./components/NoteList/NoteList"
import Pagination from "./components/Pagination/Pagination"
import Modal from "./components/Modal/Modal"
import SearchBox from "./components/SearchBox/SearchBox"
import { useDebounce } from 'use-debounce';
function App() {
const [searchQuery, setSearchQuery] = useState<string>("")
const [searchValue] = useDebounce(searchQuery, 1000);
const [isModalOpen, setIsModalOpen] = useState(false)
const [page, setPage] = useState(1)
const queryParams = {
  searchValue,
  page
}
useEffect(()=> {console.log(searchValue)}, [searchQuery, searchValue])
  const {data, isFetching} = useQuery({
    queryKey: ['notes', searchValue, page],
    queryFn: () => fetchNotes(queryParams),
    placeholderData: keepPreviousData
  })
const notes = data?.notes ?? [] 
const totalPages = data?.totalPages ?? 1
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false)
  return (
    <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox onChange={setSearchQuery}/>
    <Pagination totalPages={totalPages} setPage={setPage}/>
    <button onClick={openModal} className={css.button}>Create note +</button>
  </header>
  <NoteList notes={notes} loading={isFetching}/>
  {isModalOpen && <Modal onClose={closeModal}/>}
</div>
  )
}

export default App
