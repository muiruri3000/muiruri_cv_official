import axios from "axios";
import { getToken } from "./api";
export const initAuth = async () => {
  let token = localStorage.getItem("access");

  if (!token) {
    const refresh = localStorage.getItem("refresh");

    if (refresh) {
      const res = await axios.post(
        "http://localhost:8000/api/token/refresh/",
        { refresh }
      );

      token = res.data.access;
      localStorage.setItem("access", token);
    } else {
      await getToken(); 
    }
  }

  return token;
};