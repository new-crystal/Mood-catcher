import React, { Suspense, lazy, Fragment, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import Loader from "./shared/Loader";

import "./App.css";
import { getCookie } from "./shared/cookie";

// 코드 스플리팅을 위한 lazy설정
const Main = lazy(() => import("./page/Main"));
const Login = lazy(() => import("./page/Login"));
const SignupGenderAge = lazy(() => import("./page/GenderAge"));
const Signup = lazy(() => import("./page/Signup"));
const Edit_profile = lazy(() => import("./page/Edit_profile"));
const Upload = lazy(() => import("./page/Upload"));
const Upload_select = lazy(() => import("./page/Upload_select"));

const Edit_post = lazy(() => import("./page/Edit_post"));
const Edit_post_select = lazy(() => import("./page/Edit_post_select"));

const MyPage = lazy(() => import("./page/Mypage"));
const Closet = lazy(() => import("./page/Closet"));
const Search = lazy(() => import("./page/Search"));
const Search_result = lazy(() => import("./page/Search_result"));
const Item_detail = lazy(() => import("./page/Item_detail"));
const Like = lazy(() => import("./page/Like"));
const Open = lazy(() => import("./page/Open"));
const Alarm = lazy(() => import("./page/Alarm"));

function App() {
  const token = getCookie("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token === undefined) navigate("/login");
    setScreenSize();
    window.addEventListener("resize", () => setScreenSize());
  }, []);

  //화면 사이즈 받아오기
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
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
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login/detail" element={<SignupGenderAge />} />
          <Route path="/edit_profile" element={<Edit_profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload_select" element={<Upload_select />} />
          <Route path="/edit_post/:postId" element={<Edit_post />} />
          <Route
            path="/edit_post_select/:postId"
            element={<Edit_post_select />}
          />
          <Route path="/mypage/:userId" element={<MyPage />} />
          <Route path="/closet/:userId" element={<Closet />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/result/:keyword" element={<Search_result />} />
          <Route
            path="/item_detail/:postId/:userId"
            element={<Item_detail />}
          />
          <Route path="/like/:userId" element={<Like />} />
          <Route path="/" element={<Open />} />
          <Route path="/alarm/:userId" element={<Alarm />} />
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
  :root {
    --vh:100%
  }
`;

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;
