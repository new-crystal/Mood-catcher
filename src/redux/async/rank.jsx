import { createAsyncThunk } from "@reduxjs/toolkit";
import { rankApi } from "../../shared/api";
import Swal from "sweetalert2";

// 인기 게시물 조회하기
export const __getHotPosts = createAsyncThunk(
  "GET/HOTPOSTS",
  async (data, thunkAPI) => {
    try {
      const response = await rankApi.getHotPosts();
      if (response.status === 200) {
        return response.data.data.hotPosts;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 게시물 조회하기 (메인페이지)
export const __getMainAllPosts = createAsyncThunk(
  "GET/MAINALLPOSTS",
  async (data, thunkAPI) => {
    // try {
    const response = await rankApi.getMainAllPosts(data);
    if (response.status === 200) {
      return response.data;
    }
    // } catch (err) {
    //   // Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
    //   return thunkAPI.rejectWithValue(err.response.msg);
    // }
  }
);
