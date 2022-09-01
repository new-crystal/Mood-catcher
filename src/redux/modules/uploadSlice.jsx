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
    console.log(data);
    try {
      const response = await api.get(`/api/musinsa/${data}`);
      return response.data;
    } catch (error) {
      const errorMsg = JSON.parse(error.request.response);
      alert(errorMsg.msg);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    post: { title: "", content: "" },
    formdata: {},
  },
  reducers: {
    regFormdata: (state, action) => {
      state.formdata = action.payload;
      console.log(state.formdata);
    },
    regPost: (state, action) => {
      state.post = action.payload;
      console.log(state.post);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__writePost.fulfilled, (state, action) => {
        state.postList.unshift(action.payload.post);
      })
      .addCase(__getMusinsa.fulfilled, (state, action) => {
        state.items = action.payload.items;
      });
  },
});

export const { regFormdata, regPost } = uploadSlice.actions;
export default uploadSlice.reducer;
