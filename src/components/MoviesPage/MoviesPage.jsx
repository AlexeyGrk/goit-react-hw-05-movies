import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  FindMovieContainer,
  FindMovieForm,
  FindMovieInput,
  FindMovieItem,
  FindMovieList,
  FindMovieSubmitButton,
} from "./MoviesPage.styled";
import { getMoviesByWord } from "../../services/apiFetchMovies";

const MoviesPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [films, setFilms] = useState([]);
  const history = useHistory();

  const sumbitForm = (e) => {
    setInputValue("");

    e.preventDefault();
    setInputValue(e.target.elements.inputValue.value);
  };
  useEffect(() => {
    if (history.state) {
      setInputValue(history.state);
      getMoviesByWord(history.state).then((data) => setFilms(data));
    }
  }, [history.state]);
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
          return (
            <Link
              to={{
                pathname: `/movies/${film.id}`,
                state: {
                  params: { inputValue },
                },
              }}
              key={film.id}
            >
              <FindMovieItem>{film.title}</FindMovieItem>
            </Link>
          );
        })}
      </FindMovieList>
    </FindMovieContainer>
  );
};

export default MoviesPage;
