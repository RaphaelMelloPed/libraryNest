import Box from "@mui/material/Box";
import ReviewsCard from "./ReviewsCard";
import Rating from "@mui/material/Rating";
import { Pagination } from "flowbite-react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { findBooks } from "../../../../requests_api/books";
import { newReviews, allReviews } from "../../../../requests_api/reviews";

export default function NewReview() {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [review, setReview] = useState([]);
  const [books, setBooks] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!JSON.parse(localStorage.getItem("user"))
  );
  const [formData, setFormData] = useState({
    comment: "",
    rating: "1",
    user_id: isLoggedIn ? JSON.parse(localStorage.getItem("user")).user.id : null,
    book_id: id,
  });

  const reloadPage = () => {
    window.location.reload();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue.toString(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await newReviews(id, formData);
    } catch (error) {
      console.error("Error calling API:", error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          const bookResponse = await findBooks(id);
          setBooks(bookResponse[0]);

          const reviewResponse = await allReviews(id);
          const reviewsArray = reviewResponse;
          setReview(reviewResponse);
          setTotalPages(Math.ceil(reviewsArray.length / 3));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [id, isLoggedIn]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastAuthor = currentPage * 3;
  const indexOfFirstAuthor = indexOfLastAuthor - 3;
  const currentReview = review.slice(indexOfFirstAuthor, indexOfLastAuthor);
  return (
    <div className="flex justify-center mt-5">
      <div className="w-full p-5">
        <div>
          {isLoggedIn ? (
            <form onSubmit={handleSubmit}>
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-800 dark:bg-gray-700 dark:border-gray-600">
                <h5 className="flex justify-center ml-1 text-2xl text-white mt-2 mb-2 p-1">
                  Comment
                </h5>

                <Box sx={{ "& > legend": { mt: 2 } }}>
                  <Typography
                    component="legend"
                    className="text-white text-start"
                  >
                    <label htmlFor="rating" className="text-3xl ml-1">
                      Rating:
                    </label>
                  </Typography>
                  <div className="flex justify-start bg-slate-100 p-2">
                    <Rating
                      name="simple-controlled"
                      value={parseInt(formData.rating)}
                      max={5}
                      id="rating"
                      onChange={handleRatingChange}
                    />
                  </div>
                </Box>

                <div className="px-2 py-1 m-2 bg-white rounded-t-lg border-t">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    className="w-full px-0 text-sm bg-gray-100 border-0 focus:ring-0 text-black placeholder-gray-400 rounded-md"
                    placeholder="Write a comment"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-green-800 w-full"
                    disabled={isSubmitting}
                    onClick={reloadPage}
                  >
                    <p className="mx-auto">Post comment</p>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <form onSubmit={handleSubmit} disabled={true}>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-800 dark:bg-gray-700 dark:border-gray-600">
                  <h5 className="flex justify-center ml-1 text-2xl text-white mt-2 mb-2 p-1">
                    Comment
                  </h5>

                  <Box sx={{ "& > legend": { mt: 2 } }}>
                    <Typography
                      component="legend"
                      className="text-white text-start"
                    >
                      <label htmlFor="rating" className="text-3xl ml-1">
                        Rating:
                      </label>
                    </Typography>
                    <div className="flex justify-start bg-slate-100 p-2">
                      <Rating
                        name="simple-controlled"
                        value={parseInt(formData.rating)}
                        max={5}
                        id="rating"
                        onChange={handleRatingChange}
                        disabled={true}
                      />
                    </div>
                  </Box>

                  <div className="px-2 py-1 m-2 bg-white rounded-t-lg border-t">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      rows="4"
                      className="w-full px-0 text-sm bg-gray-100 border-0 focus:ring-0 text-black placeholder-gray-400 rounded-md"
                      placeholder="Write a comment"
                      onChange={handleChange}
                      disabled={true}
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 text-center">
                    <button
                      type="submit"
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-green-800 w-full"
                      disabled={true}
                      onClick={reloadPage}
                    >
                      <p className="mx-auto">
                        Please log in to leave a review.
                      </p>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {currentReview.map((reviews) => (
            <ReviewsCard
              key={reviews.id}
              id={reviews.id}
              comment={reviews.comment}
              rating={reviews.rating}
              book_id={reviews.book.id}
              review_id={reviews.id}
              user_id={reviews.user.id}
            />
          ))}

          {totalPages !== 0 && totalPages !== 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                layout="pagination"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                previousLabel="Back"
                nextLabel="Next"
                showIcons
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
