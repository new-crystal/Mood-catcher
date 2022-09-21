import { createAsyncThunk } from "@reduxjs/toolkit";
import { signupApi } from "../../shared/api";
import Swal from "sweetalert2";

// 회원가입
export const __signUp = createAsyncThunk(
  "POST/SIGNUP",
  async (data, thunkAPI) => {
    try {
      const response = await signupApi.signup(data);
      if (response.status === 201) {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 이메일 중복 체크
export const __checkEmail = createAsyncThunk(
  "GET/CHECKEMAIL",
  async (data, thunkAPI) => {
    try {
      const response = await signupApi.checkEmail(data);
      if (response.status === 200) {
        return true;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 유저 정보 조회하기
export const __getUsers = createAsyncThunk(
  "GET/USERS",
  async (data, thunkAPI) => {
    try {
      const response = await signupApi.getUsers(data);
      if (response.status === 200) {
        return response.data.data.userStatus;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 초기화면 조회하기
export const __getOpen = createAsyncThunk(
  "GET/OPEN",
  async (data, thunkAPI) => {
    try {
      const response = await signupApi.getOpen(data);
      if (response.status === 200) {
        return response.data.data.startMsg;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);
