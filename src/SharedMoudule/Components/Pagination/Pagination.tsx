import { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function Pagination({ pageNum, pagesArray, setPageNum }) {
  const [currentPage, setCurrentPage] = useState(pageNum);
  const itemsPerPage = 5;
  const startIndex = Math.max(1, currentPage - Math.floor(itemsPerPage / 2));
  const endIndex = Math.min(startIndex + itemsPerPage - 1, pagesArray.length);

  useEffect(() => {
    setCurrentPage(pageNum);
  }, [pageNum]);

  const handleNext = () => {
    if (currentPage < pagesArray.length) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setPageNum(currentPage + 1);
      }, 500);
    } else {
      toast.error("You are already on the last page");
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setPageNum(currentPage - 1);
      }, 500);
    } else {
      toast.error("You are already on the first page");
    }
  };

  const handleClickPage = (pageIndex) => {
    setCurrentPage(pageIndex);
    setPageNum(pageIndex);
  };

  return (
    <nav
      className="d-flex justify-content-center mt-3"
      aria-label="Page navigation"
    >
      <ul className="pagination">
        <li className="page-item">
          <button
            className="border-0 p-0"
            type="button"
            onClick={handlePrevious}
          >
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </button>
        </li>
        {pagesArray.slice(startIndex - 1, endIndex).map((page, index) => (
          <li
            key={startIndex + index}
            className={`page-item ${
              startIndex + index === currentPage ? "active" : ""
            }`}
          >
            <button
              className="border-0 p-0"
              type="button"
              onClick={() => handleClickPage(startIndex + index)}
            >
              <a
                className={`page-link ${
                  startIndex + index === currentPage ? "active-link" : ""
                }`}
              >
                {page}
              </a>
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="border-0 p-0" type="button" onClick={handleNext}>
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </button>
        </li>
      </ul>
    </nav>
  );
}
