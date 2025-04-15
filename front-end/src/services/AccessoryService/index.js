import * as request from "../../utils/AccessoryRequest";

export const getCategories = async () => {
  try {
    const response = await request.get("/api/Categories");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllAccessories = async () => {
  try {
    const response = await request.get("/api/Accessories");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAccessoriesByCategoryId = async (categoryId) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.get(
      `/api/Accessories/getAccesoriesByCategoryId/${categoryId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAccessoryById = async (accessoryId) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.get(
      `/api/Accessories/${accessoryId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const userGetAccessoryById = async (accessoryId) => {
  try {
    const token = localStorage.getItem("Bearer");
    const endpoint = `/api/Accessories/userGetAccessory/${accessoryId}`;
    const response = await request.get(
      endpoint,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAccessoryImagesByAccessoryId = async (categoryId) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.get(
      `/api/Accessories/image/${categoryId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
