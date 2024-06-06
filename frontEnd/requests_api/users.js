import fetchApi from "../axios/api";

export const allUsers = async () => {
  const query = `
    query {
      users {
        id
        email
        name
        image
      }
    }
  `;

  try {
    const response = await fetchApi.post('/graphql', { query });
    
    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    return response.data.data.users;
  } catch (error) {
    console.error("Error in allUsers:", error);
    throw error;
  }
};

export const findUser = async (id) => {
  const query = `
    query ($id: ID!) {
      user(id: $id) {
        id
        email
        name
        image
        # Adicione outros campos que deseja retornar para o usuário específico
      }
    }
  `;

  try {
    const response = await fetchApi.post('/graphql', {
      query,
      variables: { id }
    });
    
    if (!response.data.data.user) {
      throw new Error("No user found for the given ID");
    }

    return response.data.data.user;
  } catch (error) {
    console.error("Error in findUser:", error);
    throw error;
  }
};

export const newUsers = async (email, name, password, image) => {
  
  const mutation = `
  mutation {
    createUser(data: {
      email: "${email}"
      name: "${name}"
      password: "${password}"
      image: "${image}"
    }) {
      id
      email
      name
      image
    }
  }
  `;

  try {
    const response = await fetchApi.post('/graphql', {
      query: mutation,
    });
    
    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    return response.data.data.createUser;
  } catch (error) {
    console.error("Error in newUsers:", error);
    throw error;
  }
};


export const loginUser = async (formData) => {
  const { email, password } = formData;
  
  const mutation = `
    mutation ($email: String!, $password: String!) {
      login(input: {
        email: $email
        password: $password
      }) {
        accessToken
        user {
          id
          email
          name
          image
          admin
        }
      }
    }
  `;

  try {
    const response = await fetchApi.post('/graphql', {
      query: mutation,
      variables: { email, password }
    });

    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    console.log(response)

    return response.data.data.login;
  } catch (error) {
    console.error('Error calling the login API:', error.message);
    throw error;
  }
};


export const updateUsers = async (id, formDataObject) => {
  const { email, name, password, image } = formDataObject;
  
  const mutation = `
    mutation ($id: ID!, $email: String!, $name: String!, $password: String!, $image: String!) {
      updateUser(id: $id, input: {
        email: $email
        name: $name
        password: $password
        image: $image
      }) {
        id
        email
        name
        image
        # Adicione outros campos que deseja retornar após a atualização do usuário
      }
    }
  `;

  try {
    const response = await fetchApi.post('/graphql', {
      query: mutation,
      variables: { id, email, name, password, image }
    });
    
    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    return response.data.data.updateUser;
  } catch (error) {
    console.error("Error in updateUsers:", error);
    throw error;
  }
};


export const deleteUsers = async (id) => {
  const mutation = `
    mutation ($id: ID!) {
      removeUser(id: $id) {
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

    return response.data.data.removeUser;
  } catch (error) {
    console.error("Error in deleteUsers:", error);
    throw error;
  }
};

