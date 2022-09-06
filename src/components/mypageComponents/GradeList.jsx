import { Container } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import man5 from "../../image/5man.png";
import cat5 from "../../image/냥5.png";

const GradeList = ({ setGradeList }) => {
  const [mudi, setMudi] = useState(false);

  return (
    <>
      <Shadow onClick={() => setGradeList(false)}></Shadow>
      <ListBox>
        <TitleBox>
          <h3>mood grade</h3>
          <MudiBtn type="button" onClick={() => setMudi(!mudi)}>
            {mudi === false ? "무디로 바꾸기" : "사람으로 바꾸기"}
          </MudiBtn>
        </TitleBox>
        <Grade>
          {mudi === false ? (
            <GradeImg url={`${man5}`}></GradeImg>
          ) : (
            <GradeImg url={`${cat5}`}></GradeImg>
          )}
          <h1>티셔츠</h1>
        </Grade>
        <Grade>
          {mudi === false ? (
            <GradeImg url={`${man5}`}></GradeImg>
          ) : (
            <GradeImg url={`${cat5}`}></GradeImg>
          )}
          <h1>와이셔츠</h1>
        </Grade>
        <Grade>
          {mudi === false ? (
            <GradeImg url={`${man5}`}></GradeImg>
          ) : (
            <GradeImg url={`${cat5}`}></GradeImg>
          )}
          <h1>넥타이</h1>
        </Grade>
        <Grade>
          {mudi === false ? (
            <GradeImg url={`${man5}`}></GradeImg>
          ) : (
            <GradeImg url={`${cat5}`}></GradeImg>
          )}
          <h1>조끼</h1>
        </Grade>
        <Grade>
          {mudi === false ? (
            <GradeImg url={`${man5}`}></GradeImg>
          ) : (
            <GradeImg url={`${cat5}`}></GradeImg>
          )}
          <h1>자켓</h1>
        </Grade>
      </ListBox>
    </>
  );
};

const ListBox = styled.div`
  width: 350px;
  height: 450px;
  background-color: white;
  border: 10px solid #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 222;
  position: absolute;
  left: 10%;
  top: 10%;

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

const Grade = styled.div`
  width: 305px;
  height: 60px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 5px;
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
const Shadow = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 22;
`;
export default GradeList;
