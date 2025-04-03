import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = (id, blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = axios.put(`${baseUrl}/${id}`, blog, config);
  const data = response.then((response) => response.data);
  return data;
};

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};

const addComment = async (commentString, id) => {
  const config = {
    headers: { Authorization: token },
  };

  const newComment = {
    comment: commentString,
  };

  const response = axios.post(`${baseUrl}/${id}/comments`, newComment, config);
  return response.then((response) => response.data);
};

export default { getAll, create, setToken, update, remove, addComment };
