import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../shared/api";

// 로그인
export const __login = createAsyncThunk("LOGIN", async (payload, thunkAPI) => {
  const response = await api.post("/auth/login", payload);
  //sessionStorage.setItem("token", response.data.userStatus.token);
  return response.data;
});

//닉네임중복체크
export const __checkNickname = createAsyncThunk(
  "CHECKNICKNAME",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auth?${payload}`);
      return response.data.result;
    } catch (err) {
      return alert("중복된 닉네임이 있습니다.");
    }
  }
);

//성별과 닉네임 나이
export const __detail = createAsyncThunk(
  "DETAIL",
  async (payload, thunkAPI) => {
    const response = await api.post("/auth/detail", payload);
    return response.data;
  }
);

//소셜 로그인
export const __socialLogin = createAsyncThunk(
  "SOCIALLOGIN",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/auth/kakao");
      thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  user: {
    nickname: "",
    detail: "",
    result: false,
  },
  social: null,
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
      //성별과 나이 닉네임
      .addCase(__detail.fulfilled, (state, action) => {
        state.user.detail = action.payload;
      })
      //소셜로그인
      .addCase(__socialLogin.fulfilled, (state, action) => {
        state.social = action.payload.message;
        alert("무드캐처로 입장하셨습니다!");
      })
      //닉네임 중복확인
      .addCase(__checkNickname.fulfilled, (state, action) => {
        state.checkEmail = action.payload;
      })
      .addCase(__checkNickname.rejected, (state, action) => {
        alert("중복된 닉네임이 있습니다.");
      }),
});

// // reducer dispatch하기 위해 export 하기
export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
