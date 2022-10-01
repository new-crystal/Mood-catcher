import { createSlice } from "@reduxjs/toolkit";
import { __getAlarm, __deleteAlarm, __deleteAllAlarm } from "../async/alarm";

const initialState = {
  notices: [],
  isFetching: false,
  errorMessage: null,
  deleteAlarm: false,
};

const alarmSlice = createSlice({
  name: "alarm",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // 알람 조회하기
      .addCase(__getAlarm.fulfilled, (state, action) => {
        state.notices = [...action.payload];
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getAlarm.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getAlarm.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      //알람 삭제하기
      .addCase(__deleteAlarm.pending, (state, action) => {
        state.isFetching = true;
        state.deleteAlarm = false;
      })
      .addCase(__deleteAlarm.fulfilled, (state, action) => {
        state.deleteAlarm = true;
      })
      //알람 전체 삭제하기
      .addCase(__deleteAllAlarm.pending, (state, action) => {
        state.isFetching = true;
        state.deleteAlarm = false;
      })
      .addCase(__deleteAllAlarm.fulfilled, (state, action) => {
        state.deleteAlarm = true;
      }),
});

export const alarmAction = alarmSlice.actions;
export default alarmSlice.reducer;
