import { createSlice } from "@reduxjs/toolkit";
import {
  __login,
  __checkNickname,
  __detail,
  __socialLogin,
  __editProfile,
  __delUser,
  __getUser,
  __patchUser,
} from "../async/login";

const initialState = {
  user: {
    result: null,
  },
  checkNickname: false,
  social: null,
  loading: false,
  changeUser: null,
  exist: false,
  userStatus: {},
  check: false,
  userIcon: {},
  changeStatus: false,
  isFetching: false,
  errorMessage: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    // 닉네임이 바뀔 때마다 state 변경
    changeNickname: (state, payload) => {
      state.checkNickname = false;
    },
  },
  extraReducers: (builder) =>
    builder
      // 로그인
      .addCase(__login.fulfilled, (state, action) => {
        state.loading = false;
        state.exist = action.payload;
        alert("무드캐처로 입장하셨습니다!");
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__login.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__login.rejected, (state, action) => {
        state.loading = false;
        state.exist = action.payload;
        alert("이메일이나 비밀번호를 다시 확인해주세요.");
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 성별, 닉네임, 나이 작성하기
      .addCase(__detail.fulfilled, (state, action) => {
        state.user.detail = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__detail.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__detail.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 소셜로그인
      .addCase(__socialLogin.fulfilled, (state, action) => {
        state.social = action.payload.message;
        alert("무드캐처로 입장하셨습니다!");
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__socialLogin.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__socialLogin.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 닉네임 중복 체크
      .addCase(__checkNickname.fulfilled, (state, action) => {
        state.checkNickname = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__checkNickname.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__checkNickname.rejected, (state, action) => {
        state.checkNickname = action.payload;
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 프로필 수정
      .addCase(__editProfile.fulfilled, (state, action) => {
        state.changeUser = action.payload;
        state.changeStatus = true;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__editProfile.pending, (state, action) => {
        state.changeStatus = false;
        state.isFetching = true;
      })
      .addCase(__editProfile.rejected, (state, action) => {
        state.changeUser = action.payload;
        state.changeStatus = false;
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 회원 탈퇴
      .addCase(__delUser.fulfilled, (state, action) => {})
      .addCase(__delUser.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__delUser.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 유저 정보 조회
      .addCase(__getUser.fulfilled, (state, action) => {
        state.userStatus = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getUser.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getUser.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 프로필 아이콘 바꾸기
      .addCase(__patchUser.fulfilled, (state, action) => {
        state.userIcon = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__patchUser.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__patchUser.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      }),
});

// reducer dispatch하기 위해 export 하기
export const { changeNickname } = loginSlice.actions;
export default loginSlice.reducer;
