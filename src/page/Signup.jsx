import SignupForm from "../components/signupComponents/SignupForm";
import styled from "styled-components";

const Signup = () => {
  return (
    <Wrap>
      <Container>
        <SignupForm />
      </Container>
    </Wrap>
  );
};

const Wrap = styled.div`
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

export default Signup;
