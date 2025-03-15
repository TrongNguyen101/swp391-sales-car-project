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

export const getUserById = async (token) => {
  try {
    const decoded = decodePayload.decodePayload(token);
    const userId = decoded.sub;
    const response = await request.get(`api/Users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
