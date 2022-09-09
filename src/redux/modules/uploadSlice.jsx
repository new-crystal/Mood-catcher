import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../shared/api";

// 게시물 작성
export const __writePost = createAsyncThunk(
  "post/writePost",
  async (payload, thunkAPI) => {
    console.log(payload);
    const response = await api.post(`/posts`, payload);
    console.log(response.data.data);
    return response.data.data;
  }
);

// 이미지 업데이트
export const __writeImage = createAsyncThunk(
  "post/writePost",
  async (payload, thunkAPI) => {
    console.log(payload);
    console.log(payload.postId);
    const response = await api.put(
      `/posts/${payload.postId}/image`,
      payload.postImage,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response.data;
  }
);

// 상품 찾기(무신사)
export const __getMusinsa = createAsyncThunk(
  "post/getMusinsa",
  async (payload, thunkAPI) => {
    // console.log(data);

    const response = await api.get(`/musinsa/${payload}?page=1&count=9`);
    console.log(response);
    return response.data.data;
  }
);

//냐의 옷장 게시물 가져오기
export const __getMyPage = createAsyncThunk(
  "GET/MYPAGE",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const response = await api.get(`/posts?type=${payload}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

//closet 페이지 정보 가져오기
export const __getCloset = createAsyncThunk(
  "GET/CLOSET",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const response = await api.get(`posts?${payload}`);
      console.log(response);
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);

//대표 게시물 지정하기
export const __representative = createAsyncThunk(
  "PATCH/REPRESENTATIVE",
  async (payload, thunkAPI) => {
    try {
      const response = await api.patch(`/posts/${payload}`);
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);

//대표 게시물 조회하기
export const __getRepPost = createAsyncThunk(
  "GET/REPRESENTATIVE",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const response = await api.get(`/posts/rep?${payload}`);
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    post: {},
    items: [],
    formdata: {},
    selectedItems: [],
    myList: [],
    closetList: [],
    myRepPost: { postId: "" },
    checkPostId: false,
  },
  reducers: {
    regPost: (state, action) => {
      state.post = action.payload;
    },
    regFormdata: (state, action) => {
      state.formdata = action.payload;
    },
    selectItem: (state, action) => {
      state.selectedItems.unshift(action.payload);
    },
    changeCheckPostId: (state, action) => {
      state.checkPostId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__writePost.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.checkPostId = true;
      })
      .addCase(__getMusinsa.fulfilled, (state, action) => {
        state.items = action.payload.items;
        console.log(state.items);
      })
      .addCase(__getMyPage.fulfilled, (state, action) => {
        state.myList = action.payload;
      })
      .addCase(__getMyPage.rejected, (state, action) => {
        state.myList = action.payload;
      })
      //옷장 정보 가져오기
      .addCase(__getCloset.fulfilled, (state, action) => {
        state.closetList = action.payload;
      })
      .addCase(__getCloset.rejected, (state, action) => {
        state.closetList = action.payload;
      })
      //대표 게시물 지정하기
      .addCase(__representative.fulfilled, (state, action) => {
        state.representative.postId = action.payload;
      })
      .addCase(__representative.rejected, (state, action) => {
        state.representative.postId = action.payload;
      })
      //대표 게시물 조회하기
      .addCase(__getRepPost.fulfilled, (state, action) => {
        state.representative = action.payload;
      });
  },
});

export const { regFormdata, regPost, selectItem, changeCheckPostId } =
  uploadSlice.actions;
export default uploadSlice.reducer;
