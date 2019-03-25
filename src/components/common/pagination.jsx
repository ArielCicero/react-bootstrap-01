import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ onPageChange, pageSize, itemsCount, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${currentPage === page && "active"}`}
          >
            <span onClick={() => onPageChange(page)} className="page-link">
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  // ins this object we add the props for our component
  // as well as their types and whether they are required or not

  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
