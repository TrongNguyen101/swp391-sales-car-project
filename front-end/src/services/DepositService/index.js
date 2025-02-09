import * as request from "../../utils/DepositPayment";

export const postDeposit = async (amount, orderInfo) => {
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
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getDeposit = async (queryParams) => {
  try {
    const response = await request.get("/api/Payment/PaymentResponse", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
