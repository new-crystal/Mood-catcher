import styled from "styled-components";
import man5 from "../../image/5man.png";

const GradeList = ({ setGradeList }) => {
  return (
    <Container onClick={() => setGradeList(false)}>
      <MyPageHeader>
        <h1>Mood catcher</h1>
      </MyPageHeader>
      <ListBox>
        <Grade>
          <GradeImg url={`${man5}`}></GradeImg>
          <h1>티셔츠</h1>
        </Grade>
        <Grade>
          <GradeImg url={`${man5}`}></GradeImg>
          <h1>와이셔츠</h1>
        </Grade>
        <Grade>
          <GradeImg url={`${man5}`}></GradeImg>
          <h1>넥타이</h1>
        </Grade>
        <Grade>
          <GradeImg url={`${man5}`}></GradeImg>
          <h1>조끼</h1>
        </Grade>
        <Grade>
          <GradeImg url={`${man5}`}></GradeImg>
          <h1>자켓</h1>
        </Grade>
      </ListBox>
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
const ListBox = styled.div`
  width: 350px;
  height: 450px;
  border: 10px solid #ddd;
  border-radius: 20px;
  margin: 30px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Grade = styled.div`
  width: 305px;
  height: 70px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 10px;
  border-radius: 10px;
`;
const GradeImg = styled.div`
  width: 53px;
  height: 53px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  margin-right: 30px;
  margin-left: -90px;
`;
export default GradeList;
