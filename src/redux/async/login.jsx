import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../shared/api";
import Swal from "sweetalert2";
import { setCookie } from "../../shared/cookie";

// 로그인
export const __login = createAsyncThunk(
  "POST/LOGIN",
  async (data, thunkAPI) => {
    try {
      const response = await loginApi.login(data);
      if (response.status === 200) {
        setCookie("token", response.data.url.split("=")[2]);
        return (window.location.href = response.data.url);
      }
    } catch (err) {
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// 닉네임 중복 체크
export const __checkNickname = createAsyncThunk(
  "GET/CHECKNICKNAME",
  async (data, thunkAPI) => {
    try {
      const response = await loginApi.checkNickname(data);
      if (response.status === 200) {
        return true;
      }
    } catch (err) {
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// 성별, 닉네임, 나이 작성하기
export const __detail = createAsyncThunk(
  "POST/DETAIL",
  async (data, thunkAPI) => {
    try {
      const response = await loginApi.addLoginDetail(data);
      if (response.status === 201) {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// 소셜 로그인
export const __socialLogin = createAsyncThunk(
  "GET/SOCIALLOGIN",
  async (data, thunkAPI) => {
    try {
      const response = await loginApi.socialLogin(data);
      if (response.status === 200) {
        setCookie("token", response.data.url.split("=")[2]);
        thunkAPI.fulfillWithValue(response.data);
      }
    } catch (err) {
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// 프로필 수정
export const __editProfile = createAsyncThunk(
  "PUT/PROFILE",
  async (data, thunkAPI) => {
    try {
      const response = await loginApi.editProfile(data);
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data.userStatus);
      }
    } catch (err) {
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// 회원 탈퇴
export const __delUser = createAsyncThunk(
  "DELETE/USER",
  async (data, thunkAPI) => {
    try {
      const response = await loginApi.deleteUser(data);
    } catch (err) {
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// 유저 정보 조회
export const __getUser = createAsyncThunk(
  "GET/USER",
  async (data, thunkAPI) => {
    try {
      const response = await loginApi.getUser(data);
      if (response.status === 200) {
        return response.data.data.userStatus;
      }
    } catch (err) {
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// 헤더 유저 정보 조회
export const __getHeaderUser = createAsyncThunk(
  "GET/HEADERUSER",
  async (data, thunkAPI) => {
    try {
      const response = await loginApi.getUser(data);
      if (response.status === 200) {
        return response.data.data.userStatus;
      }
    } catch (err) {
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// 프로필 아이콘 바꾸기
export const __patchUser = createAsyncThunk(
  "PATCH/ICON",
  async (data, thunkAPI) => {
    try {
      const response = await loginApi.patchUser(data);
      if (response.status === 201) {
        return response.data.data.userStatus;
      }
    } catch (err) {
      Swal.fire("에러", err.response.data, "error");
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
