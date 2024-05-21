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
  console.log(formDataObject)
  try {
    const response = await fetchApi.post(`/users/`, formDataObject);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (formData) => {
  console.log(formData)
  try {
    const response = await fetchApi.post(`/auth/login`, formData);
    return response.data;
  } catch (error) {
    console.error('Error calling the login API:', error.message);
    throw error;
  }
};

export const updateUsers = async (id, formDataObject) => {
  try {
    const response = await fetchApi.patch(`/users/${id}`, formDataObject);
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
