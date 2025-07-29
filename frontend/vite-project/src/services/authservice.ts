import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API}/login`, { username, password });
  localStorage.setItem("token", res.data.token);
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const res = await axios.get(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.user;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
