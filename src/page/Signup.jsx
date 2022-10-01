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
  max-width: 26.75rem;
  width: 100vw;
  display: flex;
  /* height: 984px; */
  margin: 0 auto;
  /* flex-direction: column; */
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
  /* max-width: 26.75rem; */
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);

  margin: 0 auto;
  background-color: royalblue;
  margin-top: 60px;
  /* margin-bottom: 500px; */
`;

const LoginWrap = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  text-align: center;
  /* background: linear-gradient(#a396c9, #ffffff); */
`;
