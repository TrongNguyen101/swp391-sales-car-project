import * as request from "../../utils/AccessoryRequest";

export const adminGetAllAccessories = async () => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.get(
      "/api/AdminAccessories",
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

export const staffGetAllAccessories = async () => {
  try {
    const token = localStorage.getItem("Bearer");
    const endpoint = `/api/AdminAccessories/staffGetAllAccessories`;
    const response = await request.get(
      endpoint,
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
    return error.response.data;
  }
};

// upload image services
export const adminUpdateAccessory = async (adminAccessoryId, formData) => {
  try {
    const endpoint = `/api/AdminAccessories/adminUpdateAccessory/${adminAccessoryId}`;
    const token = localStorage.getItem("Bearer");
    const response = await request.put(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const adminDeleteAccessory = async (adminAccesoryId) => {
  try {
    const token = localStorage.getItem("Bearer");
    const endpoint = `/api/AdminAccessories/delete/${adminAccesoryId}`;
    const response = await request.deletebyId(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const adminRestoreAccessory = async (adminAccesoryId) => {
  try {
    const token = localStorage.getItem("Bearer");
    const endpoint = `/api/AdminAccessories/adminRestoreAccessory/${adminAccesoryId}`;
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

export const getAccessoryById = async (id) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.get(
      `/api/AdminAccessories/${id}`,
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

// upload image services
export const adminUploadImageOfAccessory = async (
  adminAccessoryId,
  formData
) => {
  try {
    const endpoint = `/api/AdminAccessories/adminUpdateImageAccessory/${adminAccessoryId}`;
    const token = localStorage.getItem("Bearer");
    const response = await request.put(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete image services
export const adminDeleteImageOfAccessory = async (
  adminAccessoryId,
  typeOfImage
) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.put(
      `/api/AdminAccessories/adminDeleteImageOfAccessory/${adminAccessoryId}/${typeOfImage}`,
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
    return error.response.data;
  }
};

// upload image services
export const uploadImageDetailOfAccessory = async (formData) => {
  try {
    const endpoint = `/api/AdminAccessories/adminUpdateDetailImageAccessory`;
    const token = localStorage.getItem("Bearer");
    const response = await request.post(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete detail image services
export const deleteImageDetailOfAccessory = async (idImageDetail) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.deletebyId(
      `/api/AdminAccessories/adminDeleteDetailImageAccessory/${idImageDetail}`,
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
