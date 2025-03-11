import request from "../BaseURL";

export const get = async (path, config) => {
  const response = await request.get(path, config);
  return response;
}