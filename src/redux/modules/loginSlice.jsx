import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../shared/api";

// 로그인
export const __login = createAsyncThunk("LOGIN", async (payload, thunkAPI) => {
  const response = await api.post("/auth/login", payload);
  sessionStorage.setItem("token", response.data.userStatus.token);
  return response.data;
});

//성별과 나이
export const __detail = createAsyncThunk(
  "DETAIL",
  async (payload, thunkAPI) => {
    const response = await api.post("/auth/detail", payload);
    return response.data;
  }
);

const initialState = {
  user: {
    nickname: "",
    detail: "",
    result: false,
  },
  loading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      //로그인
      .addCase(__login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          nickname: action.payload.nickname,
          result: true,
        };
        alert("무드캐처로 입장하셨습니다!");
      })
      .addCase(__login.rejected, (state, action) => {
        state.loading = false;
        alert("이메일이나 비밀번호를 다시 확인해주세요.");
      })
      //성별과 나이
      .addCase(__detail.fulfilled, (state, action) => {
        state.user.detail = action.payload;
      }),
});

// // reducer dispatch하기 위해 export 하기
export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
