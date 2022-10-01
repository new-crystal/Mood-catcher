import { createAsyncThunk } from "@reduxjs/toolkit";
import { likeApi } from "../../shared/api";
import Swal from "sweetalert2";

// 게시물 조회하기 (좋아요페이지)
export const __getLikeAllPosts = createAsyncThunk(
  "GET/LIKEALLPOSTS",
  async (data, thunkAPI) => {
    // try {
    const response = await likeApi.getLikeAllPosts(data);
    if (response.status === 200) {
      return response.data;
    }
    // } catch (err) {
    //   Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
    //   return thunkAPI.rejectWithValue(err.response.msg);
    // }
  }
);

// 무드(좋아요) 등록/취소
export const __patchMood = createAsyncThunk(
  "PATCH/MOOD",
  async (data, thunkAPI) => {
    try {
      const response = await likeApi.patchMood(data);
      if (response.status === 201) {
        return response.data.data.likeCount;
      }
    } catch (err) {
      Swal.fire(
        "좋아요가 실패했습니다.",
        "네트워크 연결 상태를 확인해주세요.!",
        "error"
      );
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);
