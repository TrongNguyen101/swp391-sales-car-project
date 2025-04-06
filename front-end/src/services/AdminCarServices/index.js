import * as request from "../../utils/CarRequest";

export const adminGetAllCars = async () => {
  try {
    const endpoint = "/api/AdminCars";
    const token = localStorage.getItem("Bearer");
    const response = await request.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const staffGetAllCars = async () => {
  try {
    const endpoint = "/api/AdminCars/StaffGetAllCars";
    const token = localStorage.getItem("Bearer");
    const response = await request.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const userGetAllCars = async () => {
  try {
    const endpoint = "/api/AdminCars/UserGetAllCars";
    const response = await request.get(endpoint);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const adminGetCarById = async (id) => {
  try {
    const token = localStorage.getItem("Bearer");
    const endpoint = `/api/AdminCars/${id}`;
    const response = await request.getById(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
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
    const token = localStorage.getItem("Bearer");
    const endpoint = `/api/AdminCars/deleteCar/${adminCarId}`;
    const response = await request.deleteId(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const adminRestoreCar = async (adminCarId) => {
  try {
    const token = localStorage.getItem("Bearer");
    const endpoint = `/api/AdminCars/adminRestoreCar/${adminCarId}`;
    const response = await request.put(
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
    return error.response.data;
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
    return error.response.data;
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
    return error.response.data;
  }
};

// upload image services
export const uploadImageOfCar = async (carId, formData) => {
  try {
    const endpoint = `/api/AdminCars/adminUpdateImageCar/${carId}`;
    const token = localStorage.getItem("Bearer");
    const response = await request.put(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const deleteImageOfCar = async (adminCarId, typeOfImage) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.put(
      `/api/AdminCars/adminDeleteImageOfCar/${adminCarId}/${typeOfImage}`,
      {},
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

// color image services
export const uploadColorImageOfCar = async (formData) => {
  try {
    const endpoint = "api/AdminCars/adminUpdateColorImageCar";
    const token = localStorage.getItem("Bearer");
    const response = await request.post(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const deleteColorImageOfCar = async (idImageColor) => {
  try {
    const endpoint = `api/AdminCars/adminDeleteColorImageCar/${idImageColor}`;
    const token = localStorage.getItem("Bearer");
    const response = await request.deleteId(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
