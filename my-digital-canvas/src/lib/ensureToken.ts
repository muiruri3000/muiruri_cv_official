import axios from "axios";


export const ensureToken = async () => {
  let token = localStorage.getItem("access");

  if (!token) {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;

    const res = await axios.post(
      "http://localhost:8000/api/token/refresh/",
      { refresh }
    );

    token = res.data.access;
    localStorage.setItem("access", token);
  }

  return token;
};