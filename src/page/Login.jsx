import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../components/loginComponents/LoginForm";

export default function Login() {
  return (
    <LoginWrap>
      <Container>
        <Link to={"/upload"}>
          <div>업로드</div>
          <LoginForm />
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
