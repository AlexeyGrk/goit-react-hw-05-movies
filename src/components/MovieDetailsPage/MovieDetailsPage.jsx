import { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { NavigationLink } from "../Navigation/Navigation.styled";
import { useParams } from "react-router-dom";
import {
  MovieDetailsPageCastAndCommentsContainer,
  MovieDetailsPageContainer,
  MovieDetailsPageDescriptionContainer,
  MovieDetailsPageGenres,
  MovieDetailsPageImage,
  MovieDetailsPageOverview,
  MovieDetailsPageScore,
  MovieDetailsPageTitle,
} from "./MovieDetailsPage.styled";
import { getMovieById } from "../../services/apiFetchMovies";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
const MovieDetailsPage = () => {
  const { url, path } = useRouteMatch();
  //   const history = useHistory();
  //   console.log(history);
  //   const location = useLocation();
  //   console.log(location);

  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState("");

  useEffect(() => {
    try {
      getMovieById(movieId).then((data) => setMovieInfo(data));
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  return (
    <>
      <MovieDetailsPageContainer>
        {movieInfo && (
          <MovieDetailsPageImage
            width="250"
            src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`}
            alt="film-poster"
          />
        )}
        <MovieDetailsPageDescriptionContainer>
          <MovieDetailsPageTitle>{movieInfo.title}</MovieDetailsPageTitle>
          <MovieDetailsPageScore>
            User Score : {movieInfo.vote_average * 10} %
          </MovieDetailsPageScore>
          <h3>Overview</h3>
          <MovieDetailsPageOverview>
            <br />
            {movieInfo.overview}
          </MovieDetailsPageOverview>
          <h3>Genres</h3>
          {
            <MovieDetailsPageGenres MovieDetailsPageGenres>
              <br />
              {movieInfo &&
                movieInfo.genres
                  .map(({ name }) => {
                    return name;
                  })
                  .join(",  ")}
            </MovieDetailsPageGenres>
          }
        </MovieDetailsPageDescriptionContainer>
      </MovieDetailsPageContainer>
      <MovieDetailsPageCastAndCommentsContainer>
        <NavigationLink to={`${url}/cast`}>Cast</NavigationLink>
        <NavigationLink to={`${url}/reviews`}>Reviews</NavigationLink>
      </MovieDetailsPageCastAndCommentsContainer>
      <Switch>
        <Route path={`/movies/${movieId}/cast`}>
          <Cast movieId={movieId}></Cast>
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews movieId={movieId}></Reviews>
        </Route>
      </Switch>
    </>
  );
};

export default MovieDetailsPage;
