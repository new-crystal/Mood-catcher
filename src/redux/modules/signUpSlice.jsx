import { __signUp, __checkEmail, __getUsers, __getOpen } from "../async/signup";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkEmail: false,
  is_signup: null,
  userStatus: {},
  startMsg: null,
  isFetching: false,
  errorMessage: null,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState: initialState,
  reducers: {
    //email이 바뀔 때마다 state 변경
    changeEmail: (state, payload) => {
      state.checkEmail = false;
    },
  },
  extraReducers: (builder) =>
    builder
      // 회원가입
      .addCase(__signUp.fulfilled, (state, action) => {
        state.is_signup = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
        alert("무드캐처 회원가입에 성공하셨습니다.");
      })
      .addCase(__signUp.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__signUp.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
        alert("무드캐처 회원가입에 실패하셨습니다");
      })
      // 이메일 중복 체크
      .addCase(__checkEmail.fulfilled, (state, action) => {
        state.checkEmail = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__checkEmail.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__checkEmail.rejected, (state, action) => {
        state.checkEmail = action.payload;
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 유저 정보 조회하기
      .addCase(__getUsers.fulfilled, (state, action) => {
        state.userStatus = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getUsers.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getUsers.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      // 초기화면 조회하기
      .addCase(__getOpen.fulfilled, (state, action) => {
        state.startMsg = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__getOpen.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__getOpen.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      }),
});

export const { changeEmail } = signUpSlice.actions;
export default signUpSlice.reducer;
