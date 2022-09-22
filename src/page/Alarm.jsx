import React, { useState, Fragment, Suspense, useEffect } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import AlarmForm from "../components/alarmComponents/AlarmForm";

const Alarm = (props) => {
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
            <Header />
            <AlarmForm />
          </Grid>
        </Container>
        <NavigationBar props={props} />
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
  max-width: 428px;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background: linear-gradient(#a396c9, #ffffff);
`;

export default Alarm;
