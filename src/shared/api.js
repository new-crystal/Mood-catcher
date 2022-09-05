import axios from "axios";
import { getCookie } from "./Cookie";

// axios 기본 주소 & header 타입 세팅
export const api = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
  withCredentials: true,
});

// 매 실행 시 토큰값 넣기, 없으면 null값이 들어간다
api.interceptors.request.use(function (config) {
  const accessToken = getCookie("token");
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return config;
});
