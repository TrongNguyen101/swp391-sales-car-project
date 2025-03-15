import request from "../BaseURL";

export const get = async (path, data, config) => {
  const response = await request.get(path, data, config);
  return response;
};

export const post = async (path, data, config) => {
  const response = await request.post(path, data, config);
  return response;
};

export const deletebyId = async (path, data, config) => {
  const response = await request.delete(path, data, config);
  return response;
};