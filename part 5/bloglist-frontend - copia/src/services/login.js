import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const getAllUsers = () => {
  const request = axios.get('http://localhost:3003/api/users');
  return request.then((response) => response.data);
};

export default { login, getAllUsers };
