import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { __getMyPage, __getRepPost } from "../../redux/modules/uploadSlice";
import GradeList from "./GradeList";
import { Fragment } from "react";
import { __getUser } from "../../redux/modules/loginSlice";
import { getCookie } from "../../shared/cookie";
import jwt_decode from "jwt-decode";

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
import question from "../../image/question.png";
import empty from "../../image/옷걸이.png";
import hanger from "../../image/hanger.png";
import MoodPoint from "./MoodPoint";

const MyPageForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log(userId);
  const [gradeList, setGradeList] = useState(false);
  const [moodPoint, setMoodPoint] = useState(false);
  const [profileImg, setProfileImg] = useState(
    "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png"
  );
  const [gradeImg, setGradeImg] = useState(cat1);

  //유저의 닉네임, 프로필이미지, 등급, 무드 포인트 불러오기
  const users = useSelector((state) => state.login.userStatus);
  const img = users?.imgUrl?.split(".com/")[1];

  console.log(users);

  //내 게시글 불러오기
  const myClosetList = useSelector((state) => state.upload.myList);

  //대표 게시물 불러오기
  const rep = useSelector((state) => state.upload.representative);

  const grade = users.grade?.split(" ")[1];

  //토큰에서 userId 가져오기
  const token = getCookie("token");
  const payload = jwt_decode(token);

  useEffect(() => {
    dispatch(__getUser(userId));
    dispatch(__getMyPage(userId));
    dispatch(__getRepPost(userId));
    gradeIcon(grade);
  }, [gradeList, gradeImg, grade, users.imgUrl]);

  //성별과 등급별로 아이콘 이미지 보여주기
  const gradeIcon = async (grade) => {
    const icon = await users?.grade?.split(" ")[0];

    const manIcon = [0, man1, man2, man3, man4, man5];
    const womanIcon = [0, woman1, woman2, woman3, woman4, woman5];
    const catIcon = [0, cat1, cat2, cat3, cat4, cat5];

    if (icon === "man") {
      setGradeImg(manIcon[grade]);
    }
    if (icon === "woman") {
      setGradeImg(womanIcon[grade]);
    }
    if (icon === "moody") {
      setGradeImg(catIcon[grade]);
    }
  };

  return (
    <Fragment>
      {img === "null" ? (
        <Img url={profileImg}></Img>
      ) : (
        <Img url={users?.imgUrl}></Img>
      )}
      <ProfileBox>
        <GradeIcon url={gradeImg}></GradeIcon>
        <h4>{users?.nickname}</h4>
      </ProfileBox>
      <MyPageBox>
        <MoodBox>
          <MoodHeader>
            <p className="name">Mood Point</p>
          </MoodHeader>
          <MoodBody>
            <h1>{users?.moodPoint}</h1>
            {payload.userId == userId ? (
              <Question onClick={() => setMoodPoint(true)}></Question>
            ) : null}
            {moodPoint ? <MoodPoint setMoodPoint={setMoodPoint} /> : null}
          </MoodBody>
          <MoodHeader>
            <p className="name">Catch Grade</p>
          </MoodHeader>
          <MoodBody>
            <GradeImg url={gradeImg}></GradeImg>
            <GradeText>
              <GradeQuestion>
                {grade === "1" && <h6>티셔츠</h6>}
                {grade === "2" && <h6>와이셔츠</h6>}
                {grade === "3" && <h6>넥타이</h6>}
                {grade === "4" && <h6>조끼</h6>}
                {grade === "5" && <h6>자켓</h6>}
                {payload.userId == userId ? (
                  <Question onClick={() => setGradeList(true)}></Question>
                ) : null}
                {gradeList ? <GradeList setGradeList={setGradeList} /> : null}
              </GradeQuestion>
              <Progress>
                <HighLight width={(grade / 5) * 100 + "%"}>
                  {grade === "2" && <h6>2단계</h6>}
                  {grade === "3" && <h6>3단계</h6>}
                  {grade === "4" && <h6>4단계</h6>}
                  {grade === "5" && <h6>5단계</h6>}
                </HighLight>
              </Progress>
            </GradeText>
          </MoodBody>
        </MoodBox>
        {rep?.imgUrl === undefined ? (
          <PostImg url={`${hanger}`}></PostImg>
        ) : (
          <PostImg url={rep?.imgUrl}></PostImg>
        )}
      </MyPageBox>
      {payload.userId == userId ? (
        <ProfileEditBtn onClick={() => navigate("/edit_profile")}>
          내 프로필 수정하기
        </ProfileEditBtn>
      ) : null}
      <MoodHeader>
        <p className="name">My Closet</p>
      </MoodHeader>
      <ClosetList>
        {myClosetList?.length === 0 ? (
          <>
            <EmptyCloset onClick={() => navigate("/upload")}>
              <p>{users.nickname}님의</p>
              <p>옷장이 비어있습니다</p>
            </EmptyCloset>
            <EmptyCloset onClick={() => navigate("/upload")}>
              <p>옷장도 꾸미고</p>
              <p>무드도 캐치하세요</p>
            </EmptyCloset>
          </>
        ) : (
          <>
            <Closet url={myClosetList[0].imgUrl}></Closet>
            <Closet url={myClosetList[1].imgUrl}></Closet>
            <Closet url={myClosetList[2].imgUrl}></Closet>
            <Closet url={myClosetList[3].imgUrl}></Closet>
            <Closet url={myClosetList[4].imgUrl}></Closet>
            <Closet
              url="https://m.spadegagu.com/web/product/extra/big/20200214/f614adca4a7b75279a0142f3657bfafe.jpg"
              onClick={() => navigate(`/closet/${userId}`)}
            >
              <OpenCloset>
                <h4>{users?.nickname}님의</h4>
                <h4>옷장 열어보기</h4>
              </OpenCloset>
            </Closet>
          </>
        )}
      </ClosetList>
    </Fragment>
  );
};

