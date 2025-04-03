import * as request from "../../utils/AccessoryRequest";

export const getCategories = async () => {
  try {
    const response = await request.get("/api/Categories");
    return response.data;
  } catch (error) {
    return error.response;
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
    const response = await request.get(
      `/api/Accessories/getAccesoriesByCategoryId/${categoryId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAccessoryById = async (accessoryId) => {
  try {
    const response = await request.get(`/api/Accessories/${accessoryId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const userGetAccessoryById = async (accessoryId) => {
  try {
    const endpoint = `/api/Accessories/userGetAccessory/${accessoryId}`;
    const response = await request.get(endpoint);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAccessoryImagesByAccessoryId = async (categoryId) => {
  try {
    const response = await request.get(`/api/Accessories/image/${categoryId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
