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
    return error.response;
  }
};
