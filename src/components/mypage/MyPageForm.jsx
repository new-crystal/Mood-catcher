import { useSelector } from "react-redux";
import styled from "styled-components";

const MyPageForm = () => {
  const postList = useSelector((state) => state);

  return (
    <Container>
      <MyPageHeader>
        <h1>My Page</h1>
      </MyPageHeader>
      <Img></Img>
    </Container>
  );
};
const Container = styled.div`
  width: 428px;
  height: 926px;
`;

const MyPageHeader = styled.div`
  width: 428px;
  height: 60px;
  background-color: #a396c9;
  color: white;
`;

const Img = styled.div`
  width: 107px;
  height: 107px;
  border-radius: 50%;
  margin: 10px auto;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;

export default MyPageForm;
