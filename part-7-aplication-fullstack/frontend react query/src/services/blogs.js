import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAllBlogs = () =>
  axios.get(baseUrl).then((response) => response.data);

export const createNewBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  return axios.post(baseUrl, blog, config).then((res) => res.data);
};

const update = (id, blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(`${baseUrl}/${id}`, blog, config);
  return request.then((response) => response.data);
};

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};

export default { setToken, update, remove };
