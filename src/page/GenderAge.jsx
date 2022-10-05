import React, { Fragment } from "react";
import styled from "styled-components";
import SignupGenderAge from "../components/signupComponents/SignupGenderAge";

export default function GenderAge(props) {
  return (
    <Fragment>
      <Container>
        <Grid>
          <LoginWrap>
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
  margin: 60px auto 500px auto;
  max-width: 428px;
  width: 100vw;
  background-color: royalblue;
`;

const LoginWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
