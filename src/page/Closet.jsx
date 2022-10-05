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
  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: auto;
    text-align: left;
  }
`;

const Grid = styled.div`
  margin: 60px auto 57px auto;
  max-width: 428px;
  width: 100vw;
  min-height: 926px;
`;
