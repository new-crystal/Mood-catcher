import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import loginReducer from "./modules/loginSlice";
<<<<<<< HEAD
import signupReducer from "./modules/signupSlice";
=======
import signupReducer from "./modules/signUpSlice";
>>>>>>> 137432a (#3 add sign up login)
const middlewares = [thunk];
// 리듀서 통합
const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
});
// 스토어 연결
const store = configureStore({
  reducer: rootReducer,
  // 미들웨어가 thunk 뿐이라 생략 가능하지만 추후 logger 사용 가능성이 있어 표시
  middleware: [...middlewares],
});

export default store;
