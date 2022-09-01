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
      const response = await api.get(`/auth/checkEmail?${payload}`);
      if (response.data.status === 200) {
        return true;
      }
    } catch (err) {
      alert("중복된 이메일이 있습니다.");
      console.log(err);
      return false;
    }
  }
);

const initialState = {
  checkEmail: false,
  is_signup: null,
};

//리듀서
const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    changeEmail: (state) => {
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
