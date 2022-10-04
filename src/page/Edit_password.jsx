import React, { Fragment } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import EditPasswordForm from "../components/signupComponents/EditPasswordForm";

const Edit_password = () => {
  return (
    <Fragment>
      <LoginWrap>
        <Container>
          <Header />
          <EditPasswordForm />
        </Container>
      </LoginWrap>
    </Fragment>
  );
};

const LoginWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  margin: 60px auto 0 auto;
  max-width: 26.75rem;
  width: 100vw;
`;

export default Edit_password;
