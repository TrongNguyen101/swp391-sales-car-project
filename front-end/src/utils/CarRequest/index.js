import request from '../BaseURL';

export const get = async (path, data, config) => {
  const response = await request.get(path, data, config);
  return response;
}

export const getById = async (path, data, config) => {
  const response = await request.get(path, data, config);
  return response;
}