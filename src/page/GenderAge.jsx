import React, { Fragment, Suspense } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import SignupGenderAge from "../components/signupComponents/SignupGenderAge";

export default function GenderAge(props) {
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
            <SignupGenderAge />
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
  display: flex;
  flex-direction: column;
  text-align: center;
  /* min-height: 928px; */
`;

const Container = styled.div`
  width: 428px;
  margin: 0 auto;
  margin-top: 0px;
  background: linear-gradient(#a396c9, #ffffff);
  /* min-height: 928px; */
`;
