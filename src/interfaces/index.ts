import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000,
});

export const register = async (username: string, password: string) => {
  return await axiosInstance.post('/user/register', { username, password });
}

export const login = async (username: string, password: string) => {
  return await axiosInstance.post('/user/login', { username, password });
}
