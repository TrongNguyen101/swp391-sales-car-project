import request from "../BaseURL";

export const get = async (path, option = {}) => {
  const response = await request.get(path, option);
  return response;
}

export const post = async (path, options = {}, data) => {
  const response = await request.post(path, options, data);
  return response;
}