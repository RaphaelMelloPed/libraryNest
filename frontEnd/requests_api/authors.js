import fetchApi from "../axios/api";

export const viewAuthors = async () => {
  try {
    const response = await fetchApi.get(`/authors`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findAuthor = async (id) => {
  try {
    const response = await fetchApi.get(`/authors/${id}`);
    if (!response.data) {
      throw new Error("No author found for the given ID");
    }
    return response.data;
  } catch (error) {
    console.error("Error in findAuthor:", error);
    throw error;
  }
};

export const newAuthor = async (formData) => {
  try {
    const response = await fetchApi.post(`/authors/`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAuthor = async (id, formData) => {
  try {
    const response = await fetchApi.patch(`/authors/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    const response = await fetchApi.delete(`/authors/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
