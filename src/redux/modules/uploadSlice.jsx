import { createSlice, createSelector } from "@reduxjs/toolkit";
import {
  __addPost,
  __editPost,
  __deletePost,
  __uploadImage,
  __getMusinsa,
  __getDetail,
  __getMyPage,
  __getMyCloset,
  __getRepresentative,
  __editRepresentative,
} from "../async/upload";

const initialState = {
  post: {},
  items: [],
  formdata: {},
  selectedItems: [],
  detailPost: {},
  detailItems: [],
  myList: [],
  myCloset: [],
  checkPostId: false,
  representative: {},
  isFetching: false,
  errorMessage: null,
  postLast: null,
  addPosting: true,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState: initialState,
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
    deleteItem: (state, action) => {
      const delete_list = state.selectedItems.filter((v) => {
        return String(v.name) === action.payload ? false : true;
      });
      state.selectedItems = delete_list;
    },
    changeCheckPostId: (state, action) => {
      state.checkPostId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 게시물 작성하기
      .addCase(__addPost.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.selectedItems = [];
        state.checkPostId = true;
        state.isFetching = false;
        state.errorMessage = null;
        state.addPosting = true;
      })
      .addCase(__addPost.pending, (state, action) => {
        state.isFetching = true;
        state.addPosting = false;
      })
      .addCase(__addPost.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 게시물 수정하기
      .addCase(__editPost.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.checkPostId = true;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__editPost.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__editPost.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 게시물 삭제하기
      .addCase(__deletePost.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.checkPostId = true;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__deletePost.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__deletePost.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 상품 찾기(무신사)
      .addCase(__getMusinsa.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getMusinsa.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getMusinsa.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 게시물 상세 조회하기
      .addCase(__getDetail.fulfilled, (state, action) => {
        state.detailPost = action.payload.post;
        state.detailItems = action.payload.items;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getDetail.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getDetail.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 옷장 게시물 가져오기
      .addCase(__getMyPage.fulfilled, (state, action) => {
        state.myList = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getMyPage.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getMyPage.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 나의 옷장 게시물 가져오기 (옷장페이지)
      .addCase(__getMyCloset.fulfilled, (state, action) => {
        state.myCloset = [...state.myCloset, ...action.payload];
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getMyCloset.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getMyCloset.rejected, (state, action) => {
        state.postLast = "lastPage";
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      //대표 게시물 조회하기
      .addCase(__getRepresentative.fulfilled, (state, action) => {
        state.representative = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getRepresentative.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getRepresentative.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      //대표 게시물 지정하기
      .addCase(__editRepresentative.fulfilled, (state, action) => {
        state.representative.postId = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__editRepresentative.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__editRepresentative.rejected, (state, action) => {
        state.representative.postId = action.payload;
      });
  },
});

export const {
  regFormdata,
  regPost,
  selectItem,
  changeCheckPostId,
  deleteItem,
} = uploadSlice.actions;
export default uploadSlice.reducer;

const closet_Infinity = (state) => state.upload.myCloset;

export const InfinityCloset = createSelector(
  closet_Infinity,
  (closet_Infinity) => {
    return closet_Infinity;
  }
);
