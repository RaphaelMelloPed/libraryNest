import fetchApi from "../axios/api";

export const viewBooks = async () => {
  try {
    const response = await fetchApi.get(`/books`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findBooks = async (id) => {
  try {
    const response = await fetchApi.get(`/books/${id}`);
    if (!response.data) {
      throw new Error("No book found for the given ID"); 
    }
    return response.data;
  } catch (error) {
    console.error("Error in findBooks:", error);
    throw error;
  }
};

export const newBook = async (formDataObject) => {
  try {
    const response = await fetchApi.post(`/books`, formDataObject);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBook = async (id, formDataObject) => {
  try {
    const response = await fetchApi.patch(`/books/${id}`, formDataObject);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBooks = async (id, config) => {
  try {
    const response = await fetchApi.delete(`/books/${id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
