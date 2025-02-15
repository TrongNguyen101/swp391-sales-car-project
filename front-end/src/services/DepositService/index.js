import * as request from "../../utils/DepositPayment";

export const postDeposit = async (amount, orderInfo) => {
  const token = localStorage.getItem("Bearer");
  try {
    const response = await request.post(
      "/api/Payment/CreatePaymentUrl",
      {
        amount: amount,
        orderInfo: orderInfo,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getDeposit = async (queryParams) => {
  const token = localStorage.getItem("Bearer");
  try {
    const response = await request.get("/api/Payment/PaymentResponse", {
      params: queryParams,
    },
  {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
