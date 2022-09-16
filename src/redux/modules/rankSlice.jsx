import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { api } from "../../shared/api";

// 인기 게시물 조회
export const __getHotPosts = createAsyncThunk(
  "GET/HOTPOST",
  async (payload, thunkAPI) => {
    const response = await api.get(`/posts/popular`);
    console.log(response);
    console.log(response.data.data.hotPosts);
    return response.data.data.hotPosts;
  }
);

// 게시물 전체 조회(메인페이지)
export const __getMainAllPosts = createAsyncThunk(
  "GET/MAINALLPOSTS",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(
        `/posts?userId=${payload.userId}&type=all&page=${payload.paging}&count=2`
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const rankSlice = createSlice({
  name: "rank",
  initialState: {
    hotPosts: [],
    allPosts: [],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      // 인기 게시물 조회
      .addCase(__getHotPosts.fulfilled, (state, action) => {
        state.hotPosts = action.payload;
      })
      // 게시물 전체 조회(메인페이지)
      .addCase(__getMainAllPosts.fulfilled, (state, action) => {
        state.allPosts = [...state.allPosts, ...action.payload];
      }),
});

export const {} = rankSlice.actions;
export default rankSlice.reducer;
