import React, { Fragment } from "react";
import styled from "styled-components";
import StartForm from "../components/startComponents/StartForm";

const Start = (props) => {
  return (
    <Fragment>
      <Container>
        <Grid>
          <StartForm />
        </Grid>
      </Container>
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
  margin: 0 auto;
  max-width: 428px;
  width: 100vw;
`;

export default Start;
