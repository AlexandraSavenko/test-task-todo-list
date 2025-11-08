import { useEffect, useState } from "react";
import css from "./SearchBox.module.css";
import { useDebounce } from "use-debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/todos/slice";

// interface SearchBoxProps {
//   onChange: Dispatch<SetStateAction<string>>;
// }
const SearchBox = () => {
  const dispatch = useDispatch()
        const [searchQuery, setSearchQuery] = useState<string>("");
        const [searchValue] = useDebounce(searchQuery, 1000);
        useEffect(() => {
          dispatch(setSearchValue(searchValue))
        }, [searchValue, dispatch])
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
  };
  return (
    <div>
      <input
        id="searchBox"
        onChange={handleInputChange}
        className={css.input}
        type="text"
        placeholder="Search notes"
      />
    </div>
  );
};

export default SearchBox;
