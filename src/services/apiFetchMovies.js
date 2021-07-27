import axios from "axios";

export async function getPopularMovies() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/all/week?api_key=d2f58f193ec10f64760e31baa52fd192"
  );

  const data = response.data.results;
  return data;
}

export async function getMovieById(id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d2f58f193ec10f64760e31baa52fd192&language=en-US`
  );

  const data = response.data;
  return data;
}

export async function getMoviesCast(id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=d2f58f193ec10f64760e31baa52fd192&language=en-US`
  );

  const data = response.data;
  return data;
}

export async function getMoviesReviews(id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=d2f58f193ec10f64760e31baa52fd192&language=en-US&page=1`
  );

  const data = response.data.results;
  return data;
}

export async function getMoviesByWord(inputValue) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=d2f58f193ec10f64760e31baa52fd192&language=en-US&query=${inputValue}&page=1&include_adult=false`
  );

  const data = response.data.results;
  return data;
}
