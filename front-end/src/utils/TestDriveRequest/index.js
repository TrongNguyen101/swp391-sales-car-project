import request from "../BaseURL";

export const post = async (path, data, options = {}) => {
  const response = await request.post(path, data, options);
  return response;
};
