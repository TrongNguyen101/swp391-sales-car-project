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
