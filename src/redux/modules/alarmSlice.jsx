import { createSlice } from "@reduxjs/toolkit";
import { __getAlarm, __deleteAlarm } from "../async/alarm";

const initialState = {
  notices: [],
  isFetching: false,
  errorMessage: null,
};

const alarmSlice = createSlice({
  name: "search",
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
      }),
});

export const alarmAction = alarmSlice.actions;
export default alarmSlice.reducer;
