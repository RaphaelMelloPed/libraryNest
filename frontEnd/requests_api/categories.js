import fetchApi from "../axios/api";

export const viewCategories = async () => {
  const query = `
  query {
    categories{
     id
     name
   }
 }
  `;

  try {
    const data = await fetchApi.post("/graphql", { query });
    return data.data.data.categories;
  } catch (error) {
    throw error;
  }
};

export const findCategories = async (id) => {
  const query = `
    query($id: ID!) {
      category(id: $id) {
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
    return response.data.data.category;
  } catch (error) {
    console.error("Error in findCategory:", error);
    throw error;
  }
};

export const newCategories = async (name) => {
  const mutation = `
    mutation($name: String!) {
      createCategory(data: { name: $name }) {
        id
        name
        # Adicione outros campos que deseja retornar após a criação da categoria
      }
    }
  `;

  try {
    const response = await fetchApi.post("/graphql", {
      query: mutation,
      variables: { name },
    });
    return response.data.data.createCategory;
  } catch (error) {
    console.error("Error in newCategory:", error);
    throw error;
  }
};

export const updateCategories = async (id, name) => {
  const mutation = `
    mutation($id: ID!, $name: String!) {
      updateCategory(id: $id, input: { name: $name }) {
        id
        name
        # Adicione outros campos que deseja retornar após a atualização da categoria
      }
    }
  `;

  try {
    const response = await fetchApi.post("/graphql", {
      query: mutation,
      variables: { id, name },
    });

    if (response.data.errors) {
      throw new Error(
        response.data.errors.map((error) => error.message).join(", ")
      );
    }

    return response.data.data.updateCategory;
  } catch (error) {
    console.error("Error in updateCategory:", error);
    throw error;
  }
};

export const deleteCategories = async (id) => {
  const mutation = `
    mutation($id: ID!) {
      removeCategory(id: $id) {
        id
        name
        # Adicione outros campos que deseja retornar após a exclusão da categoria
      }
    }
  `;

  try {
    const response = await fetchApi.post("/graphql", {
      query: mutation,
      variables: { id },
    });
    return response.data.data.removeCategory;
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    throw error;
  }
};
