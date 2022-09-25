import React, { useState, Fragment, Suspense, useEffect } from "react";
import styled from "styled-components";
import SearchForm from "../components/searchComponents/SearchFrom";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";

const Search = (props) => {
  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <SearchForm />
        </Grid>
      </Container>
      <NavigationBar props={props} />
    </Fragment>
  );
};

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
  /* min-height: 928px; */
  /* min-height: 808px; */
  background: linear-gradient(#a396c9, #ffffff);
  /* height: calc(var(--vh, 1vh) * 100 + 50px); */
`;

export default Search;