const Img = styled.div`
  width: 107px;
  height: 107px;
  border-radius: 50%;
  margin: 10px auto;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: -20px;

  h4 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    text-align: center;
    color: #7b758b;
  }
`;

const GradeIcon = styled.div`
  width: 50px;
  height: 50px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;

const MyPageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const MoodBox = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MoodHeader = styled.div`
  width: 150px;
  height: 30px;
  background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
  text-align: center;
  margin: 10px auto;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 17px;
  .name {
    font-family: "Unna";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    margin-top: 6px;
    color: white;
  }
`;

const MoodBody = styled.div`
  width: 150px;
  height: 80px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  h1 {
    font-family: "Unna";
    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    text-align: center;
    color: #7b758b;
  }
`;

const GradeImg = styled.div`
  width: 60px;
  height: 60px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
const GradeText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const GradeQuestion = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const Question = styled.div`
  width: 10px;
  height: 10px;
  margin-left: 7px;
  background-position: center;
  background-size: cover;
  background-image: url(${question});
`;

const Progress = styled.div`
  width: 72px;
  height: 15px;
  border-radius: 10px;
  background-color: #7b758b;
  margin-top: -10px;
  display: flex;
  align-items: left;
  justify-content: baseline;
  flex-direction: column;
`;
const HighLight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  height: 11px;
  width: ${(props) => props.width};
  margin: 1px;
`;
const PostImg = styled.div`
  width: 180px;
  height: 260px;
  border-radius: 10px;
  background-position: center;
  background-size: 160px 260px;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.url});
`;
const ClosetList = styled.div`
  width: 400px;
  height: 230px;
  background-color: #fff;
  border-radius: 10px;
  margin-left: 40px;
  margin-top: 20px;
  align-items: center;
  display: flexbox;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  p {
    margin-top: 40px;
    display: block;
    font-family: "Unna";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    color: #7b758b;
  }
`;
const Closet = styled.div`
  width: 160px;
  height: 190px;
  margin: 10px;
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});

  h4 {
    display: block;
    font-family: "Unna";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    color: #6b6187;
  }
`;
const OpenCloset = styled.div`
  margin-top: 50px;
`;

const EmptyCloset = styled.div`
  width: 180px;
  height: 190px;
  margin: 10px;
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  background-image: url(${empty});

  h4 {
    margin-top: 80px;
    display: block;
    font-family: "Unna";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    color: #534b67;
  }
`;

const ProfileEditBtn = styled.button`
  width: 135px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0);
  color: #7b758b;
  font-size: 16px;
  border: 0px;
  margin-left: 150px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  color: #7b758b;
  text-align: center;
`;

export default MyPageForm;
