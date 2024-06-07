import fetchApi from "../axios/api";

export const allReviews = async () => {
  const query = `
query{
  reviews{
    id
    rating
    comment
    user {
    name 
    id
    }
    book {
    name 
    id
    }
  }
}
  `;

  try {
    const response = await fetchApi.post("/graphql", { query });

    if (response.data.errors) {
      throw new Error(
        response.data.errors.map((error) => error.message).join(", ")
      );
    }

    return response.data.data.reviews;
  } catch (error) {
    console.error("Error in allReviews:", error);
    throw error;
  }
};

export const newReviews = async (id, comment, rating, user_id, book_id) => {
  try {
    console.log(comment, rating)
    const mutation = `
      mutation {
        createReview(data: {
          rating: ${rating},
          comment: "${comment}",
          user_id: ${user_id},
          book_id: ${book_id}
        }) {
          id
          rating
          comment
          user {name}
          book {name}
        }
      }
    `;

    const response = await fetchApi.post("/graphql", {
      query: mutation,
    });

    if (response.data.errors) {
      throw new Error(
        response.data.errors.map((error) => error.message).join(", ")
      );
    }

    return response.data.data.createReview;
  } catch (error) {
    console.error("Error in newReviews:", error);
    throw error;
  }
};

export const deleteReviews = async (id) => {
  try {
    const response = await fetchApi.delete(`/reviews/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
