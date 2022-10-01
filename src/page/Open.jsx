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
  max-width: 26.75rem;
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);
  margin: 0 auto;
  /* margin-top: 60px; */
  /* background: linear-gradient(#a396c9, #ffffff); */
`;

const Grid = styled.div`
  max-width: 26.75rem;
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);

  margin: 0 auto;
  /* background: linear-gradient(#a396c9, #ffffff); */
  /* margin-top: 60px; */
  /* margin-bottom: 500px; */
`;

export default Open;
