import fetchApi from "../axios/api";

export const allRents = async () => {
  const query = `
  query{
    rents{
      id
      pick_up_date
      returns_date
      user{
        id
        name
      }
      book{
        id
        name
      }
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
    return response.data.data.rents;
  } catch (error) {
    console.error("Error in allRents:", error);
    throw error;
  }
};



export const findRents = async (id) => {
  const query = `
    {
      rent(id: ${id}) {
        id
        pick_up_date
        returns_date
        user{
          id
          name
        }
        book{
          id
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

    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    const rent = response.data.data.rent;
    return {
      ...rent,
      pick_up_date: rent.pick_up_date,
      returns_date: rent.returns_date,
    };
  } catch (error) {
    console.error("Error in findRents:", error);
    throw error;
  }
};


export const newRents = async (rentData) => {
  const mutation = `
    mutation(${input}: RentCreateInput!) {
      createRent(data: ${input}) {
        id
        pick_up_date
        returns_date
        book { id }
        user { id }
      }
    }
  `;

  const variables = {
    input: rentData
  };

  try {
    const response = await fetchApi.post('/graphql', {
      query: mutation,
      variables
    });

    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    const newRent = response.data.data.createRent;
    return {
      ...newRent,
      pick_up_date: newRent.pick_up_date,
      returns_date: newRent.returns_date,
    };
  } catch (error) {
    console.error("Error in newRents:", error);
    throw error;
  }
};

export const updateRents = async (id, rents, renewed) => {
  const mutation = `
    {
      updateRent(id: ${id}, input: ${input}) {
        id
        pick_up_date
        returns_date
        book { 
          id
          name
        }
        user { id }
      }
    }
  `;

  const variables = {
    id,
    input: { ...rents, renewed }
  };

  try {
    const response = await fetchApi.post('/graphql', {
      query: mutation,
      variables
    });

    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    const updatedRent = response.data.data.updateRent;
    return {
      ...updatedRent,
      pick_up_date: updatedRent.pick_up_date,
      returns_date: updatedRent.returns_date,
    };
  } catch (error) {
    console.error("Error in updateRents:", error);
    throw error;
  }
};

export const deleteRents = async (id) => {
  const mutation = `
    mutation($id: Number!) {
      removeRent(id: $id) {
        id
      }
    }
  `;

  const variables = { id };

  try {
    const response = await fetchApi.post('/graphql', {
      query: mutation,
      variables
    });

    if (response.data.errors) {
      throw new Error(response.data.errors.map(error => error.message).join(', '));
    }

    return response.data.data.removeRent;
  } catch (error) {
    console.error("Error in deleteRents:", error);
    throw error;
  }
};
