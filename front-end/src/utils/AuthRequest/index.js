import request from '../BaseURL';

export const post = async (path, data, config) => {
  const response = await request.post(path, data, config);
  return response;
};

export const get = async (path, config) => {
  const response = await request.get(path, config);
  return response;
}