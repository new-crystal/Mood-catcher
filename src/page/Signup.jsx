import React, { Fragment } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import SignupForm from "../components/signupComponents/SignupForm";

const Signup = () => {
  return (
    <Fragment>
      <LoginWrap>
        <Container>
          <Grid>
            <Header />
            <SignupForm />
          </Grid>
        </Container>
      </LoginWrap>
    </Fragment>
  );
};

export default Signup;

const Container = styled.div`
  display: flex;
  max-width: 26.75rem;
  width: 100vw;
  margin: 0 auto;
  bottom: 110px;
  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: auto;
    text-align: left;
  }
`;

const Grid = styled.div`
  margin: 60px auto 0 auto;
  width: 100vw;
  background-color: royalblue;
`;

const LoginWrap = styled.div`
  display: flex;
  width: 100%;
  background-color: #ffffff;
  flex-direction: column;
  text-align: center;
`;
