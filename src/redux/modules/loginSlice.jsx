import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../shared/api";

// 로그인
export const __login = createAsyncThunk("LOGIN", async (payload, thunkAPI) => {
  try {
    const response = await api.post("/auth/login", payload);
    //sessionStorage.setItem("token", response.data.userStatus.token);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

//닉네임중복체크
export const __checkNickname = createAsyncThunk(
  "CHECKNICKNAME",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`/auth/checkNickname?${payload}`);
      if (response.data.status === 200) {
        return true;
      }
    } catch (err) {
      alert("중복된 닉네임이 있습니다.");
      return false;
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
      const response = await api.get("/auth/kakao");
      thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err);
      //hunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  user: {
    nickname: null,
    detail: null,
    result: null,
  },
  checkNickname: false,
  social: null,
  loading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeNickname: (state) => {
      state.checkNickname = false;
    },
  },
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
        state.checkEmail = action.payload;
      }),
});

// // reducer dispatch하기 위해 export 하기
export const { changeNickname } = loginSlice.actions;
export default loginSlice.reducer;
