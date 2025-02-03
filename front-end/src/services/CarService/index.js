import * as request from "../../utils/CarRequest";

export const getCar = async () => {
  try {
    const response = await request.get("/api/Cars");
    return response;
  } catch (error) {
    return console.log(error);
  }
};