import {
  __signUp,
  __checkEmail,
  __getUsers,
  __getOpen,
  __postEmail,
  __postEmailNum,
  __putPassword,
  __postAuthNum,
} from "../async/signup";
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  checkEmail: false,
  is_signup: null,
  userStatus: {},
  startMsg: null,
  isFetching: false,
  errorMessage: null,
  sendEmail: null,
  sendEmailNum: null,
  checkAuthNum: false,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState: initialState,
  reducers: {
    //email이 바뀔 때마다 state 변경
    changeEmail: (state, payload) => {
      state.checkEmail = false;
    },
    //인증번호 값이 바뀔 때마다 state 변경
    changeAuthNum: (state, payload) => {
      state.checkAuthNum = false;
    },
  },
  extraReducers: (builder) =>
    builder
      // 회원가입
      .addCase(__signUp.fulfilled, (state, action) => {
        state.is_signup = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
        Swal.fire({
          icon: "success",
          title: "무드캐처의 캐처님이 되신 것을 환영합니다",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(__signUp.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__signUp.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
        Swal.fire({
          icon: "error",
          title: "무드캐처의 회원가입에 실패하셨습니다",
          showConfirmButton: false,
          timer: 1500,
        });
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
      })
      //이메일 인증번호 발송
      .addCase(__postEmail.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__postEmail.fulfilled, (state, action) => {
        state.sendEmail = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__postEmail.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      //비밀번호 변경 이메일 인증번호 발송
      .addCase(__postEmailNum.pending, (state, action) => {
        state.isFetching = true;
        state.checkEmail = false;
      })
      .addCase(__postEmailNum.fulfilled, (state, action) => {
        state.isFetching = false;
        state.errorMessage = null;
        state.sendEmailNum = action.payload;
        state.checkEmail = true;
      })
      .addCase(__postEmailNum.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
        state.checkEmail = false;
      })
      //비밀번호 변경 전송
      .addCase(__putPassword.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__putPassword.fulfilled, (state, action) => {
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__putPassword.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.errorMessage;
      })
      //이메일 인증번호 발송 확인
      .addCase(__postAuthNum.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(__postAuthNum.fulfilled, (state, action) => {
        state.checkAuthNum = action.payload;
        state.isFetching = false;
        state.errorMessage = null;
      })
      .addCase(__postAuthNum.rejected, (state, action) => {
        state.checkAuthNum = false;
        state.isFetching = false;
        state.errorMessage = action.payload;
      }),
});

export const { changeEmail, changeAuthNum } = signUpSlice.actions;
export default signUpSlice.reducer;
