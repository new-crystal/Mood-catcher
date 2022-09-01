import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD

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
=======
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
>>>>>>> 137432a (#3 add sign up login)
    return response.data;
  }
);

<<<<<<< HEAD
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
=======
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
>>>>>>> 137432a (#3 add sign up login)
export default loginSlice.reducer;
