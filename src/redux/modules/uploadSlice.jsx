import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../shared/api";

// 게시물 작성
export const __writePost = createAsyncThunk(
  "post/writePost",
  async (data, thunkAPI) => {
    const response = await api.post(`/api/posts`, data);

    return response.data;
  }
);

// 상품 찾기
export const __getMusinsa = createAsyncThunk(
  "post/getMusinsa",
  async (data, thunkAPI) => {
    const response = await api.post(`/api/musinsa/:keyword`);

    return response.data;
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    postList: [],
    itemList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__writePost.fulfilled, (state, action) => {
        state.postList.unshift(action.payload.post);
      })
      .addCase(__getMusinsa.fulfilled, (state, action) => {
        state.itemList = action.payload.items;
      });
  },
});

export const {} = uploadSlice.actions;
export default uploadSlice.reducer;
