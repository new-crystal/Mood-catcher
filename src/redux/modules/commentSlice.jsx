import { createSlice } from "@reduxjs/toolkit";
import {
  __getComments,
  __addComment,
  __editComment,
  __deleteComment,
  __addRecomment,
  __editRecomment,
  __deleteRecomment,
} from "../async/comment";

const initialState = {
  comments: [],
  commentLast: null,
  isFetching: false,
  errorMessage: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 댓글 조회하기
      .addCase(__getComments.fulfilled, (state, action) => {
        // state.comments = action.payload.comments;
        state.comments = [...state.comments, ...action.payload];
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getComments.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getComments.rejected, (state, action) => {
        state.commentLast = "lastPage";
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 댓글 작성하기
      .addCase(__addComment.fulfilled, (state, action) => {
        state.comments = [action.payload, ...state.comments];
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__addComment.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__addComment.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 대댓글 추가하기
      .addCase(__addRecomment.fulfilled, (state, action) => {
        state.comments = [action.payload, ...state.comments];
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__addRecomment.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__addRecomment.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      });
  },
});

// // reducer dispatch하기 위해 export 하기
export const {} = commentSlice.actions;
export default commentSlice.reducer;
