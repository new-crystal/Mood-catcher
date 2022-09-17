import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../shared/api";

// 게시물 전체 조회(좋아요페이지)
export const __getLikeAllPosts = createAsyncThunk(
  "GET/MAINALLPOSTS",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(
        `/posts?userId=${payload.userId}&type=like&page=${payload.paging}&count=2`
      );
      return response.data;
    } catch (err) {
      //console.log(err);
    }
  }
);

//무드(좋아요) 등록/취소
export const __patchMood = createAsyncThunk(
  "PATCH/MOOD",
  async (payload, thunkAPI) => {
    const response = await api.patch(`/like?postId=${payload}`);
    return response.data.data.likeCount;
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState: {
    allPosts: [],
    likeCount: 0,
    moodNum: 0,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      // 게시물 전체 조회(좋아요페이지)
      .addCase(__getLikeAllPosts.fulfilled, (state, action) => {
        state.allPosts = [...state.allPosts, ...action.payload];
      })
      //무드 등록/취소
      .addCase(__patchMood.fulfilled, (state, action) => {
        state.likeCount = action.payload;
      }),
});

export const { addMood } = likeSlice.actions;
export default likeSlice.reducer;
