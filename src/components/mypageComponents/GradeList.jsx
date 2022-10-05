import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//통신
import { __getMyPageUser, __patchUser } from "../../redux/async/login";

//이미지
import man1 from "../../image/1man.png";
import man2 from "../../image/2man.png";
import man3 from "../../image/3man.png";
import man4 from "../../image/4man.png";
import man5 from "../../image/5man.png";
import cat1 from "../../image/냥1.png";
import cat2 from "../../image/냥2.png";
import cat3 from "../../image/냥3.png";
import cat4 from "../../image/냥4.png";
import cat5 from "../../image/냥5.png";
import woman1 from "../../image/girl1.png";
import woman2 from "../../image/girl2.png";
import woman3 from "../../image/girl3.png";
import woman4 from "../../image/girl4.png";
import woman5 from "../../image/girl5.png";

const GradeList = ({ setGradeList }) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.login.myPageUser);
  const [moody, setMoody] = useState(false);
  const [gender, setGender] = useState("moody");
  const grade = user?.grade?.split(" ")[0];

  console.log(grade);

  //유저 정보 가져오기
  useEffect(() => {
    dispatch(__getMyPageUser(userId));
    moodyStatus(grade);
  }, [grade]);

  //유저의 성별 파악하기
  const moodyStatus = (grade) => {
    if (grade === "moody") {
      setMoody(true);
      setGender(grade);
    }
    if (grade === "man") {
      setMoody(false);
      setGender(grade);
    }
    if (grade === "woman") {
      setMoody(false);
      setGender(grade);
    }
  };

  //유저의 프로필 아이콘 변경하기
  const onClickMoodyBtn = (e) => {
    e.stopPropagation();
    setMoody(!moody);
    if (grade == "man") {
      dispatch(__patchUser({ profileIcon: "moody" }));
    }
    if (grade == "woman") {
      dispatch(__patchUser({ profileIcon: "moody" }));
    }
    if (grade == "moody" && user.gender == "남자") {
      dispatch(__patchUser({ profileIcon: "man" }));
    }
    if (grade == "moody" && user.gender == "여자") {
      dispatch(__patchUser({ profileIcon: "woman" }));
    }
  };
  return (
    <>
      <Shadow
        onClick={(e) => {
          e.stopPropagation();
          setGradeList(false);
        }}
      >
        {" "}
      </Shadow>
      <ListBox>
        <TitleBox>
          <h3>mood grade</h3>
          <ConfirmBtn
            style={{ cursor: "pointer" }}
            type="button"
            onClick={() => setGradeList(false)}
          >
            ✖️
          </ConfirmBtn>
        </TitleBox>
        <Grade>
          {moody === false && gender === "man" && (
            <GradeImg src={`${man1}`} alt="grade_img" />
          )}
          {moody === false && gender === "woman" && (
            <GradeImg src={`${woman1}`} alt="grade_img" />
          )}
          {moody === true && <GradeImg src={`${cat1}`} alt="grade_img" />}
          <TextBox>
            <h4>티셔츠</h4>
          </TextBox>
        </Grade>
        <Grade>
          {moody === false && gender === "man" && (
            <GradeImg src={`${man2}`} alt="grade_img" />
          )}
          {moody === false && gender === "woman" && (
            <GradeImg src={`${woman2}`} alt="grade_img" />
          )}
          {moody === true && <GradeImg src={`${cat2}`} alt="grade_img" />}
          <TextBox>
            <h4>와이셔츠</h4>
            <h6>(1000 무드 이상) </h6>
          </TextBox>
        </Grade>
        <Grade>
          {moody === false && gender === "man" && (
            <GradeImg src={`${man3}`} alt="grade_img" />
          )}
          {moody === false && gender === "woman" && (
            <GradeImg src={`${woman3}`} alt="grade_img" />
          )}
          {moody === true && <GradeImg src={`${cat3}`} alt="grade_img" />}
          <TextBox>
            <h4>넥타이</h4>
            <h6>(3000 무드 이상) </h6>
          </TextBox>
        </Grade>
        <Grade>
          {moody === false && gender === "man" && (
            <GradeImg src={`${man4}`} alt="grade_img" />
          )}
          {moody === false && gender === "woman" && (
            <GradeImg src={`${woman4}`} alt="grade_img" />
          )}
          {moody === true && <GradeImg src={`${cat4}`} alt="grade_img" />}
          <TextBox>
            <h4>조끼</h4>
            <h6>(6000 무드 이상)</h6>
          </TextBox>
        </Grade>
        <Grade>
          {moody === false && gender === "man" && (
            <GradeImg src={`${man5}`} alt="grade_img" />
          )}
          {moody === false && gender === "woman" && (
            <GradeImg src={`${woman5}`} alt="grade_img" />
          )}
          {moody === true && <GradeImg src={`${cat5}`} alt="grade_img" />}
          <TextBox>
            <h4>자켓</h4>
            <h6>(10000 무드 이상)</h6>
          </TextBox>
        </Grade>
        <MudiBtn
          style={{ cursor: "pointer" }}
          type="button"
          onClick={(e) => onClickMoodyBtn(e)}
        >
          {moody === true ? "사람으로 바꾸기" : "무디로 바꾸기"}
        </MudiBtn>
      </ListBox>
    </>
  );
};

const ListBox = styled.div`
  position: fixed;
  left: 50%;
  top: 20%;
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
`;
const TitleBox = styled.div`
  display: flex;
  width: 270px;
  align-items: baseline;
  justify-content: space-between;
  flex-direction: row;
`;
const MudiBtn = styled.button`
  margin-left: 170px;
  border: 0px;
  width: 170px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 700;
  font-size: 14px;
  color: #3f3c47;
`;
const ConfirmBtn = styled.button`
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
  margin-left: -20px;
  flex-direction: column;

  h4 {
    margin: 0px;
    font-weight: 900;
  }
  h6 {
    margin: 0px;
    color: #848484;
    font-size: small;
  }
`;
const GradeImg = styled.img`
  margin-left: 10px;
  margin-right: 30px;
  width: 45px;
  height: 45px;
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
export default GradeList;
