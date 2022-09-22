import { createSlice } from "@reduxjs/toolkit";
import { __getSearch, __getSearchResult } from "../async/search";

const initialState = {
  search: false,
  recommendedPosts: [],
  searchResult: [],
  postLast: null,
  resultPostLast: null,

  isFetching: false,
  errorMessage: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // 추천 게시물 조회하기 (검색페이지)
      .addCase(__getSearch.fulfilled, (state, action) => {
        state.recommendedPosts = [...state.recommendedPosts, ...action.payload];
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getSearch.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getSearch.rejected, (state, action) => {
        state.postLast = "lastPage";
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 추천 게시물 조회하기 (검색 결과창)
      .addCase(__getSearchResult.fulfilled, (state, action) => {
        state.searchResult = [...state.searchResult, ...action.payload];
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getSearchResult.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getSearchResult.rejected, (state, action) => {
        state.resultPostLast = "lastPage";
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      }),
});

export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
