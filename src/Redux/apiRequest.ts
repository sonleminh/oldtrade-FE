import axiosClient from '../api/axiosClient';

export const registerApi = async (data: object) => {
  const url = '/api/register';
  return await axiosClient.post(url, data);
};

export const loginApi = async (data: object) => {
  const url = '/api/login';
  return await axiosClient.post(url, data);
};

export const changePassApi = async (id: string, data: object) => {
  const url = `/api/changepass/${id}`;
  return await axiosClient.patch(url, data);
};

export const getAllPostApi = async () => {
  const url = '/api/post';
  return await axiosClient.get(url);
};

export const getPostApi = async (id: any) => {
  const url = `/api/post/${id}`;
  return await axiosClient.get(url);
};

export const getPostByCategory = async (id: any) => {
  const url = `/api/danh-muc/${id}`;
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

export const updateUser = async (id: any, data: object) => {
  const url = `/api/user/${id}`;
  return await axiosClient.patch(url, data);
};

export const getCategoriesApi = async () => {
  const url = `/api/danh-muc`;
  return await axiosClient.get(url);
};

export const getChatApi = async (id: any) => {
  const url = `/api/chat/${id}`;
  return await axiosClient.get(url);
};

export const getChatByUserApi = async (id: any) => {
  const url = `/api/chat/user/${id}`;
  return await axiosClient.get(url);
};

export const createChatApi = async (data: any) => {
  const url = `/api/chat`;
  return await axiosClient.post(url, data);
};

export const getMessagesApi = async (id: any) => {
  const url = `/api/message/${id}`;
  return await axiosClient.get(url);
};

export const getLastMessagesApi = async (id: any) => {
  const url = `/api/message/last/${id}`;
  return await axiosClient.get(url);
};

export const sendMessageApi = async (data: any) => {
  const url = '/api/message';
  return await axiosClient.post(url, data);
};
