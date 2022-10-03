import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { __getMyPage, __getRepresentative } from "../../redux/async/upload";
import GradeList from "./GradeList";
import { Fragment } from "react";
import { __getMyPageUser } from "../../redux/async/login";
import jwt_decode from "jwt-decode";
import ScrollX from "../../elem/ScrollX";
import Swal from "sweetalert2";

//이미지 불러오기
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
import hanger from "../../image/three-hangers-on-clothes-rail_1262-6966.webp";
import MoodPoint from "./MoodPoint";
import closet from "../../image/empty-walkin-closet-modern-wardrobe-room-interior_107791-6726.jpeg";
import EachMyCloset from "./EachMyCloset";

const MyPageForm = () => {
  const [scrollRef, isDrag, onDragStart, onDragEnd, onThrottleDragMove] =
    ScrollX();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [click, setClick] = useState(false);
  const [gradeList, setGradeList] = useState(false);
  const [moodPoint, setMoodPoint] = useState(false);
  const [profileImg, setProfileImg] = useState(
    "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png"
  );
  const [gradeImg, setGradeImg] = useState(cat1);

  //유저의 닉네임, 프로필이미지, 등급, 무드 포인트 불러오기
  const users = useSelector((state) => state.login.myPageUser);
  const userGrade = useSelector((state) => state.login.myPageUser.grade);

  const profileIcon = useSelector((state) => state.login.userIcon.grade);
  const img = users?.imgUrl?.split(".com/")[1];
  const grade = userGrade?.split(" ")[1];

  //내 게시글 불러오기
  const myClosetList = useSelector((state) => state.upload.myList);

  //대표 게시물 불러오기
  const rep = useSelector((state) => state.upload.representative);

  //유저의 프로필 수정  여부 가져오기
  const changeUser = useSelector((state) => state.login.changeStatus);

  //토큰에서 userId 가져오기
  const token = localStorage.getItem("token");
  const payload = jwt_decode(token);

  //드래그와 클릭 구별하기
  useEffect(() => {
    let drag = false;
    document.addEventListener("mousedown", () => (drag = false));
    document.addEventListener("mousemove", () => (drag = true));
    document.addEventListener("mouseup", () => {
      drag ? setClick(false) : setClick(true);
    });
  }, []);

  useEffect(() => {
    dispatch(__getMyPageUser(userId));
    dispatch(__getMyPage(userId));
    dispatch(__getRepresentative(userId));
    if (userGrade !== undefined) {
      gradeIcon(userGrade);
    }
  }, [profileIcon, gradeList, changeUser, grade]);

  //성별과 등급별로 아이콘 이미지 보여주기
  const gradeIcon = useCallback(
    async (userGrade) => {
      const grade = await userGrade?.split(" ")[1];
      const icon = userGrade?.split(" ")[0];
      const manIcon = [0, man1, man2, man3, man4, man5];
      const womanIcon = [0, woman1, woman2, woman3, woman4, woman5];
      const catIcon = [0, cat1, cat2, cat3, cat4, cat5];

      if (icon === "man") {
        setGradeImg(manIcon[parseInt(grade)]);
      }
      if (icon === "woman") {
        setGradeImg(womanIcon[parseInt(grade)]);
      }
      if (icon === "moody") {
        setGradeImg(catIcon[parseInt(grade)]);
      }
    },
    [users, profileIcon, gradeList]
  );

  const text = `${users?.nickname}님의 \n옷장`;

  return (
    <Fragment>
      <Wrap>
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
              <h1
                style={{ cursor: "pointer" }}
                onClick={() => setMoodPoint(true)}
              >
                {users?.moodPoint}
              </h1>
              {payload.userId == userId ? (
                <MoodQuestion
                  style={{ cursor: "pointer" }}
                  onClick={() => setMoodPoint(true)}
                ></MoodQuestion>
              ) : null}
            </MoodBody>
            {moodPoint ? <MoodPoint setMoodPoint={setMoodPoint} /> : null}
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
                    <Question
                      style={{ cursor: "pointer" }}
                      onClick={() => setGradeList(true)}
                    ></Question>
                  ) : null}
                  {gradeList ? <GradeList setGradeList={setGradeList} /> : null}
                </GradeQuestion>
                <Progress>
                  <HighLight width={(grade / 5) * 100 - 3 + "%"}>
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
            <PostImg
              style={{ cursor: "pointer" }}
              onClick={() => {
                Swal.fire(
                  "대표게시물을 찾을 수 없습니다",
                  "캐처님의 게시물 상세페이지에서 대표 게시물을 등록해주세요",
                  "question"
                );
              }}
              url={`${hanger}`}
            ></PostImg>
          ) : (
            <PostImg
              url={rep?.imgUrl}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/item_detail/${users.repPostId}/${users.userId}`)
              }
            ></PostImg>
          )}
        </MyPageBox>
        <MoodHeader>
          <MyClosetText>My Closet</MyClosetText>
        </MoodHeader>
        <Wrapper>
          <ClosetList
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={isDrag ? onThrottleDragMove : null}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            {myClosetList?.length === 0 ? (
              <>
                <EmptyCloset
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/upload")}
                >
                  <p>{users.nickname}님의</p>
                  <p>옷장이 비어있습니다</p>
                </EmptyCloset>
                <EmptyCloset
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/upload")}
                >
                  <p>옷장도 꾸미고</p>
                  <p>무드도 캐치하세요</p>
                </EmptyCloset>
              </>
            ) : (
              <>
                {myClosetList?.length === 1 && (
                  <>
                    {myClosetList.map((item) => (
                      <EachMyCloset item={item} click={click} />
                    ))}
                    <GoCloset
                      url={`${closet}`}
                      onClick={() => navigate(`/closet/${userId}`)}
                    >
                      <OpenCloset>
                        <OpenText>{text}</OpenText>
                      </OpenCloset>
                    </GoCloset>
                  </>
                )}
                {myClosetList?.length === 2 && (
                  <>
                    {myClosetList.map((item) => (
                      <EachMyCloset item={item} click={click} />
                    ))}
                    <GoCloset
                      url={`${closet}`}
                      onClick={() => navigate(`/closet/${userId}`)}
                    >
                      <OpenCloset>
                        <OpenText>{text}</OpenText>
                      </OpenCloset>
                    </GoCloset>
                  </>
                )}
                {myClosetList?.length === 3 && (
                  <>
                    {myClosetList.map((item) => (
                      <EachMyCloset item={item} click={click} />
                    ))}
                    <GoCloset
                      url={`${closet}`}
                      onClick={() => navigate(`/closet/${userId}`)}
                    >
                      <OpenCloset>
                        <OpenText>{text}</OpenText>
                      </OpenCloset>
                    </GoCloset>
                  </>
                )}
                {myClosetList?.length === 4 && (
                  <>
                    {myClosetList.map((item) => (
                      <EachMyCloset item={item} click={click} />
                    ))}
                    <GoCloset
                      url={`${closet}`}
                      onClick={() => navigate(`/closet/${userId}`)}
                    >
                      <OpenCloset>
                        <OpenText>{text}</OpenText>
                      </OpenCloset>
                    </GoCloset>
                  </>
                )}
                {myClosetList?.length >= 5 && (
                  <>
                    {myClosetList.slice(0, 4).map((item) => (
                      <EachMyCloset item={item} click={click} />
                    ))}
                    <GoCloset
                      url={`${closet}`}
                      onClick={() => navigate(`/closet/${userId}`)}
                    >
                      <OpenCloset>
                        <OpenText>{text}</OpenText>
                      </OpenCloset>
                    </GoCloset>
                  </>
                )}
              </>
            )}
          </ClosetList>
          <Margin></Margin>
        </Wrapper>
      </Wrap>
    </Fragment>
  );
};

const Wrap = styled.div`
  max-width: 428px;
  width: 100%;
`;

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
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 0px;
  h4 {
    font-family: "Noto Sans KR", sans-serif;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    text-align: center;
    color: #2d273f;
  }
`;

const GradeIcon = styled.div`
  width: 40px;
  height: 40px;
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
  margin: 10px auto 5px;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 17px;
  & .name {
    font-family: "Unna";
    font-style: normal;
    font-weight: lighter;
    font-size: 18px;
    color: white;
    margin-top: 5px;
  }
`;
const MyClosetText = styled.p`
  font-family: "Unna";
  font-style: normal;
  font-weight: lighter;
  font-size: 18px;
  color: white;
  position: relative;
  top: 4px;
`;

const MoodBody = styled.div`
  width: 150px;
  height: 80px;
  background-color: white;
  border: 3px solid #e6e5ea;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  h1 {
    font-family: "Unna";
    font-style: normal;
    font-weight: 700;
    font-size: 45px;
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
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const GradeQuestion = styled.div`
  display: flex;
  align-items: left;
  justify-content: baseline;
  flex-direction: row;
  h6 {
    font-family: "Noto Sans KR", sans-serif;
    font-style: normal;
    font-weight: 700;
  }
`;

const Question = styled.div`
  width: 15px;
  height: 15px;
  margin-left: 7px;
  margin-top: 3px;
  margin-bottom: -5px;
  background-position: center;
  background-size: cover;
  background-image: url(${question});
  z-index: 10;
`;
const MoodQuestion = styled.div`
  width: 15px;
  height: 15px;
  position: relative;
  top: 7px;
  left: 5px;
  opacity: 70%;
  background-position: center;
  background-size: cover;
  background-image: url(${question});
`;

const Progress = styled.div`
  width: 73px;
  height: 15px;
  border-radius: 10px;
  background-color: #7b758b;
  margin-top: 30px;
  display: flex;
  align-items: left;
  justify-content: baseline;
  flex-direction: column;
  position: relative;
  top: -23px;
`;
const HighLight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  height: 12px;
  width: ${(props) => props.width};
  margin: 1px;
  position: relative;
  top: 0.5px;
  h6 {
    font-size: 8px;
    font-style: normal;
    font-weight: 700;
  }
`;
const PostImg = styled.div`
  width: 180px;
  height: 260px;
  border-radius: 12px;
  margin-left: 20px;
  background-position: center;
  background-size: 180px 260px;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.url});
`;
const ClosetList = styled.div`
  height: 230px;
  background-color: #fff;
  border-radius: 10px;
  margin: 0px auto 0;
  align-items: center;
  display: flex;
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
    font-size: 15px;
    text-align: center;
    color: #7b758b;
  }
`;

const GoCloset = styled.div`
  cursor: pointer;
  flex-shrink: 0;
  width: 160px;
  height: 200px;
  margin: 5px;
  text-align: left;
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
    color: #8e5c92;
  }
`;
const OpenCloset = styled.div`
  margin-top: 50px;
  cursor: pointer;
`;

const EmptyCloset = styled.div`
  width: 160px;
  height: 190px;
  margin: 10px;
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  background-image: url(${empty});
`;
const OpenText = styled.h5`
  margin-top: 80px;
  display: block;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  text-align: center;
  color: #534b67;
  position: relative;
  top: 10px;
  white-space: pre-wrap;
  cursor: pointer;
`;
const Margin = styled.div`
  width: 32px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export default React.memo(MyPageForm);
