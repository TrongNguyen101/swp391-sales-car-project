import * as request from "../../utils/CarRequest";

export const adminGetAllInvoices = async () => {
  try {
    const response = await request.get("/api/Invoices");
    return response.data;
  } catch (error) {
    return error.response;
  }
};