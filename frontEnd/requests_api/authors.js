import fetchApi from "../axios/api";

export const viewAuthors = async () => {
  const query = `
    query {
      authors {
        id
        name
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

    return response.data.data.authors;
  } catch (error) {
    console.error("Error in viewAuthors:", error);
    throw error;
  }
};

export const findAuthor = async (id) => {
  const query = `
  query {
    author(id: ${id}) {
      id
      name
    }
  }
  `;

  try {
    const response = await fetchApi.post("/graphql", {
      query,
      variables: { id },
    });

    if (!response.data.data.author) {
      throw new Error("No author found for the given ID");
    }

    return response.data.data.author;
  } catch (error) {
    console.error("Error in findAuthor:", error);
    throw error;
  }
};

export const newAuthor = async (name) => {
  console.log(name)
  const mutation = `
  mutation {
    createAuthor(data: { name: "${name}" }) {
      id
      name
    }
  }
  `;

  console.log(mutation)

  try {
    const response = await fetchApi.post("/graphql", {
      query: mutation,
      variables: { name },
    });

    if (response.data.errors) {
      throw new Error(
        response.data.errors.map((error) => error.message).join(", ")
      );
    }

    return response.data.data.createAuthor;
  } catch (error) {
    console.error("Error in newAuthor:", error);
    throw error;
  }
};

export const updateAuthor = async (id, name) => {
  console.log(id, name)
  const mutation = `
  mutation {
    updateAuthor(id: ${id}, author: { name: "${name}" }) {
      id
      name
    }
  }
  `;

  try {
    const response = await fetchApi.post("/graphql", {
      query: mutation,
      variables: { id, author: name },
    });

    if (response.data.errors) {
      throw new Error(
        response.data.errors.map((error) => error.message).join(", ")
      );
    }

    return response.data.data.updateAuthor;
  } catch (error) {
    console.error("Error in updateAuthor:", error);
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  const mutation = `
  mutation{
    removeAuthor(id: ${id}){
      id,
      name
    }
  }
  `;
  console.log(mutation);
  try {
    const response = await fetchApi.post("/graphql", {
      query: mutation,
      variables: { id },
    });
    console.log(response, "response");

    if (response.data.errors) {
      throw new Error(
        response.data.errors.map((error) => error.message).join(", ")
      );
    }

    return response.data.data.removeAuthor;
  } catch (error) {
    console.error("Error in deleteAuthor:", error);
    throw error;
  }
};
