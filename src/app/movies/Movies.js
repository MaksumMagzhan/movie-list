import React, { Component } from "react";

import {
  getMovieList,
  getMovieByTitle,
  addMovieToList,
  removeMovieFromList,
  getList,
} from "../../services/movies";

import Movie from "./movie/Movie";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddMovieDialog from "../dialog/AddMovieDialog";

import "./Movies.scss";

class Movies extends Component {
  state = {
    currentList: null,
    movies: [],
    filteredMovies: [],
    open: false,
    title: "",
    error: {
      status: false,
      message: "",
    },
  };

  componentDidMount() {
    this.setState(
      {
        currentList: parseInt(this.props.match.params.id, 10),
      },
      () => {
        const list = getList();
        let title = "";
        list.forEach((item) => {
          if (item.id === this.state.currentList) title = item.title;
        });
        this.setState({
          movies: getMovieList(this.state.currentList),
          filteredMovies: getMovieList(this.state.currentList),
          title,
        });
      }
    );
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  addMovie = (title) => {
    getMovieByTitle(title).then((response) => {
      if (!response.data.Error) {
        const newMovie = {
          title: response.data.Title,
          id: response.data.imdbID,
        };
        this.setState(
          {
            movies: addMovieToList(this.state.currentList, newMovie),
          },
          () => {
            this.setState({
              filteredMovies: this.state.movies,
            });
          }
        );
      } else {
        this.setState(
          {
            error: {
              status: true,
              message: response.data.Error,
            },
          },
          () => {
            setTimeout(() => {
              this.setState({
                error: {
                  status: false,
                  message: response.data.Error,
                },
              });
            }, 5000);
          }
        );
      }
    });
    this.handleClose();
  };

  removeMovie = (movie) => {
    this.setState({
      movies: removeMovieFromList(this.state.currentList, movie),
      filteredMovies: removeMovieFromList(this.state.currentList, movie),
    });
  };

  handleTitleChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const list = this.state.movies;
    this.setState({
      filteredMovies: list.filter((movie) =>
        movie.title.toLowerCase().includes(searchValue)
      ),
    });
  };

  render() {
    const { filteredMovies, open, title, error } = this.state;
    return (
      <div className="movies container">
        <div className="movies__header">
          <h2>{title}</h2>
          <div className="movies__action">
            <TextField
              margin="dense"
              id="title"
              label="Title"
              type="text"
              onChange={(event) => this.handleTitleChange(event)}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickOpen}
            >
              Add Movie
            </Button>
          </div>
        </div>
        <div className="free-space">
          {error.status ? (
            <div className="error">{error.message}</div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="movies-list">
          {filteredMovies.length ? (
            filteredMovies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  movie={movie}
                  onMovieDelete={this.removeMovie}
                ></Movie>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
        <AddMovieDialog
          open={open}
          handleClose={this.handleClose}
          addMovie={this.addMovie}
        ></AddMovieDialog>
      </div>
    );
  }
}

export default Movies;
