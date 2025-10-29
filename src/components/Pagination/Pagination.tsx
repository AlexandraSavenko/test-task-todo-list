import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css"

interface PaginationProps {
    totalPages: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}
const Pagination: React.FC<PaginationProps> = ({ totalPages, setPage }) => {
  const handlePageClick = (event: {selected: number}) => {
    setPage(event.selected + 1)
 };
  return (
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        className={css.pagination}
        activeClassName={css.active}
      />
  )
}

export default Pagination
