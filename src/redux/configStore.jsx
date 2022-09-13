import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import loginReducer from "./modules/loginSlice";
import signupReducer from "./modules/signUpSlice";
import uploadReducer from "./modules/uploadSlice";
import searchReducer from "./modules/searchSlice";
import rankReducer from "./modules/rankSlice";
import commentReducer from "./modules/commentSlice";
import likeReducer from "./modules/likeSlice";
import alarmReducer from "./modules/alarmSlice";

const middlewares = [thunk];
// 리듀서 통합
const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  upload: uploadReducer,
  search: searchReducer,
  rank: rankReducer,
  comment: commentReducer,
  like: likeReducer,
  alarm: alarmReducer,
});
// 스토어 연결
const store = configureStore({
  reducer: rootReducer,
  // 미들웨어가 thunk 뿐이라 생략 가능하지만 추후 logger 사용 가능성이 있어 표시
  middleware: [...middlewares],
});

export default store;
