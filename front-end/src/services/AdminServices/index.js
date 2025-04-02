import * as request from "../../utils/AdminRequest";

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("Bearer");
    const enpoint = "api/Users/adminGetAllUsers";
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

export const getAllStaffs = async () => {
  try {
    const token = localStorage.getItem("Bearer");
    const enpoint = "api/Users/adminGetAllStaffs";
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

export const countUsers = async () => {
  try {
    const response = await request.get("api/Users/CountUser");
    return response.data;
  } catch (error) {
    return error.response.data;
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

export const getCurrentManagerProfile = async () => {
  try {
    const token = localStorage.getItem("Bearer");
    const enpoint = "api/Users/getCurrentManagerProfile";
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
    const enpoint = `api/Users/updateUserInformation/${id}`;
    const response = await request.put(
      enpoint,
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

export const adminUpdateStaffInformation = async (
  id,
  fullname,
  address,
  phone
) => {
  try {
    const token = localStorage.getItem("Bearer");
    const enpoint = `api/Users/adminUpdateStaffInformation/${id}`;
    const response = await request.put(
      enpoint,
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
    return error.response.data;
  }
};

export const userUpdateInformation = async (
  fullName,
  email,
  phone,
  address
) => {
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
    return error.response.data;
  }
};

export const adminDeleteStaff = async (staffId) => {
  try {
    const token = localStorage.getItem("Bearer");
    const enpoint = `api/Users/adminDeleteStaff/${staffId}`;
    const response = await request.deleteById(enpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const adminRestoreStaff = async (staffId) => {
  try {
    const token = localStorage.getItem("Bearer");
    const enpoint = `api/Users/adminRestoreStaff/${staffId}`;
    const response = await request.put(
      enpoint,
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
