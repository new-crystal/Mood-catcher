import React, { Fragment } from "react";
import styled from "styled-components";
import BestPostsForm from "../components/bestPostsComponents/BestPostsForm";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";

const BestPosts = (props) => {
  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <BestPostsForm />
        </Grid>
      </Container>
      <NavigationBar props={props} />
    </Fragment>
  );
};

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
export default BestPosts;
