import React, { Fragment } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import SignupGenderAge from "../components/signupComponents/SignupGenderAge";

export default function GenderAge(props) {
  return (
    <Fragment>
      <Container>
        <Grid>
          <LoginWrap>
            {/* <Header /> */}
            <SignupGenderAge />
          </LoginWrap>
        </Grid>
      </Container>
    </Fragment>
  );
}

const Container = styled.div`
  display: flex;
  height: 984px;
  /* background-color: orange; */
  flex-direction: column;
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
  /* text-align: center; */
`;
