import * as request from "../../utils/CarRequest";

export const adminGetAllDepositTransactions = async () => {
  const token = localStorage.getItem("Bearer");
  const endpoint = "/api/AdminTransactions/getAllDepositTransactions";
  try {
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

export const userGetAllTransactions = async () => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.get(
      "/api/AdminTransactions/getAllTransactions",
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

export const getAllAccessoryTransactions = async () => {
  try {
    const token = localStorage.getItem("Bearer");
    const endpoint = "/api/AdminTransactions/getAllAccessoryTransactions";
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

export const getInvoiceItemList = async (invoiceId) => {
  try {
    const response = await request.get(
      `/api/AdminTransactions/getInvoiceItemByInvoiceId/${invoiceId}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getInvoiceById = async (invoiceId) => {
  try {
    const token = localStorage.getItem("Bearer");
    const endpoint = `/api/AdminTransactions/getTransactionById/${invoiceId}`;
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
