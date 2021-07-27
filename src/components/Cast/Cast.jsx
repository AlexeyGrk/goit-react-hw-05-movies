import { useState, useEffect } from "react";
import {
  CastList,
  CastListContainer,
  CastListItem,
  CastListItemCharacter,
  CastListItemImg,
  CastListItemName,
} from "./Cast.styled";
import { getMoviesCast } from "../../services/apiFetchMovies";

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMoviesCast(movieId).then((data) => setCast(data.cast));
  }, [movieId]);
  return (
    <CastListContainer>
      {cast.length === 0 ? (
        <h3>Sorry,we dont have cast</h3>
      ) : (
        <CastList>
          {cast.slice(0, 10).map((item) => {
            return (
              <CastListItem key={item.id}>
                <CastListItemImg
                  width={80}
                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                ></CastListItemImg>
                <CastListItemName>{item.original_name}</CastListItemName>
                Character
                <CastListItemCharacter>
                  <b>{item.character}</b>
                </CastListItemCharacter>
              </CastListItem>
            );
          })}
        </CastList>
      )}
    </CastListContainer>
  );
};

export default Cast;
