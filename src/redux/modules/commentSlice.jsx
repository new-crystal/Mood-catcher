import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../shared/api";

// 댓글 추가
export const __addComment = createAsyncThunk(
  "post/ADDCOMMENT_LOG",
  async (payload, thunkAPI) => {
    console.log(payload);
    const response = await api.post(`/comments?postId=${payload.postId}`, {
      content: payload.comment,
    });
    // 추가한 댓글 하나의 Data
    return response.data;
  }
);

// 댓글 조회
export const __getComments = createAsyncThunk(
  "get/GETCOMMENTS",
  async (payload, thunkAPI) => {
    console.log(payload);
    const response = await api.get(
      // `/comments?${payload.postId}&page=${payload.page}&count=${payload.count}`
      `/comments?postId=${payload}`
    );
    console.log(response);
    console.log(response.data);
    console.log(response.data.data);

    return response.data.data;
  }
);

// 댓글 수정
export const __changeComment = createAsyncThunk(
  "comment/CHANGECOMMENT_LOG",
  async (payload, thunkAPI) => {
    const response = await api.put(`/comments/${payload.commentId}`, {
      content: payload.comment,
    });
    return response.data;
  }
);

// 댓글 삭제
export const __deleteComment = createAsyncThunk(
  "comment/DELETECOMMENT_LOG",
  async (payload, thunkAPI) => {
    const response = await api.delete(`/comments/${payload.commentId}`);
    // 삭제 완료 msg alert 띄우기
    // 이렇게 처리할 필요는 없을 것 같다....
    if (response.request.status === 200) {
      alert(response.data.msg);
    }
    return payload;
  }
);

// 대댓글 추가
export const __addRecomment = createAsyncThunk(
  "post/ADDRECOMMENT_LOG",
  async (payload, thunkAPI) => {
    const response = await api.post(
      `/recomments?commentId=${payload.commentId}`,
      {
        content: payload.comment,
      }
    );
    console.log(response);
    // 추가한 댓글 하나의 Data
    return response.data;
  }
);

// 대댓글 수정
export const __changeRecomment = createAsyncThunk(
  "comment/CHANGERECOMMENT_LOG",
  async (payload, thunkAPI) => {
    console.log(payload);
    const response = await api.put(`/recomments/${payload.recommentId}`, {
      content: payload.comment,
    });
    return response.data;
  }
);

// 대댓글 삭제
export const __deleteRecomment = createAsyncThunk(
  "comment/DELETERECOMMENT_LOG",
  async (payload, thunkAPI) => {
    const response = await api.delete(`/recomments/${payload.recommentId}`);
    // 삭제 완료 msg alert 띄우기
    // 이렇게 처리할 필요는 없을 것 같다....
    if (response.request.status === 200) {
      alert(response.data.msg);
    }
    return payload;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 댓글 정보 가져오기
      .addCase(__getComments.fulfilled, (state, action) => {
        // 받아온 댓글 리스트 전체 받아오기
        console.log(action.payload.comments);
        state.comments = action.payload.comments;
      })
      // 댓글 추가하기
      .addCase(__addComment.fulfilled, (state, action) => {
        // 기존 데이터에서 추가 댓글 넣기
        state.comments = [action.payload, ...state.comments];
      })
      // 대댓글 추가하기
      .addCase(__addRecomment.fulfilled, (state, action) => {
        // 기존 데이터에서 추가 댓글 넣기
        state.comments = [action.payload, ...state.comments];
      });
  },
});

// // reducer dispatch하기 위해 export 하기
export const {} = commentSlice.actions;
export default commentSlice.reducer;
