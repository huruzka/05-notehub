import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css"

interface PaginationProps {
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    curPage: number; 
}

const Pagination = ({
    pageCount,
    onPageChange,
    curPage,
}: PaginationProps) => {
    return (
        <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={onPageChange}
            forcePage={curPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
        />
     
    );
};

export default Pagination