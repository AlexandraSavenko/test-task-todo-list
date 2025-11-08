// import type { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import css from "./FilterTodos.module.css"
import { setFilterValue } from "../../redux/todos/slice";

// interface FilterTodosProps {
//   onChange: Dispatch<SetStateAction<string>>;
// }

const FilterTodos= () => {
  const dispatch = useDispatch()
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value;
    const filterTodos =
      filterValue === "isDone"
        ? "true"
        : filterValue === "notDone"
        ? "false"
        : "all";
    dispatch(setFilterValue(filterTodos));
  };
  return (
    <div>
      <select className={css.filterSelect} onChange={handleFilterChange} name="completed">
        <option className={css.selectOption} value="all">select all</option>
        <option className={css.selectOption} value="isDone">is done</option>
        <option className={css.selectOption} value="notDone">not done</option>
      </select>
    </div>
  );
};

export default FilterTodos;
