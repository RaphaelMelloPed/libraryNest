import fetchApi from "../axios/api";

export const viewCategories = async () => {
  try {
    const response = await fetchApi.get(`/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newCategories = async (formData) => {
  try {
    const response = await fetchApi.post(`/categories/new`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findCategories = async (id) => {
  try {
    const response = await fetchApi.get(`/categories/${id}`);
    if (!response.data) {
      throw new Error("No category found for the given ID");
    }
    return response.data;
  } catch (error) {
    console.error("Error in findCategory:", error);
    throw error;
  }
};

export const updateCategories = async (id, formData) => {
  try {
    const response = await fetchApi.patch(`/categories/update/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategories = async (id) => {
  try {
    const response = await fetchApi.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
