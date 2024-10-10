import axios from "axios";
import { CreateBook } from "../pages/BookManage/CreateBookModal";

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

export const bookListSvc = async (name: string) => {
  return await axiosInstance.get('/book/list', {
    params: { name }
  });
}

export async function createBookSvc(book: CreateBook) {
  return await axiosInstance.post('/book/create', {
    name: book.name,
    author: book.author,
    description: book.description,
    cover: book.cover
  });
}
