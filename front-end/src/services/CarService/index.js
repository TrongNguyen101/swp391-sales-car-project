import * as request from "../../utils/CarRequest";

export const getCar = async () => {
  try {
    const response = await request.get("/api/Cars");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await request.getById(`/api/Cars/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const userGetCarById = async (id) => {
  try {
    const endpoint = `/api/Cars/userGetCar/${id}`;
    const response = await request.getById(endpoint);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCarColorById = async (carId) => {
  try {
    const response = await request.getById(`/api/Cars/Color/${carId}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
