import styled from "styled-components";

const MoodPoint = ({ setMoodPoint }) => {
  return (
    <>
      <Shadow onClick={() => setMoodPoint(false)}></Shadow>
      <ListBox>
        <TitleBox>
          <h3>mood Point 쌓는 방법</h3>
          <ConfirmBtn type="button" onClick={() => setMoodPoint(false)}>
            확인
          </ConfirmBtn>
        </TitleBox>
        <Grade>
          <TextBox>
            <h4>회원가입/로그인</h4>
            <h6>500무드/100 무드 </h6>
          </TextBox>
        </Grade>
        <Grade>
          <TextBox>
            <h4>mood grade 상승</h4>
            <h6>200 무드 </h6>
          </TextBox>
        </Grade>
        <Grade>
          <TextBox>
            <h4>옷장 채우기</h4>
            <h6> 옷장 50무드 착장정보 50무드 </h6>
          </TextBox>
        </Grade>
        <Grade>
          <TextBox>
            <h4>무드 받기</h4>
            <h6>게시물 무드별 1무드</h6>
          </TextBox>
        </Grade>
        <Grade>
          <TextBox>
            <h4>메인 Hot Rank 등재</h4>
            <h6>1500무드</h6>
          </TextBox>
        </Grade>
      </ListBox>
    </>
  );
};

const ListBox = styled.div`
  width: 300px;
  height: 350px;
  background-color: white;
  border: 10px solid #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 222;
  position: absolute;
  left: 5%;
  top: 20%;

  h3 {
    margin: 0px;
  }
`;
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const MudiBtn = styled.button`
  width: 100px;
  height: 20px;
  background-color: white;
  color: #7b758b;
  border: 0px;
`;
const ConfirmBtn = styled.button`
  width: 40px;
  height: 20px;
  background-color: white;
  color: #7b758b;
  border: 0px;
  margin-right: -20px;
`;
const Grade = styled.div`
  width: 280px;
  height: 50px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: baseline;
  flex-direction: row;
  margin: 5px;
  border-radius: 10px;
`;
const TextBox = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0px;
    font-size: small;
  }
  h6 {
    margin: 0px;
    color: #848484;
  }
`;
const GradeImg = styled.div`
  width: 45px;
  height: 45px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  margin-right: 30px;
  margin-left: 10px;
`;
const Shadow = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 22;
`;

export default MoodPoint;
