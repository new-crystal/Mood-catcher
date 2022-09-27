import { createAsyncThunk } from "@reduxjs/toolkit";
import { kakaoApi } from "../../shared/api";
import Swal from "sweetalert2";

// kakao맵 유저 위치 보내기
export const __patchMap = createAsyncThunk(
  "PATCH/MAP",
  async (data, thunkAPI) => {
    try {
      const response = await kakaoApi.patchKakaoMap(data);
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// kakao맵 유저들 위치 받기
export const __getUsersMap = createAsyncThunk(
  "GET/USERSMAP",
  async (data, thunkAPI) => {
    try {
      const response = await kakaoApi.getKakaoUsers();
      if (response.status === 200) {
        return response.data.data.aroundUser;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);
