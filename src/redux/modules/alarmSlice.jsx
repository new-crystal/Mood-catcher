import { api } from "../../shared/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//알람 조회하기
export const __getAlarm = createAsyncThunk(
  "GET/ALARM",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/notice");
      return response.data.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

//알림 지우기
export const __deleteAlarm = createAsyncThunk(
  "DELETE/ALARM",
  async (payload, thunkAPI) => {
    const response = await api.delete("/notice");
    return response;
  }
);
const initialState = {
  notices: [],
};

//리듀서
const alarmSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      //알람 조회하기
      .addCase(__getAlarm.fulfilled, (state, action) => {
        state.notices = [...action.payload];
      }),
});

export const alarmAction = alarmSlice.actions;
export default alarmSlice.reducer;
