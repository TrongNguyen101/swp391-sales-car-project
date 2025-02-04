import request from '../BaseURL';

export const get = async (path, option = {}) => {
  const response = await request.get(path, option);
  return response;
}

export const getById = async (path, data, option = {}) => {
  const response = await request.get(path, data, option);
  return response;
}