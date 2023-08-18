import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";
import ReviewForm from "./ReviewForm";

const API = import.meta.env.VITE_BASE_URL;

function Reviews() {
  const [reviews, setReviews] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetch(`${API}/bookmarks/${id}/reviews`)
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        setReviews(responseJSON.reviews);
      });
  }, [id, API]);

  const handleAdd = (newReview) => {
    fetch(`${API}/bookmarks/${id}/reviews`, {
      method: "POST",
      body: JSON.stringify(newReview),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        setReviews([responseJSON, ...reviews]);
      })
      .catch((c) => console.warn("catch", c));
  };

  const handleDelete = (id) => {
    fetch(`${API}/bookmarks/${id}/reviews/${id}`, {
      method: "DELETE",
    })
      .then(
        (response) => {
          const copyReviewArray = [...reviews];
          const indexDeletedReview = copyReviewArray.findIndex((review) => {
            return review.id === id;
          });
          copyReviewArray.splice(indexDeletedReview, 1);
          setReviews(copyReviewArray);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleEdit = (updatedReview) => {
    fetch(`${API}/bookmarks/${id}/reviews/${updatedReview.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedReview),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        const copyReviewArray = [...reviews];
        const indexUpdatedReview = copyReviewArray.findIndex((review) => {
          return review.id === updatedReview.id;
        });
        copyReviewArray[indexUpdatedReview] = responseJSON;
        setReviews(copyReviewArray);
      })
      .catch((c) => console.warn("catch", c));
  };

  return (
    <section className="Reviews">
      <ReviewForm handleSubmit={handleAdd} />
      {reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
          handleSubmit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </section>
  );
}

export default Reviews;
