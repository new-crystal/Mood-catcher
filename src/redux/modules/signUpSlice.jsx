import { api } from "../../shared/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//회원가입
export const __signUp = createAsyncThunk(
  "SIGNUP",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/auth/signup", payload);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//이메일 중복 체크
export const __checkEmail = createAsyncThunk(
  "CHECKEMAIL",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auth/checkEmail?email=${payload}`);
      if (response.status === 200) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
);

//회원 탈퇴
const initialState = {
  checkEmail: false,
  is_signup: null,
};

//리듀서
const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    //email이 바뀔 때마다 state 변경
    changeEmail: (state, payload) => {
      state.checkEmail = false;
    },
  },
  extraReducers: (builder) =>
    builder
      //회원가입
      .addCase(__signUp.fulfilled, (state, action) => {
        state.is_signup = action.payload;
      })
      .addCase(__signUp.rejected, (state, action) => {
        alert("무드캐처 회원가입에 실패하셨습니다");
      })
      //이메일 중복체크
      .addCase(__checkEmail.fulfilled, (state, action) => {
        state.checkEmail = action.payload;
      })
      .addCase(__checkEmail.rejected, (state, action) => {
        state.checkEmail = action.payload;
      }),
});

export const { changeEmail } = signUpSlice.actions;
export default signUpSlice.reducer;
