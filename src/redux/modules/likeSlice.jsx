import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { api } from "../../shared/api";

// 게시물 전체 조회(좋아요페이지)
export const __getLikeAllPosts = createAsyncThunk(
  "GET/MAINALLPOSTS",
  async (payload, thunkAPI) => {
    console.log(payload);
    const response = await api.get(
      `/posts?userId=${payload.userId}&type=like&page=${payload.paging}&count=2`
    );
    console.log(response.data);
    return response.data;
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState: {
    allPosts: [],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      // 게시물 전체 조회(좋아요페이지)
      .addCase(__getLikeAllPosts.fulfilled, (state, action) => {
        state.allPosts = [...state.allPosts, ...action.payload];
      }),
});

export const {} = likeSlice.actions;
export default likeSlice.reducer;

const like_Infinity = (state) => state.like.allPosts;

export const InfinityLike = createSelector(like_Infinity, (like_Infinity) => {
  return like_Infinity;
});
