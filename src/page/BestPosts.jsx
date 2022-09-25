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
  max-width: 26.75rem;
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);
  margin: 0 auto;
  margin-top: 60px;
  background: linear-gradient(#a396c9, #ffffff);
`;
const Grid = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 57px;
  max-width: 428px;
  width: 100vw;
  /* min-height: 928px; */
  /* min-height: 808px; */
  background: linear-gradient(#a396c9, #ffffff);
  //height: calc(var(--vh, 1vh) * 100 + 50px);
`;
export default BestPosts;
