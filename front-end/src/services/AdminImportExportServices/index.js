import * as request from "../../utils/AccessoryRequest";

export const adminGetAllImportExportHistories = async () => {
  try {
    const token = localStorage.getItem("Bearer"); // Use a more descriptive key
    const endpoint = "/api/AdminImportExportProduct/getAllImportExportProductHistory";
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