import React, { useState, Fragment, Suspense, useEffect } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import OpenForm from "../components/openComponents/OpenForm";

const Mypage = (props) => {
  return (
    <Fragment>
      <Suspense
        fallback={
          <LoaderWrap>
            <Loader />
          </LoaderWrap>
        }
      >
        <Container>
          <Grid>
            <OpenForm />
          </Grid>
        </Container>
      </Suspense>
    </Fragment>
  );
};

const LoaderWrap = styled.div`
  position: absolute;
  margin-top: -100px;
  margin-left: -100px;
  top: 50%;
  left: 50%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 926px; */
  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: auto;
    text-align: left;
  }
`;

const Grid = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 57px;
  width: 428px;
  background: linear-gradient(#a396c9, #ffffff);
`;

export default Mypage;
