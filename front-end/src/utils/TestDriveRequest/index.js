import request from "../BaseURL";

export const post = async (path, data, options = {}) => {
  const response = await request.post(path, data, options);
  return response;
};

export const get = async (path, data, options = {}) => {
  const response = await request.get(path, data, options);
  return response;
};

export const put = async (path, data, options = {}) => {
  const response = await request.put(path, data, options);
  return response;
};

