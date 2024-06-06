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
    {
      category(id: ${id}) {
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

export const newCategories = async (id, formData) => {
  const query = `
    mutation CreateCategory(${id}: Number!, ${formData}: String!) {
      createCategory(data: { id: ${id}, name: ${formData} }) {
        id
        name
      }
    }
  `;

  const variables = { formData };

  try {
    const response = await fetchApi.post("/graphql", { query, variables });
    return response.data.data.createCategory;
  } catch (error) {
    console.error("Error in newCategories:", error);
    throw error;
  }
};


export const updateCategories = async (id, formData) => {
  const mutation = `
    {
      updateCategory(id: ${id}, input: { name: ${formData.name} }) {
        id
        name
      }
    }
  `;
    console.log(mutation)
  try {
    const response = await fetchApi.post("/graphql", {
      query: mutation,
      variables: { id, formData },
    });
    console.log(response, "response")

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
    {
      removeCategory(id: ${id}) {
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
    return response.data.data.removeCategory;
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    throw error;
  }
};
