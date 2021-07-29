import { useState, useEffect, lazy, Suspense, useRef } from "react";
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

const Cast = lazy(() => import("../Cast/Cast" /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import("../Reviews/Reviews" /* webpackChunkName: "reviews" */)
);
const MovieDetailsPage = () => {
  const { url, path } = useRouteMatch();
  const routerState = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState("");

  const handleGoBack = () => {
    const url = routerState.current ? `/movies` : `/`;
    history.push(url);
  };

  useEffect(() => {
    if (!routerState.current) {
      routerState.current = location.state;
    }
    history.state = routerState.current?.params.inputValue;
  }, [history, location.state]);

  useEffect(() => {
    try {
      getMovieById(movieId).then((data) => setMovieInfo(data));
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  return (
    <>
      <button onClick={handleGoBack}>Go Back</button>
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
      <Suspense fallback={<h1> Идет загрузка...</h1>}>
        <Switch>
          <Route path={`/movies/${movieId}/cast`}>
            <Cast movieId={movieId}></Cast>
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews movieId={movieId}></Reviews>
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
