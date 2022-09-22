import { createSlice } from "@reduxjs/toolkit";
import { __getLikeAllPosts, __patchMood } from "../async/like";

const initialState = {
  allPosts: [],
  likeCount: 0,
  moodNum: 0,
  isFetching: false,
  errorMessage: null,
};

const likeSlice = createSlice({
  name: "like",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // 게시물 조회하기 (좋아요페이지)
      .addCase(__getLikeAllPosts.fulfilled, (state, action) => {
        state.allPosts = [...state.allPosts, ...action.payload];
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getLikeAllPosts.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getLikeAllPosts.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 무드(좋아요) 등록/취소
      .addCase(__patchMood.fulfilled, (state, action) => {
        state.likeCount = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__patchMood.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__patchMood.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      }),
});

export const { addMood } = likeSlice.actions;
export default likeSlice.reducer;
