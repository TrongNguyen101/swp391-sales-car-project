import request from "../BaseURL";

export const get = async (path, config) => {
  const response = await request.get(path, config);
  return response;
}

export const put = async (path, data, config) => {
  const response = await request.put(path, data, config);
  return response;
}