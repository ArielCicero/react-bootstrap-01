import React from "react";
import Like from "./common/like";
import Table from "./common/table";

const MoviesTable = ({ sortColumn, movies, onSort, onLike, onDelete }) => {
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      content: movie => (
        <Like
          key={movie._id}
          liked={movie.liked}
          onClick={() => onLike(movie)}
        />
      )
    },
    {
      content: movie => (
        <button className="btn btn-danger" onClick={() => onDelete(movie)}>
          Delete
        </button>
      )
    }
  ];
  return (
    <Table
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
      data={movies}
    />
  );
};

export default MoviesTable;
