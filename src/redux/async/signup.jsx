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
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
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
      return thunkAPI.rejectWithValue(err.response.data);
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
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
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
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//이메일 인증번호 보내기
export const __postEmail = createAsyncThunk(
  "POST/EMAIL",
  async (data, thunkAPI) => {
    try {
      const response = await signupApi.postEmail(data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//비밀번호 찾을 때 인증번호 보내기
export const __postEmailNum = createAsyncThunk(
  "POST/EMAILNUM",
  async (data, thunkAPI) => {
    try {
      const response = await signupApi.findEmail(data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      Swal.fire("이메일을 확인해주세요", err.response.data.msg, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//비밀번호 변경하기
export const __putPassword = createAsyncThunk(
  "PUT/PASSWORD",
  async (data, thunkAPI) => {
    try {
      const response = await signupApi.putPW(data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      Swal.fire("", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
//이메일 인증번호 확인하기
export const __postAuthNum = createAsyncThunk(
  "GET/AUTHNUM",
  async (data, thunkAPI) => {
    try {
      const response = await signupApi.postAuthNum(data);
      return thunkAPI.fulfillWithValue(response.data.data.result);
    } catch (err) {
      Swal.fire("에러", err.response.data.msg, "error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);
