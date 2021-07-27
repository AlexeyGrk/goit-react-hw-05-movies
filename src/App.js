import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import MainContainer from "./components/MainContainer/MainContainer";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import Navigation from "./components/Navigation/Navigation";
import Home from "./views/Home";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <MainContainer>
        <Switch>
          <Route path="/" exact>
            <Home></Home>
          </Route>
          <Route path="/movies" exact>
            <MoviesPage></MoviesPage>
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage></MovieDetailsPage>
          </Route>
        </Switch>
      </MainContainer>
    </div>
  );
}

export default App;
