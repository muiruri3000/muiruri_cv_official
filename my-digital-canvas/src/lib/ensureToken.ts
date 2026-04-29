import axios from "axios";


const API_URL = `${import.meta.env.VITE_API_URL}/api/`;
export const ensureToken = async () => {
  let token = localStorage.getItem("access");

  if (!token) {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;

    const res = await axios.post(
      `${API_URL}token/refresh/`,
      { refresh }
    );

    token = res.data.access;
    localStorage.setItem("access", token);
  }

  return token;
};