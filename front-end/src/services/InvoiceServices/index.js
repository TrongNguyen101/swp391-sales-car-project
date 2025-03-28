import * as request from "../../utils/CarRequest";

export const adminGetAllDepositTransactions = async () => {
  try {
    const response = await request.get("/api/AdminTransactions/getAllDepositTransactions");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const userGetAllTransactions = async () => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.get("/api/AdminTransactions/getAllTransactions",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};


export const getAllAccessoryTransactions = async () => {
  try {
    const response = await request.get("/api/AdminTransactions/getAllAccessoryTransactions");
    return response.data;
  } catch (error) {
    return error.response;
  }
};