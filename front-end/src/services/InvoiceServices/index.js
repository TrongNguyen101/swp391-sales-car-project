import * as request from "../../utils/CarRequest";


export const createInvoice = async (invoiceData) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.post(
      `/api/Invoices/createInvoice`,
      invoiceData,
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