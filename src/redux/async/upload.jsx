import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadApi } from "../../shared/api";
import Swal from "sweetalert2";

// 게시물 작성하기
export const __addPost = createAsyncThunk(
  "POST/POST",
  async (data, thunkAPI) => {
    try {
      const response = await uploadApi.addPost(data);
      if (response.status === 201) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 게시물 수정하기
export const __editPost = createAsyncThunk(
  "PUT/POST",
  async (data, thunkAPI) => {
    try {
      const response = await uploadApi.editPost(data);
      if (response.status === 201) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 게시물 삭제하기
export const __deletePost = createAsyncThunk(
  "DELETE/POST",
  async (data, thunkAPI) => {
    try {
      const response = await uploadApi.deletePost(data);
      if (response.status === 200) {
        return response;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 이미지 업로드하기
export const __uploadImage = createAsyncThunk(
  "PUT/UPLOADIMAGE",
  async (data, thunkAPI) => {
    try {
      const response = await uploadApi.uploadImage(data);
      if (response.status === 201) {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 상품 찾기(무신사)
export const __getMusinsa = createAsyncThunk(
  "GET/MUSINSA",
  async (data, thunkAPI) => {
    try {
      const response = await uploadApi.getMusinsa(data);
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 게시물 상세 조회하기
export const __getDetail = createAsyncThunk(
  "GET/DETAIL",
  async (data, thunkAPI) => {
    try {
      const response = await uploadApi.getDetail(data);
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 옷장 게시물 가져오기
export const __getMyPage = createAsyncThunk(
  "GET/MYPAGE",
  async (data, thunkAPI) => {
    try {
      const response = await uploadApi.getMyPage(data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 나의 옷장 게시물 가져오기 (옷장페이지)
export const __getMyCloset = createAsyncThunk(
  "GET/MYCLOSET",
  async (data, thunkAPI) => {
    // try {
    //console.log(payload);
    const response = await uploadApi.getMyPage(data);
    if (response.status === 200) {
      return response.data;
    }
    // } catch (err) {
    //   Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
    //   return thunkAPI.rejectWithValue(err.response.msg);
    // }
  }
);

// 대표 게시물 조회하기
export const __getRepresentative = createAsyncThunk(
  "GET/REPRESENTATIVE",
  async (data, thunkAPI) => {
    try {
      const response = await uploadApi.getRepresentative(data);
      if (response.status === 200) {
        return response.data.data.repPost;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 대표 게시물 지정 및 수정하기
export const __editRepresentative = createAsyncThunk(
  "PATCH/REPRESENTATIVE",
  async (data, thunkAPI) => {
    try {
      const response = await uploadApi.editRepresentative(data);
      return response.data;
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);
