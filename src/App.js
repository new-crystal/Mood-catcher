import React, { Suspense, lazy, Fragment } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";
import Loader from "./shared/Loader";
import "./App.css";

// 코드 스플리팅을 위한 lazy설정
const Main = lazy(() => import("./page/Main"));
const Login = lazy(() => import("./page/Login"));
const SignupGenderAge = lazy(() =>
  import("./components/signupComponents/SignupGenderAge")
);
const Signup = lazy(() => import("./page/Signup"));
const Edit_profile = lazy(() => import("./page/Edit_profile"));
const Upload = lazy(() => import("./page/Upload"));
const Upload_select = lazy(() => import("./page/Upload_select"));
const MyPage = lazy(() => import("./page/Mypage"));
const Closet = lazy(() => import("./page/Closet"));
const Search = lazy(() => import("./page/Search"));

function App() {
  return (
    <Fragment>
      {/* Suspense이용 최적화 및 Loading중에는 Loader가 작동*/}
      <Suspense
        fallback={
          <LoaderWrap>
            <Loader />
          </LoaderWrap>
        }
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/detail" element={<SignupGenderAge />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/edit_profile" element={<Edit_profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload_select" element={<Upload_select />} />
          <Route path="/login/detail" element={<SignupGenderAge />} />
          <Route path="/mypage/:userId" element={<MyPage />} />
          <Route path="/closet/:userId" element={<Closet />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </Suspense>
      <GlobalStyle />
    </Fragment>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;
