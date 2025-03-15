import { decodePayload } from "../../lib/DecodePayload";
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
