import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios 기본 세팅
import { api } from "../../shared/api";

// 로그인
// js : 이것은 참고용도입니다. 수정가능!
export const __login = createAsyncThunk(
  "log/LOGIN_LOG",
  async (payload, thunkAPI) => {
    const response = await api.post("/user/login", payload);
    // 토큰 localstorge 저장하기
    localStorage.setItem("token", response.data.token);
    // 로그인 상태 값 {true / false}
    return response.data;
  }
);

// js : 이것은 참고용도입니다. 수정가능!
const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {},
  //
  extraReducers: (builder) => {
    builder
      //로그인
      .addCase(__login.fulfilled, (state, action) => {});
  },
});

// // reducer dispatch하기 위해 export 하기
export const {} = loginSlice.actions;
export default loginSlice.reducer;
