import api from './api';

export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data.data;
};

export const createPost = async (title, content) => {
  const response = await api.post('/posts', { title, content });
  return response.data.data;
};

export const updatePost = async (id, title, content) => {
  const response = await api.put(`/posts/${id}`, { title, content });
  return response.data.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data.data;
};

