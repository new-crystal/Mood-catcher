import { createAsyncThunk } from "@reduxjs/toolkit";
import { alarmApi } from "../../shared/api";
import Swal from "sweetalert2";

// 알람 조회하기
export const __getAlarm = createAsyncThunk(
  "GET/ALARM",
  async (data, thunkAPI) => {
    try {
      const response = await alarmApi.getAlarm(data);
      if (response.status === 200) {
        return response.data.data.notices;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 알림 삭제하기
export const __deleteAlarm = createAsyncThunk(
  "DELETE/ALARM",
  async (data, thunkAPI) => {
    try {
      const response = await alarmApi.deleteAlarm(data);
      if (response.status === 200) {
        return response;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);
