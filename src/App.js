import React, { useEffect, Suspense, lazy, Fragment } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";
import Loader from "./shared/Loader";
import "./App.css";

const Upload = lazy(() => import("./page/Upload"));
const Upload_select = lazy(() => import("./page/Upload_select"));
const Login = lazy(() => import("./page/Login"));

function App() {
  return (
    <Fragment>
      <Suspense
        fallback={
          <LoaderWrap>
            <Loader />
          </LoaderWrap>
        }
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload_select" element={<Upload_select />} />
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
