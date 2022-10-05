import React, { Fragment } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import SearchResultForm from "../components/searchComponents/SearchResultForm";

const Search = (props) => {
  return (
    <Fragment>
      <LoginWrap>
        <Container>
          <Header />
          <SearchResultForm />
        </Container>
      </LoginWrap>
      <NavigationBar props={props} />
    </Fragment>
  );
};

const LoginWrap = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  margin: 60px auto 0 auto;
  padding-bottom: 70px;
  max-width: 428px;
  width: 100vw;
`;

export default Search;
