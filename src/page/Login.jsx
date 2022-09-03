import React, { Fragment, Suspense } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import LoginForm from "../components/loginComponents/LoginForm";

export default function Login(props) {
  return (
    <Fragment>
      <Suspense
        fallback={
          <LoaderWrap>
            <Loader />
          </LoaderWrap>
        }
      >
        <Header />
        <LoginWrap>
          <Container>
            <LoginForm />
          </Container>
        </LoginWrap>
      </Suspense>
    </Fragment>
  );
}

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

const LoginWrap = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Container = styled.div`
  width: 428px;
  margin: 0 auto;
  margin-top: 60px;
`;
