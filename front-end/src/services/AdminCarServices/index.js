import * as request from "../../utils/CarRequest";

export const adminGetAllCars = async () => {
  try {
    const response = await request.get("/api/AdminCars");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await request.getById(`/api/AdminCars/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const getCarColorById = async (carId) => {
  try {
    const response = await request.getById(`/api/AdminCars/Color/${carId}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export const adminDeleteCar = async (adminCarId) => {
  try {
    const response = await request.put(`/api/AdminCars/delete/${adminCarId}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
}

