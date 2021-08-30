import React from 'react';
import { IoIosArrowDown } from 'react-icons/io'
import './styles.css'

const Pagination = ({ currentPage, setCurrentPage, items }) => {

  const lastPage = items.length ? Math.ceil(items.length / 5) : 1

  const forward = () => {
    setCurrentPage(currentPage === lastPage ? lastPage : currentPage + 1)
  }

  const backward = () => {
    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
  }

  return (
    <div className="pagination">
      <IoIosArrowDown
        className={currentPage !== 1 ?
          "left-arrow" : "left-arrow-disabled"}
        onClick={() => backward()}
      />
      <div className="current-page">
        {currentPage}
      </div>
      <IoIosArrowDown
        className={currentPage !== lastPage ?
          "right-arrow" : "right-arrow-disabled"}
        onClick={() => forward()}
      />
    </div>
  );
}

export default Pagination;