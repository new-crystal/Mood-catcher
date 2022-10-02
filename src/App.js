import React, { Fragment, useEffect } from "react";
import loadable from "@loadable/component";
import { createGlobalStyle } from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import Loader from "./shared/Loader";

import "./App.css";
import { getCookie } from "./shared/cookie";

// 코드 스플리팅을 위한 loadable설정
const Main = loadable(() => import("./page/Main"), {
  fallback: <Loader />,
});
const Login = loadable(() => import("./page/Login"), {
  fallback: <Loader />,
});
const SignupGenderAge = loadable(() => import("./page/GenderAge"), {
  fallback: <Loader />,
});
const Signup = loadable(() => import("./page/Signup"), {
  fallback: <Loader />,
});
const Edit_profile = loadable(() => import("./page/Edit_profile"), {
  fallback: <Loader />,
});
const Upload = loadable(() => import("./page/Upload"), {
  fallback: <Loader />,
});
const Upload_select = loadable(() => import("./page/Upload_select"), {
  fallback: <Loader />,
});

const Edit_post = loadable(() => import("./page/Edit_post"), {
  fallback: <Loader />,
});
const Edit_post_select = loadable(() => import("./page/Edit_post_select"), {
  fallback: <Loader />,
});

const MyPage = loadable(() => import("./page/Mypage"), {
  fallback: <Loader />,
});
const Closet = loadable(() => import("./page/Closet"), {
  fallback: <Loader />,
});
const Search = loadable(() => import("./page/Search"), {
  fallback: <Loader />,
});
const Search_result = loadable(() => import("./page/Search_result"), {
  fallback: <Loader />,
});
const Item_detail = loadable(() => import("./page/Item_detail"), {
  fallback: <Loader />,
});
const Like = loadable(() => import("./page/Like"), {
  fallback: <Loader />,
});
const Open = loadable(() => import("./page/Open"), {
  fallback: <Loader />,
});
const Alarm = loadable(() => import("./page/Alarm"), {
  fallback: <Loader />,
});
const Edit_password = loadable(() => import("./page/Edit_password"), {
  fallback: <Loader />,
});
const Kakao = loadable(() => import("./page/MapImage"), {
  fallback: <Loader />,
});
const Best_Posts = loadable(() => import("./page/BestPosts"), {
  fallback: <Loader />,
});
const Start = loadable(() => import("./page/Start"), {
  fallback: <Loader />,
});

function App() {
  const token = getCookie("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname !== "/") {
      if (token === undefined) navigate("/login");
    }
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
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/kakao" element={<Kakao />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/detail" element={<SignupGenderAge />} />
        <Route path="/edit_profile" element={<Edit_profile />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/upload_select" element={<Upload_select />} />
        <Route path="/edit_post/:postId/:imgUrl" element={<Edit_post />} />
        <Route
          path="/edit_post_select/:postId"
          element={<Edit_post_select />}
        />
        <Route path="/mypage/:userId" element={<MyPage />} />
        <Route path="/closet/:userId" element={<Closet />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/result/:keyword" element={<Search_result />} />
        <Route path="/item_detail/:postId/:userId" element={<Item_detail />} />
        <Route path="/like/:userId" element={<Like />} />
        <Route path="/" element={<Open />} />
        <Route path="/alarm/:userId" element={<Alarm />} />
        <Route path="/edit_password" element={<Edit_password />} />
        <Route path="/best" element={<Best_Posts />} />
        <Route path="/start" element={<Start />} />
        <Route path="*" element={<Main />} />
      </Routes>
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
  a {
    cursor: default;
  }
`;
