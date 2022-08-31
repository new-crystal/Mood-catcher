import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../shared/api";
import produce from "immer";

// thunk 함수

// 메인 페이지 로드
export const __loadPost = createAsyncThunk("post/LOAD_POST", async () => {
  const response = await api.get("/api/posts");

  // 전체 포스트 리스트
  return response.data;
});

// 포스트 추가하기
export const __addPost = createAsyncThunk(
  "post/ADD_POST",
  async (payload, thunkAPI) => {
    const response = await api.post("/api/post", payload);
    //추가한 포스트 하나의 Data

    return response.data;
  }
);

// 포스트 수정하기
export const __editPost = createAsyncThunk(
  "post/EDIT_MEMO",
  async (payload, thunkAPI) => {
    const response = await api.put(`api/post/${payload.id}`, payload);
    // 수정한 포스트 Data

    return response.data;
    // 수정할 post id 값과 수정할 내용을 요청하면 백에서 시간, 닉네임 등을 같이 respose
  }
);

// 포스트 삭제하기
export const __deletePost = createAsyncThunk(
  "post/DELETE_MEMO",
  async (payload, thunkAPI) => {
    await api.delete(`/api/post/${payload}`);

    //삭제할 포스트 ID값
    return payload;
    // 삭제시 삭제 할 post id값만 받아옴 데이터 베이스와 따로 삭제 !
  }
);

export const __searchPost = createAsyncThunk(
  "post/SEARCH_POST",
  async (payload) => {
    try {
      const response = await api.get(`/api/title?title=${payload}`);

      return response.data;
    } catch (error) {
      const errorMsg = JSON.parse(error.request.response);
      alert(errorMsg.msg);
    }
  }
);

// slice
const postSlice = createSlice({
  name: "post",
  initialState: {
    list: [
      {
        Comments: [],
        Likers: [],
        User: { id: 10, nickname: "btae" },
        UserId: 10,
        content: "테스트",
        createdAt: "2022-06-16 00:24:38",
        id: 150,
        img: "React",
        title: "테스트",
        updatedAt: "2022-06-16 00:24:38",
      },
    ],
    loading: false,
    error: null,
    //로딩 완료 상태 값
    session: false,
    // 가져올 게시글 수
    countList: 5,
  },
  reducers: {
    // 무한 스크롤 리스트 갯수
    moreList: (state, payload) => {
      state.countList = state.countList + 5;
    },
    // 무한 스크롤 초기화
    resetListCount: (state, payload) => {
      state.countList = 5;
    },
  },

  extraReducers: (builder) => {
    builder

      //메인 페이지 로드
      .addCase(__loadPost.fulfilled, (state, action) => {
        state.loading = false;
        // 리스트 전체 저장
        state.list = action.payload;
        state.session = true;
      })

      // 포스트 추가 작성하기
      .addCase(__addPost.fulfilled, (state, action) => {
        // 저장된 list에서 작성된 포스트 추가하기
        state.list = [action.payload, ...state.list];
        state.loading = false;
      })
      .addCase(__addPost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(__addPost.pending, (state, action) => {
        state.loading = true;
      })
      // 포스트 수정하기
      .addCase(__editPost.fulfilled, (state, action) => {
        state.loading = false;
        // id값을 비교해 수정한 포스트로 교체 저장
        const newList = state.list.map((v, i) => {
          if (Number(v.id) === Number(action.payload.id)) {
            return action.payload;
          } else {
            return v;
          }
        });
        state.list = newList;
      })

      // 포스트 삭제하기
      .addCase(__deletePost.fulfilled, (state, action) => {
        state.loading = false;

        // id값 비교해 삭제하기
        const delete_list = state.list.filter((v) => {
          return Number(v.id) === Number(action.payload) ? false : true;
        });
        state.list = delete_list;
      })

      // 포스트 검색하기
      .addCase(__searchPost.fulfilled, (state, action) => {
        state.loading = false;
        // 리스트 전체 저장
        if (action.payload) {
          state.list = action.payload;
        }
        state.session = true;
      })

      .addCase(__searchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

// // reducer dispatch하기 위해 export 하기
export const { moreList, resetListCount } = postSlice.actions;
export default postSlice.reducer;
