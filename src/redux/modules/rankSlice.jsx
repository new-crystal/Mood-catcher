import { createSlice } from "@reduxjs/toolkit";
import {
  __getHotPosts,
  __getMainAllPosts,
  __getBestPosts,
} from "../async/rank";

const initialState = {
  hotPosts: [],
  allPosts: [],
  bestPosts: [],
  postLast: null,
  isFetching: false,
  errorMessage: null,
};

const rankSlice = createSlice({
  name: "rank",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // 인기 게시물 조회하기
      .addCase(__getHotPosts.fulfilled, (state, action) => {
        state.hotPosts = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getHotPosts.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getHotPosts.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 게시물 전체 조회(메인페이지)
      .addCase(__getMainAllPosts.fulfilled, (state, action) => {
        state.allPosts = [...state.allPosts, ...action.payload];
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getMainAllPosts.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getMainAllPosts.rejected, (state, action) => {
        state.postLast = "lastPage";
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      //명예의 전당 게시물 조회하기
      .addCase(__getBestPosts.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getBestPosts.fulfilled, (state, action) => {
        state.bestPosts = action.payload;
        state.isFetching = false;
      })
      .addCase(__getBestPosts.rejected, (state, action) => {
        state.postLast = "lastPage";
        state.isFetching = false;
        state.errorMessage = action.payload;
      }),
});

export const {} = rankSlice.actions;
export default rankSlice.reducer;
