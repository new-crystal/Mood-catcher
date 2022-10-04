import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
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
import { __getMyPageUser, __patchUser } from "../../redux/async/login";

const GradeList = ({ setGradeList }) => {
  const dispatch = useDispatch();
  const [moody, setMoody] = useState(false);
  const [gender, setGender] = useState("moody");
  const { userId } = useParams();
  const user = useSelector((state) => state.login.myPageUser);
  const grade = user?.grade?.split(" ")[0];

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

  //유저 정보 가져오기
  useEffect(() => {
    dispatch(__getMyPageUser(userId));
    moodyStatus(grade);
  }, [grade]);

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
            <GradeImg style={{ backgroundImage: `url(${man1})` }}>
              <img
                src={`${man1}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          {moody === false && gender === "woman" && (
            <GradeImg style={{ backgroundImage: `url(${woman1})` }}>
              <img
                src={`${woman1}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          {moody === true && (
            <GradeImg style={{ backgroundImage: `url(${cat1})` }}>
              <img
                src={`${cat1}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          <TextBox>
            <h4>티셔츠</h4>
          </TextBox>
        </Grade>
        <Grade>
          {moody === false && gender === "man" && (
            <GradeImg style={{ backgroundImage: `url(${man2})` }}>
              <img
                src={`${man2}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          {moody === false && gender === "woman" && (
            <GradeImg style={{ backgroundImage: `url(${woman2})` }}>
              <img
                src={`${woman2}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          {moody === true && (
            <GradeImg style={{ backgroundImage: `url(${cat2})` }}>
              <img
                src={`${cat2}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          <TextBox>
            <h4>와이셔츠</h4>
            <h6>(1000 무드 이상) </h6>
          </TextBox>
        </Grade>
        <Grade>
          {moody === false && gender === "man" && (
            <GradeImg style={{ backgroundImage: `url(${man3})` }}>
              <img
                src={`${man3}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          {moody === false && gender === "woman" && (
            <GradeImg style={{ backgroundImage: `url(${woman3})` }}>
              <img
                src={`${woman3}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          {moody === true && (
            <GradeImg style={{ backgroundImage: `url(${cat3})` }}>
              <img
                src={`${cat3}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          <TextBox>
            <h4>넥타이</h4>
            <h6>(3000 무드 이상) </h6>
          </TextBox>
        </Grade>
        <Grade>
          {moody === false && gender === "man" && (
            <GradeImg style={{ backgroundImage: `url(${man4})` }}>
              <img
                src={`${man4}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          {moody === false && gender === "woman" && (
            <GradeImg style={{ backgroundImage: `url(${woman4})` }}>
              <img
                src={`${woman4}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          {moody === true && (
            <GradeImg style={{ backgroundImage: `url(${cat4})` }}>
              <img
                src={`${cat4}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          <TextBox>
            <h4>조끼</h4>
            <h6>(6000 무드 이상)</h6>
          </TextBox>
        </Grade>
        <Grade>
          {moody === false && gender === "man" && (
            <GradeImg style={{ backgroundImage: `url(${man5})` }}>
              <img
                src={`${man5}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          {moody === false && gender === "woman" && (
            <GradeImg style={{ backgroundImage: `url(${woman5})` }}>
              <img
                src={`${woman5}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
          {moody === true && (
            <GradeImg style={{ backgroundImage: `url(${cat5})` }}>
              <img
                src={`${cat5}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </GradeImg>
          )}
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
  position: fixed;
  left: 50%;
  top: 20%;
  transform: translate(-50%, 0);

  h3 {
    margin: 0px;
    font-weight: 900;
  }
`;
const TitleBox = styled.div`
  width: 270px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-direction: row;
`;
const MudiBtn = styled.button`
  width: 170px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 700;
  font-size: 14px;
  color: #3f3c47;
  border: 0px;
  margin-left: 170px;
`;
const ConfirmBtn = styled.button`
  width: 40px;
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
  justify-content: baseline;
  flex-direction: row;
  margin: 5px;
  border-radius: 10px;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -20px;

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
const GradeImg = styled.div`
  width: 45px;
  height: 45px;
  background-position: center;
  background-size: cover;
  /* background-image: url(${(props) => props.url}); */
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
export default GradeList;
