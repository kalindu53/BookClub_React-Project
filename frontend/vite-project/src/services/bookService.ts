import axios from 'axios';

const API = 'http://localhost:5000/api/books';

export const getBooks = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const addBook = async (book: any) => {
  const res = await axios.post(API, book);
  return res.data;
};

export const updateBook = async (id: string, book: any) => {
  const res = await axios.put(`${API}/${id}`, book);
  return res.data;
};

export const deleteBook = async (id: string) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
