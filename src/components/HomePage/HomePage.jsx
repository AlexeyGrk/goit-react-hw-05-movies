import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PopularMoviesList,
  PopularMoviesListContainer,
  PopularMoviesListItem,
} from "./HomePage.styled";
import { getPopularMovies } from "../../services/apiFetchMovies";

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    if (popularMovies.length === 0) {
      try {
        getPopularMovies().then((data) => {
          setPopularMovies((prevState) => [...data, ...prevState]);
        });
      } catch (error) {
        return error.message;
      }
    }
  }, [popularMovies.length]);

  return (
    <PopularMoviesListContainer>
      <PopularMoviesList>
        {popularMovies.map((film) => {
          return (
            <Link to={`/movies/${film.id}`} key={film.id}>
              <PopularMoviesListItem>{film.title}</PopularMoviesListItem>
            </Link>
          );
        })}
      </PopularMoviesList>
    </PopularMoviesListContainer>
  );
};

export default HomePage;
