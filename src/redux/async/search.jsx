import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchApi } from "../../shared/api";
import Swal from "sweetalert2";

// 추천 게시물 조회하기 (검색페이지)
export const __getSearch = createAsyncThunk(
  "GET/SEARCH",
  async (data, thunkAPI) => {
    try {
      const response = await searchApi.getSearch(data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);

// 추천 게시물 조회하기 (검색 결과창)
export const __getSearchResult = createAsyncThunk(
  "GET/RESULT",
  async (data, thunkAPI) => {
    try {
      const response = await searchApi.getSearchResult(data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.msg);
    }
  }
);
