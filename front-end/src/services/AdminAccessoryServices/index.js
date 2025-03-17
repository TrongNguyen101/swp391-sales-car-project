import * as request from "../../utils/AccessoryRequest";

export const adminGetAllAccessories = async () => {
  try {
    const response = await request.get("/api/AdminAccessories");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const adminCreateAccessory = async (accessoryData) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.post(
      `/api/AdminAccessories/adminCreateAccessory`,
      accessoryData,
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

export const adminDeleteAccessory = async (adminAccesoryId) => {
  try {
    const response = await request.deletebyId(`/api/AdminAccessories/delete/${adminAccesoryId}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};


export const getAccessoryById = async (id) => {
  try {
    const response = await request.get(`/api/AdminAccessories/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
