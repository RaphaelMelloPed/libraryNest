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
    const response = await fetchApi.post('/graphql', { query });
    
    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    return response.data.data.books;
  } catch (error) {
    console.error("Error in viewBooks:", error);
    throw error;
  }
};

export const findBooks = async (id) => {
  const query = `
    query ($id: ID!) {
      book(id: $id) {
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
    const response = await fetchApi.post('/graphql', {
      query,
      variables: { id }
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

export const newBook = async (formData) => {
  const { name, quantity, image, description, categoryId, authorId } = formData;
  
  const mutation = `
    mutation ($name: String!, $quantity: Int!, $image: String!, $description: String!, $categoryId: ID!, $authorId: ID!) {
      createBook(data: {
        name: $name
        quantity: $quantity
        image: $image
        description: $description
        categoryId: $categoryId
        authorId: $authorId
      }) {
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
        # Adicione outros campos que deseja retornar após a criação do livro
      }
    }
  `;

  try {
    const response = await fetchApi.post('/graphql', {
      query: mutation,
      variables: { name, quantity, image, description, categoryId, authorId }
    });
    
    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    return response.data.data.createBook;
  } catch (error) {
    console.error("Error in newBook:", error);
    throw error;
  }
};

export const updateBook = async (id, formData) => {
  const { name, quantity, image, description, categoryId, authorId } = formData;
  
  const mutation = `
    mutation ($id: ID!, $name: String!, $quantity: Int!, $image: String!, $description: String!, $categoryId: ID!, $authorId: ID!) {
      updateBook(id: $id, input: {
        name: $name
        quantity: $quantity
        image: $image
        description: $description
        categoryId: $categoryId
        authorId: $authorId
      }) {
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
    const response = await fetchApi.post('/graphql', {
      query: mutation,
      variables: { id, name, quantity, image, description, categoryId, authorId }
    });
    
    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    return response.data.data.updateBook;
  } catch (error) {
    console.error("Error in updateBook:", error);
    throw error;
  }
};


export const deleteBooks = async (id) => {
  const mutation = `
    mutation ($id: ID!) {
      removeBook(id: $id) {
        id
        name
      }
    }
  `;

  try {
    const response = await fetchApi.post('/graphql', {
      query: mutation,
      variables: { id }
    });
    
    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    return response.data.data.removeBook;
  } catch (error) {
    console.error("Error in deleteBooks:", error);
    throw error;
  }
};

