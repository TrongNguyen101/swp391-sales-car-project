import request from "../BaseURL";

export const get = async (path, data, config) => {
  const response = await request.get(path, data, config);
  return response;
};

export const getById = async (path, data, config) => {
  const response = await request.get(path, data, config);
  return response;
};

export const post = async (path, data, config) => {
  const response = await request.post(path, data, config);
  return response;
};

export const put = async (path, data, config) => {
  const response = await request.put(path, data, config);
  return response;
};
