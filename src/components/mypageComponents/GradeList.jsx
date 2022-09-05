import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import man5 from "../../image/5man.png";
import cat5 from "../../image/냥5.png";
import { __getUser, __patchUser } from "../../redux/modules/loginSlice";

const GradeList = ({ setGradeList }) => {
  const dispatch = useDispatch();
  const [moody, setMoody] = useState(false);
  const { userId } = useParams();
  const user = useSelector((state) => state.login.userStatus);

  //유저 정보 가져오기
  useEffect(() => {
    dispatch(__getUser(userId));
  }, []);

  //유저의 프로필 아이콘 변경하기
  const onClickMoodyBtn = () => {
    setMoody(!moody);
    if (moody === true) {
      dispatch(__patchUser({ profileIcon: "moody" }));
    } else {
      if (user.gender === "남자") {
        dispatch(__patchUser({ profileIcon: "man" }));
      } else {
        dispatch(__patchUser({ profileIcon: "woman" }));
      }
    }
  };
  return (
    <>
      <Shadow onClick={() => setGradeList(false)}></Shadow>
      <ListBox>
        <TitleBox>
          <h3>mood grade</h3>
          <MudiBtn type="button" onClick={() => onClickMoodyBtn()}>
            {moody === false ? "무디로 바꾸기" : "사람으로 바꾸기"}
          </MudiBtn>
        </TitleBox>
        <Grade>
          {moody === false ? (
            <GradeImg url={`${man5}`}></GradeImg>
          ) : (
            <GradeImg url={`${cat5}`}></GradeImg>
          )}
          <h4>티셔츠</h4>
        </Grade>
        <Grade>
          {moody === false ? (
            <GradeImg url={`${man5}`}></GradeImg>
          ) : (
            <GradeImg url={`${cat5}`}></GradeImg>
          )}
          <h4>와이셔츠</h4>
        </Grade>
        <Grade>
          {moody === false ? (
            <GradeImg url={`${man5}`}></GradeImg>
          ) : (
            <GradeImg url={`${cat5}`}></GradeImg>
          )}
          <h4>넥타이</h4>
        </Grade>
        <Grade>
          {moody === false ? (
            <GradeImg url={`${man5}`}></GradeImg>
          ) : (
            <GradeImg url={`${cat5}`}></GradeImg>
          )}
          <h4>조끼</h4>
        </Grade>
        <Grade>
          {moody === false ? (
            <GradeImg url={`${man5}`}></GradeImg>
          ) : (
            <GradeImg url={`${cat5}`}></GradeImg>
          )}
          <h4>자켓</h4>
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
  width: 280px;
  height: 50px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 5px;
  border-radius: 10px;
`;
const GradeImg = styled.div`
  width: 45px;
  height: 45px;
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
