import axios from "axios";
import { list } from "../app/list";

const baseURL = "http://www.omdbapi.com";

const movieList = list;

const api = axios.create({
  baseURL,
});

export const getList = () => {
  return movieList;
};

export const getMovieByTitle = (title) =>
  api.get(`/?apikey=16c15d6&t=${title}`);

export const getMovieList = (listId) => {
  return movieList.find((item) => item.id === listId).movies;
};

export const addNewList = (newList) => {
  movieList.push(newList);
  return movieList;
};

export const addMovieToList = (listId, newMovie) => {
  getMovieList(listId).push(newMovie);
  return getMovieList(listId);
};

export const removeMovieFromList = (listId, movie) => {
  getMovieList(listId).forEach((item, index) => {
    if (item.id === movie.id) getMovieList(listId).splice(index, 1);
  });
  return getMovieList(listId);
};
