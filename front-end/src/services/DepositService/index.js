import * as request from "../../utils/DepositPayment";

// Create payment for deposit car
export const createPaymentURL = async (depositInfo) => {
  const token = localStorage.getItem("Bearer");
  try {
    // call API to create payment for deposit car
    const response = await request.post(
      "/api/Payment/CreatePaymentUrl",
      depositInfo,
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

// Create invoice for deposit
export const createInvoice = async (invoiceData) => {
  try {
    const token = localStorage.getItem("Bearer");

    const response = await request.post(
      "/api/Payment/createInvoice",
      invoiceData,
      {
        params: invoiceData.queryParams,
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

export const getRemainingAmount = async (carId) => {
  try {
    const response = await request.get(
      `/api/Payment/RemainingAmount/${carId}`
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
