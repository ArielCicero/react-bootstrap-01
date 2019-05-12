import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import _ from "lodash";

import { paginate, paginate2 } from "../utils/functions";

class Movies extends Component {
  constructor() {
    super();

    this.state = {
      pageSize: 4,
      movies: [],
      sortColumn: { path: "title", order: "asc" },
      currentPage: 1,
      genres: []
    };
  }

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "000" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(
      eachMovie => eachMovie._id !== movie._id
    );

    let { currentPage, pageSize } = this.state;

    if (_.chunk(movies, pageSize).length !== currentPage && currentPage > 0)
      currentPage--;
    this.setState({ movies, currentPage });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handdlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn
    } = this.state;

    let filtered =
      selectedGenre && selectedGenre._id !== "000"
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;
    const ordered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate2(ordered, pageSize, currentPage);
    return { totalCount: filtered.length, movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;
    // const { length: moviesCount } = allMovies;
    if (!allMovies.length) return <p>There are no movies in the database.</p>;
    const { totalCount, movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
            cssClasses="clickable"
            // textProperty="name"
            // valueProperty="_id"
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            onPageChange={this.handdlePageChange}
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
