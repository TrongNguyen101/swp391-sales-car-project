import * as request from "../../utils/CarRequest";

export const getCar = async () => {
  try {
    const response = await request.get("/api/Cars");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await request.getById(`/api/Cars/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}