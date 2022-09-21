import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentApi } from "../../shared/api";
import Swal from "sweetalert2";

// 댓글 조회하기
export const __getComments = createAsyncThunk(
  "GET/COMMENTS",
  async (data, thunkAPI) => {
    try {
      const response = await commentApi.getComments(data);
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 댓글 작성하기
export const __addComment = createAsyncThunk(
  "POST/COMMENT",
  async (data, thunkAPI) => {
    try {
      const response = await commentApi.addComment(data);
      if (response.status === 201) {
        return response.data.data.comment.createComment;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 댓글 수정하기
export const __editComment = createAsyncThunk(
  "PUT/COMMENT",
  async (data, thunkAPI) => {
    try {
      const response = await commentApi.editComment(data);
      if (response.status === 201) {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 댓글 삭제하기
export const __deleteComment = createAsyncThunk(
  "DELETE/COMMENT",
  async (data, thunkAPI) => {
    try {
      const response = await commentApi.deleteComment(data);
      if (response.status === 200) {
        if (response.request.status === 200) {
          alert(response.data.msg);
        }
        return data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 대댓글 작성하기
export const __addRecomment = createAsyncThunk(
  "POST/RECOMMENT",
  async (data, thunkAPI) => {
    try {
      const response = await commentApi.addRecomment(data);
      if (response.status === 201) {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 대댓글 수정하기
export const __editRecomment = createAsyncThunk(
  "PUT/RECOMMENT",
  async (data, thunkAPI) => {
    try {
      const response = await commentApi.editRecomment(data);
      if (response.status === 201) {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 대댓글 삭제하기
export const __deleteRecomment = createAsyncThunk(
  "DELETE/RECOMMENT",
  async (data, thunkAPI) => {
    try {
      const response = await commentApi.deleteRecomment(data);
      if (response.status === 200) {
        if (response.request.status === 200) {
          alert(response.data.msg);
        }
        return data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);
