import * as request from "../../utils/AdminRequest";

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.get("api/Users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const countUsers = async () => {
  try {
    const response = await request.get("api/Users/CountUser");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.get(`api/Users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("Bearer");
    const enpoint = "api/Users/currentUserProfile";
    const response = await request.get(enpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const findUserByEmail = async (email) => {
  try {
    const response = await request.get(`api/Users/Search/${email}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const UpdateUser = async (id, fullname, address, phone) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.put(
      `api/Users/Update/${id}`,
      {
        userName: fullname,
        address: address,
        phone: phone,
      },
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

export const userUpdateInformation = async (fullName, email, phone, address) => {
  try {
    const token = localStorage.getItem("Bearer");
    const enpoint = "api/Users/userUpdateInformation";
    const response = await request.put(
      enpoint,
      {
        userName: fullName,
        email: email,
        address: address,
        phone: phone,
      },
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
