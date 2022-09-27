import React, { Fragment } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import ClosetPosts from "../components/closetComponents/ClosetPosts";

const Closet = (props) => {
  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <ClosetPosts />
        </Grid>
      </Container>
      <NavigationBar props={props} />
    </Fragment>
  );
};

export default Closet;

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
  //height: calc(var(--vh, 1vh) * 100);
  min-height: 926px;
  background: linear-gradient(#a396c9, #ffffff);
`;
