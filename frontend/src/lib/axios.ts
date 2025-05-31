import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
