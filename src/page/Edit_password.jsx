import React, { Fragment, Suspense } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import EditPasswordForm from "../components/signupComponents/EditPasswordForm";

const Edit_password = () => {
  return (
    <Fragment>
      <LoginWrap>
        <Container>
          <Header />
          <EditPasswordForm />
        </Container>
      </LoginWrap>
    </Fragment>
  );
};

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

const Container = styled.div`
  max-width: 26.75rem;
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);
  margin: 0 auto;
  margin-top: 60px;
  background: linear-gradient(#a396c9, #ffffff);
`;

const Grid = styled.div`
  max-width: 428px;
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);
  margin: 0 auto;
  background-color: royalblue;
  margin-top: 60px;
  margin-bottom: 500px;
`;

const LoginWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export default Edit_password;
