import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import MainContainer from "./components/MainContainer/MainContainer";
import Navigation from "./components/Navigation/Navigation";

const Home = lazy(() => import("./views/Home" /* webpackChunkName: "home" */));
const Movies = lazy(() =>
  import("./views/Movies" /* webpackChunkName: "movies" */)
);
const MoviesDetails = lazy(() =>
  import("./views/MoviesDetails" /* webpackChunkName: "movies-details" */)
);
function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Suspense fallback={<h1> Идет загрузка...</h1>}>
        <MainContainer>
          <Switch>
            <Route path="/" exact>
              <Home></Home>
            </Route>
            <Route path="/movies" exact>
              <Movies></Movies>
            </Route>

            <Route path="/movies/:movieId">
              <MoviesDetails></MoviesDetails>
            </Route>
          </Switch>
        </MainContainer>
      </Suspense>
    </div>
  );
}

export default App;
