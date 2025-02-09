import request from "../BaseURL";

export const get = async (path, option = {}) => {
  const response = await request.get(path, option);
  return response;
}

export const post = async (path, data, option = {}) => {
  const response = await request.post(path, data, option);
  return response;
}