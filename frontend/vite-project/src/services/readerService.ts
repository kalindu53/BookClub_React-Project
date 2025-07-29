import axios from "axios";

const API_URL = "http://localhost:5000/api/readers";

export const getReaders = async (search = "") => {
  const res = await axios.get(`${API_URL}?search=${search}`);
  return res.data;
};

export const addReader = async (reader: any) => {
  const res = await axios.post(API_URL, reader);
  return res.data;
};

export const updateReader = async (id: string, reader: any) => {
  const res = await axios.put(`${API_URL}/${id}`, reader);
  return res.data;
};

export const deleteReader = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
