import axiosClient from '../api/axiosClient';

export const registerApi = async (data: object) => {
  const url = '/api/register';
  return await axiosClient.post(url, data);
};

export const loginApi = async (data: object) => {
  const url = '/api/login';
  return await axiosClient.post(url, data);
};

export const getAllPostApi = async () => {
  const url = '/api/post';
  return await axiosClient.get(url);
};

export const getPostApi = async (id: any) => {
  const url = `/api/post/${id}`;
  return await axiosClient.get(url);
};

export const createPostApi = async (data: object) => {
  const url = '/api/post';
  return await axiosClient.post(url, data);
};

export const editPostApi = async (id: any, data: object) => {
  const url = `/api/post/${id}`;
  return await axiosClient.patch(url, data);
};

export const deletePostApi = async (id: any) => {
  const url = `/api/post/${id}`;
  return await axiosClient.delete(url);
};

export const getUserApi = async (id: any) => {
  const url = `/api/user/${id}`;
  return await axiosClient.get(url);
};

export const getMessagesApi = async (id: any) => {
  const url = `/api/message/${id}`;
  return await axiosClient.get(url);
};
