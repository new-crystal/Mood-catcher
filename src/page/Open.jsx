import React, { Fragment } from "react";
import styled from "styled-components";
import OpenForm from "../components/openComponents/OpenForm";

const Open = (props) => {
  return (
    <Fragment>
      <Container>
        <Grid>
          <OpenForm />
        </Grid>
      </Container>
    </Fragment>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 26.75rem;
  width: 100vw;
`;

const Grid = styled.div`
  margin: 0 auto;
  max-width: 26.75rem;
  width: 100vw;
`;

export default Open;
