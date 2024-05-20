import fetchApi from "../axios/api";

export const allUsers = async () => {
  try {
    const response = await fetchApi.get(`/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findUser = async (id) => {
  try {
    const response = await fetchApi.get(`/users/${id}`);
    if (!response.data) {
      throw new Error("No user found for the given ID"); 
    }
    return response.data;
  } catch (error) {
    console.error("Error in findUser:", error);
    throw error;
  }
};

export const newUsers = async (formDataObject) => {
  try {
    const response = await fetchApi.post(`/users/new`, formDataObject);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await fetchApi.post(`/users/login`, formData);
    return response.data;
  } catch (error) {
    console.error('Erro ao chamar a API de login:', error.message);
    throw error;
  }
};

export const updateUsers = async (id, formDataObject) => {
  try {
    const response = await fetchApi.patch(`/users/update/${id}`, formDataObject);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUsers = async (id) => {
  try {
    const response = await fetchApi.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
