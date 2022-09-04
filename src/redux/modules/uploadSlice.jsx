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
    // console.log(data);

    const response = await api.get(`/api/musinsa/${data}`);
    return response.data;
  }
);

//mypage 정보 가져오기
export const __getMyPage = createAsyncThunk(
  "GET/MYPAGE",
  async (payload, thunkAPI) => {
    const response = await api.get(`/user/${payload}`);
    return response.data;
  }
);

//대표 게시물 조회
export const __getMyRep = createAsyncThunk(
  "GET/MYREP",
  async (payload, thunkAPI) => {
    const response = await api.get(`/posts/rep/${payload}`);
    return response.data;
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    post: { title: "", content: "" },
    formdata: {},
    myList: {},
    myRepPost: {},
  },
  reducers: {
    regFormdata: (state, action) => {
      state.formdata = action.payload;
      // console.log(state.formdata);
    },
    regPost: (state, action) => {
      state.post = action.payload;
      // console.log(state.post);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__writePost.fulfilled, (state, action) => {
        state.postList.unshift(action.payload.post);
      })
      .addCase(__getMusinsa.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(__getMyPage.fulfilled, (state, action) => {
        state.myList = action.payload;
      })
      .addCase(__getMyRep.fulfilled, (state, action) => {
        state.myRepPost = action.payload;
      });
  },
});

export const { regFormdata, regPost } = uploadSlice.actions;
export default uploadSlice.reducer;
