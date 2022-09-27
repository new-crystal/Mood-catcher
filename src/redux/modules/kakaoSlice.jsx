import { createSlice } from "@reduxjs/toolkit";
import { __patchMap, __getUsersMap } from "../async/kakao";

const initialState = {
  aroundUser: [],
  myLatitude: "",
  myLongitude: "",
  checkPatch: false,
  checkUsersMap: false,
  isFetching: false,
  errorMessage: null,
};

const kakaoSlice = createSlice({
  name: "kakao",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // kakao맵 유저 위치 보내기
      .addCase(__patchMap.fulfilled, (state, action) => {
        state.myLatitude = action.payload.latitude;
        state.myLongitude = action.payload.longitude;
        state.checkPatch = !state.checkPatch;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__patchMap.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__patchMap.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // kakao맵 유저들 위치 받기
      .addCase(__getUsersMap.fulfilled, (state, action) => {
        state.aroundUser = action.payload;
        state.checkUsersMap = !state.checkUsersMap;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getUsersMap.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getUsersMap.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      }),
});

export const {} = kakaoSlice.actions;
export default kakaoSlice.reducer;
