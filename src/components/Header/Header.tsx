import FilterTodos from "../FilterTodos/FilterTodos";
import SearchBox from "../SearchBox/SearchBox";
import css from "./Header.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { setModalOpen } from "../../redux/modal/slice";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const openCreateModal = () => {
    dispatch(setModalOpen("createTodo"));
  };
  return (
    <header className={css.toolbar}>
      <SearchBox />
      <FilterTodos />
      <button onClick={openCreateModal} className={css.button}>
        Create todo +
      </button>
    </header>
  );
};

export default Header;
