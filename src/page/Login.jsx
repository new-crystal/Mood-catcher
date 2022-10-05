import React, { Fragment } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import LoginForm from "../components/loginComponents/LoginForm";

export default function Login(props) {
  return (
    <Fragment>
      <LoginWrap>
        <Container>
          <Header />
          <LoginForm />
        </Container>
      </LoginWrap>
    </Fragment>
  );
}

const LoginWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Container = styled.div`
  margin: 60px auto 0 auto;
  max-width: 26.75rem;
  width: 100vw;
`;
