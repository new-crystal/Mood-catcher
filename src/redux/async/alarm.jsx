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
      Swal.fire(
        "알람을 불러오는 데 실패했습니다.",
        "네트워크 연결 상태를 확인해주세요.!",
        "error"
      );
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 알림 전체 삭제하기
export const __deleteAllAlarm = createAsyncThunk(
  "DELETE/ALARMS",
  async (data, thunkAPI) => {
    try {
      const response = await alarmApi.deleteAllAlarm(data);
      if (response.status === 200) {
        return response;
      }
    } catch (err) {
      Swal.fire(
        "알람 전체 삭제에 실패하셨습니다",
        "네트워크 연결 상태를 확인해주세요.!",
        "error"
      );
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

//알림 개별 삭제하기
export const __deleteAlarm = createAsyncThunk(
  "DELETE/ALARM",
  async (data, thunkAPI) => {
    try {
      const response = await alarmApi.deleteAlarm(data);
      return response;
    } catch (err) {
      Swal.fire(
        "알람 삭제에 실패하셨습니다",
        "네트워크 연결 상태를 확인해주세요.!",
        "error"
      );
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);
