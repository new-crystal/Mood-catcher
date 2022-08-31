import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Login() {
  return (
    <LoginWrap>
      <Container>
        <Link to={"/upload"}>
          <div>업로드</div>
        </Link>
      </Container>
    </LoginWrap>
  );
}

const LoginWrap = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Container = styled.div`
  width: 360px;
  margin: 0 auto;
`;
