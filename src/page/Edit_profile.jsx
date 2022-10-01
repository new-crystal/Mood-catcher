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
  /* height: 984px; */
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
  /* background-color: royalblue; */
  margin-top: 60px;
  /* margin-bottom: 500px; */
`;

const LoginWrap = styled.div`
  width: 100%;
  /* background: linear-gradient(#a396c9, #ffffff); */
  display: flex;
  flex-direction: column;
  //text-align: center;
`;
