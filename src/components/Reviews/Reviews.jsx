import { useState, useEffect } from "react";
import { getMoviesReviews } from "../../services/apiFetchMovies";
import {
  ReviewsContainer,
  ReviewsList,
  ReviewsListItem,
  ReviewsListItemContent,
  ReviewsListItemNameAuthor,
} from "./Reviews.styled";

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getMoviesReviews(movieId).then((data) => setReviews(data));
  }, [movieId]);
  return (
    <ReviewsContainer>
      {reviews.length === 0 ? (
        <h2>Sorry, there are no reviews yet</h2>
      ) : (
        <ReviewsList>
          {reviews.map((item) => {
            return (
              <ReviewsListItem key={item.id}>
                <ReviewsListItemNameAuthor>
                  Author: <b>{item.author}</b>
                </ReviewsListItemNameAuthor>
                <ReviewsListItemContent> {item.content}</ReviewsListItemContent>
              </ReviewsListItem>
            );
          })}
        </ReviewsList>
      )}
    </ReviewsContainer>
  );
};

export default Reviews;
