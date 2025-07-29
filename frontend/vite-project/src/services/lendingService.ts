import axios from "axios";

const API = "http://localhost:5000/api/lend";

export const lendBook = async (readerId: string, bookId: string) => {
  const res = await axios.post(API, { readerId, bookId });
  return res.data;
};

export const returnBook = async (lendingId: string) => {
  const res = await axios.put(`${API}/return/${lendingId}`);
  return res.data;
};

export const getLendingHistory = async () => {
  const res = await axios.get(`${API}/history`);
  return res.data;
};

export const getOverdueBooks = async () => {
  const res = await axios.get(`${API}/overdue`);
  return res.data;
};
