import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    "content-type": "application/json;charset=UTF-8",
  },
});

api.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("token");
  config.headers.common["Authorization"] = `Bearer ${token}`;
  return config;
});
