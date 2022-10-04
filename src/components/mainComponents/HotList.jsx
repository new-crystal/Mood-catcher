import styled from "styled-components";
import moody from "../../image/냥5.png";

const HotList = ({ setHot }) => {
  const text =
    "매일 밤 무드캐처의 마스코트 고양이 무디는 \n하루동안 가장 많은 사랑를 받은 게시물을 \n메인 화면에 모아두는 습관이 있답니다!";
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
            <h6>하루 동안 무드를 가장 많이 받은 게시물</h6>
          </TextBox>
        </Grade>
        <Grade>
          <TextBox>
            <h4>명예의 전당</h4>
            <h6>Hot Post 등극한 게시물</h6>
          </TextBox>
        </Grade>
        <MoodyBox>
          <MoodyImg style={{ backgroundImage: `url(${moody})` }}>
            <img
              src={`${moody}`}
              alt=""
              width="0"
              height="0"
              style={{ display: "none !important" }}
            />
          </MoodyImg>
          <h6>{text}</h6>
        </MoodyBox>
      </ListBox>
    </>
  );
};

const ListBox = styled.div`
  width: 320px;
  height: 240px;
  background-color: white;
  border: 10px solid #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 222;
  position: absolute;
  left: 30;
  top: 10%;

  h3 {
    margin: 0px;
    font-size: 15px;
    font-weight: 900;
  }
  h6 {
    margin: 0px;
    font-size: 12px;
    white-space: pre-wrap;
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
  align-items: left;
  justify-content: center;
  height: 50px;

  h4 {
    margin: 0 0 2px 0;
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

const MoodyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: row;
  margin-top: 10px;
`;
const MoodyImg = styled.div`
  margin-left: -10px;
  width: 50px;
  height: 50px;
  background-position: center;
  background-size: cover;
  /* background-image: url(${moody}); */
`;
export default HotList;
