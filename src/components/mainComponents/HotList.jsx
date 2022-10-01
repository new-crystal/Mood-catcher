import styled from "styled-components";

const HotList = ({ setHot }) => {
  return (
    <>
      <Shadow onClick={() => setHot(false)}></Shadow>
      <ListBox>
        <TitleBox>
          <h3>Hot / 명예의 전당 적용 기준</h3>
          <ConfirmBtn type="button" onClick={() => setHot(false)}>
            ✖️
          </ConfirmBtn>
        </TitleBox>
        <h6>(Hot Post와 명예의 전당은 매일 자정에 업데이트 됩니다)</h6>
        <Grade>
          <TextBox>
            <h4>Hot Post</h4>
            <h6>하루 동안 좋아요를 가장 많이 받은 게시물</h6>
          </TextBox>
        </Grade>
        <Grade>
          <TextBox>
            <h4>명예의 전당</h4>
            <h6>전 날 Hot Post였던 게시물</h6>
          </TextBox>
        </Grade>
      </ListBox>
    </>
  );
};

const ListBox = styled.div`
  width: 300px;
  height: 200px;
  background-color: white;
  border: 10px solid #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 222;
  position: absolute;
  left: 30%;
  top: 40%;

  h3 {
    margin: 0px;
  }
  h6 {
    margin: 0px;
  }
`;
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const ConfirmBtn = styled.button`
  width: 40px;
  height: 20px;
  background-color: white;
  color: #7b758b;
  border: 0px;
  margin-right: -30px;
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
const Shadow = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 22;
`;

export default HotList;
