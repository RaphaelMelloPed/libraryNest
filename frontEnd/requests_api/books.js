import fetchApi from "../axios/api";

export const viewBooks = async () => {
  const query = `
    query {
      books {
        id
        name
        quantity
        image
        description
        category {
          name
        }
        author {
          name
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

    return response.data.data.books;
  } catch (error) {
    console.error("Error in viewBooks:", error);
    throw error;
  }
};

export const findBooks = async (id) => {
  const query = `
      {
        book(id: ${id}) {
          id
          name
          quantity
          image
          description
          category {
            name
          }
          author {
            name
          }
        }
      }
  `;

  try {
    const response = await fetchApi.post("/graphql", {
      query,
      variables: { id },
    });

    if (!response.data.data.book) {
      throw new Error("No book found for the given ID");
    }

    return response.data.data.book;
  } catch (error) {
    console.error("Error in findBooks:", error);
    throw error;
  }
};

export const newBook = async (
  name,
  quantity,
  description,
  image,
  author_id,
  category_id
) => {
  console.log(image, "imagem")

  const mutation = `
  mutation {
    createBook(data: { 
      name: "${name}"
      quantity: ${quantity}
      image: "${image}"
      description: "${description}"
      category_id: ${category_id}
      author_id: ${author_id}  	
    }) {
      id
      name
      quantity
      image
      description
      category {name}
      author {name}
    }
  }
  `;

  console.log(mutation)

  try {
    const response = await fetchApi.post("/graphql", {
      query: mutation,
    });
    console.log(response)

    if (response.data.errors) {
      throw new Error(
        console.log("DEU ERRO AQUI Ó"),
        response.data.errors.map((error) => error.message).join(", ")
      );
    }
    console.log(response.data.data.createBook)
    return response.data.data.createBook;
  } catch (error) {
    console.error("Error in newBook:", error);
    throw error;
  }
};

export const updateBook = async (
  id,
  name,
  quantity,
  description,
  image,
  author_id,
  category_id
) => {
  console.log(name, quantity, image, description, category_id, author_id);

  const mutation = `
  mutation {
    updateBook(id: ${id}, input: { 
      name: "${name}"
      quantity: ${quantity}
      image: "${image}"
      description: "${description}"
      category_id: ${category_id}
      author_id: ${author_id}
    }) {
      id
      name
      quantity
      image
      description
      category { name }
      author { name }
    }
  }
  `;

  try {
    const response = await fetchApi.post("/graphql", {
      query: mutation,
    });

    if (response.data.errors) {
      throw new Error(
        response.data.errors.map((error) => error.message).join(", ")
      );
    }

    return response.data.data.updateBook;
  } catch (error) {
    console.error("Error in updateBook:", error);
    throw error;
  }
};

export const deleteBooks = async (id) => {
  const mutation = `
    mutation {
      removeBook(id: ${id}) {
        id
        name
      }
    }
  `;

  try {
    const response = await fetchApi.post("/graphql", {
      query: mutation,
      variables: { id },
    });

    if (response.data.errors) {
      throw new Error(
        response.data.errors.map((error) => error.message).join(", ")
      );
    }

    return response.data.data.removeBook;
  } catch (error) {
    console.error("Error in deleteBooks:", error);
    throw error;
  }
};
