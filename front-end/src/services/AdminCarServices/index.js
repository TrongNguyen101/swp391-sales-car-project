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
};

export const getCarColorById = async (carId) => {
  try {
    const response = await request.getById(`/api/AdminCars/Color/${carId}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const adminDeleteCar = async (adminCarId) => {
  try {
    const response = await request.put(`/api/AdminCars/delete/${adminCarId}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const adminAddMoreCar = async (carId) => {
  try {
    const id = carId.carId;
    const quantity = carId.quantity;
    const token = localStorage.getItem("Bearer");
    const response = await request.put(
      `/api/AdminCars/adminAddMoreCar/${id}`,
      { id, quantity },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const adminCreateCar = async (carData) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.post(
      `/api/AdminCars/adminCreateCar`,
      carData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const adminUpdateCar = async (carData) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.put(
      `/api/AdminCars/adminUpdateCar/${carData.carId}`,
      carData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
