import styled from "styled-components";

const MoodPoint = ({ setMoodPoint }) => {
  return (
    <>
      <Shadow onClick={() => setMoodPoint(false)}>
        <ListBox>
          <TitleBox>
            <h3>Mood Point 쌓는 방법</h3>
            <ConfirmBtn type="button" onClick={() => setMoodPoint(false)}>
              ✖️
            </ConfirmBtn>
          </TitleBox>
          <h6>(Mood Point는 매일 자정에 업데이트 됩니다)</h6>
          <Grade>
            <TextBox>
              <h4>회원가입/로그인</h4>
              <h6>500무드/200 무드 </h6>
            </TextBox>
          </Grade>
          <Grade>
            <TextBox>
              <h4>옷장 채우기</h4>
              <h6> 옷장 100무드 착장정보 100무드 </h6>
            </TextBox>
          </Grade>
          <Grade>
            <TextBox>
              <h4>다른 캐처님이 캐처님의 옷장 열람</h4>
              <h6>50무드</h6>
            </TextBox>
          </Grade>
          <Grade>
            <TextBox>
              <h4>댓글 남기기/받기</h4>
              <h6>남기기 30무드/받기30무드 </h6>
            </TextBox>
          </Grade>
          <Grade>
            <TextBox>
              <h4>무드 보내기/받기</h4>
              <h6>보내기 30무드/받기 10무드</h6>
            </TextBox>
          </Grade>
          <Grade>
            <TextBox>
              <h4>메인 Hot Rank 등재</h4>
              <h6>1등 3000무드/2등 2000무드/3등 1000무드</h6>
            </TextBox>
          </Grade>
        </ListBox>
      </Shadow>
    </>
  );
};

const Shadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 22;
`;

const ListBox = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  display: flex;
  border: 10px solid #ddd;
  border-radius: 20px;
  width: 300px;
  height: 350px;
  background-color: white;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 222;
  transform: translate(-50%, 0);

  h3 {
    margin: 0px;
    font-weight: 900;
  }
  h6 {
    margin: 0px;
    font-size: 12px;
  }
`;
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const ConfirmBtn = styled.button`
  margin-right: -30px;
  border: 0px;
  width: 40px;
  height: 20px;
  background-color: white;
  color: #7b758b;
`;
const Grade = styled.div`
  display: flex;
  margin: 5px;
  border-radius: 10px;
  width: 280px;
  height: 50px;
  background-color: #ddd;
  align-items: center;
  justify-content: baseline;
  flex-direction: row;
`;
const TextBox = styled.div`
  display: flex;
  margin-left: 20px;
  flex-direction: column;

  h4 {
    margin: 0px;
    font-size: small;
    font-weight: 900;
  }
  h6 {
    margin: 0px;
    color: #848484;
  }
`;

export default MoodPoint;
