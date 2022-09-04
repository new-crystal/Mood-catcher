import React, { Fragment, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import EditProfileForm from "../components/profileComponents/EditProfileForm";

const Edit_profile = () => {
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
        <Container>
          <Grid>
            <LoginWrap>
              <EditProfileForm />
            </LoginWrap>
          </Grid>
        </Container>
      </Suspense>
    </Fragment>
  );
};

export default Edit_profile;

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

const Container = styled.div`
  display: flex;
  height: 984px;
  background-color: orange;
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
  //width: 100%;
  width: 428px;
  margin: 0 auto;
  background-color: royalblue;
  margin-top: 60px;
  margin-bottom: 500px;
`;

const LoginWrap = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
