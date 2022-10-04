import React, { Fragment } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import EditProfileForm from "../components/profileComponents/EditProfileForm";

const Edit_profile = (props) => {
  return (
    <Fragment>
      <Container>
        <Grid>
          <LoginWrap>
            <Header />
            <EditProfileForm />
          </LoginWrap>
        </Grid>
      </Container>

      <NavigationBar props={props} />
    </Fragment>
  );
};

export default Edit_profile;

const Container = styled.div`
  display: flex;
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
  margin: 60px auto 70px auto;
  max-width: 428px;
  width: 100vw;
`;

const LoginWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
