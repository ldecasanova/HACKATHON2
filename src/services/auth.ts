import axios from 'axios';

const API_URL = 'https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1';

export const register = async (username: string, password: string, role: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    username,
    password,
    role,
  });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};
