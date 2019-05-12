import React from "react";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = path => {
    if (path) {
      if (sortColumn.path === path)
        sortColumn.order = sortColumn.order === "desc" ? "asc" : "desc";
      else {
        sortColumn.path = path;
        sortColumn.order = "asc";
      }
      onSort(sortColumn);
    }
  };

  const renderSortIcon = column => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th
            className={column.label ? "clickable" : ""}
            key={index}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
