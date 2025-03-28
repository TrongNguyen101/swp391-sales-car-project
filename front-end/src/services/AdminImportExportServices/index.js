import * as request from "../../utils/AccessoryRequest";

export const adminGetAllImportExportHistories = async () => {
  try {
    const response = await request.get("/api/AdminImportExportProduct/getAllImportExportProductHistory");
    return response.data;
  } catch (error) {
    return error.response;
  }
};