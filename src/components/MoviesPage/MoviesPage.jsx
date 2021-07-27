import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FindMovieContainer,
  FindMovieForm,
  FindMovieInput,
  FindMovieItem,
  FindMovieList,
  FindMovieSubmitButton,
} from "./MoviesPage.styled";
import { getMoviesByWord } from "../../services/apiFetchMovies";

const MoviesPage = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [films, setFilms] = useState([]);

  const sumbitForm = (e) => {
    e.preventDefault();
    setInputValue(e.target.elements.inputValue.value);
  };
  useEffect(() => {
    if (inputValue === "") {
      return;
    }
    if (inputValue !== "") {
      getMoviesByWord(inputValue).then((data) => setFilms(data));
    }
  }, [inputValue]);
  return (
    <FindMovieContainer>
      <FindMovieForm onSubmit={sumbitForm}>
        <FindMovieInput
          name="inputValue"
          type="text"
          autocomplete="off"
          placeholder="Enter film"
        ></FindMovieInput>
        <FindMovieSubmitButton>Search</FindMovieSubmitButton>
      </FindMovieForm>
      <FindMovieList>
        {films.map((film) => {
          console.log(film);
          return (
            <Link to={`/movies/${film.id}`} key={film.id}>
              <FindMovieItem>{film.title}</FindMovieItem>
            </Link>
          );
        })}
      </FindMovieList>
    </FindMovieContainer>
  );
};

export default MoviesPage;
