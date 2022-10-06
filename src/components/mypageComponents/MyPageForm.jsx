import React, { useEffect, useState, useCallback, Fragment } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

//통신
import { __getMyPage, __getRepresentative } from "../../redux/async/upload";
import { __getMyPageUser } from "../../redux/async/login";

//컴포넌트
import EachMyCloset from "./EachMyCloset";
import GradeList from "./GradeList";
import ScrollX from "../../elem/ScrollX";

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
import question from "../../image/question.png";
import empty from "../../image/옷걸이.png";
import hanger from "../../image/three-hangers-on-clothes-rail_1262-6966.webp";
import MoodPoint from "./MoodPoint";
import closet from "../../image/empty-walkin-closet-modern-wardrobe-room-interior_107791-6726.jpeg";

const MyPageForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  //유저의 닉네임, 프로필이미지, 등급, 무드 포인트 불러오기
  const users = useSelector((state) => state.login.myPageUser); //유저 정보 가져오기
  const profileIcon = useSelector((state) => state.login.userIcon.grade); //유저 아이콘 변경 가져오기
  const userGrade = useSelector((state) => state.login.myPageUser.grade); //유저 등급 가져오기
  const img = users?.imgUrl?.split(".com/")[1];
  const grade = userGrade?.split(" ")[1];
  const myClosetList = useSelector((state) => state.upload.myList); //내 게시글 불러오기
  const rep = useSelector((state) => state.upload.representative); //대표 게시물 불러오기
  const changeUser = useSelector((state) => state.login.changeStatus); //유저의 프로필 수정 여부 가져오기
  const [click, setClick] = useState(false); // 클릭과 드래그 구분
  const [gradeList, setGradeList] = useState(false); //등급표 모달
  const [moodPoint, setMoodPoint] = useState(false); //무드 포인트 설명 모달
  const [gradeImg, setGradeImg] = useState(cat1); //등급 아이콘
  const [gradeName, setGradeName] = useState("티셔츠");
  const [hightLightText, setHightLightText] = useState("");
  const [scrollRef, isDrag, onDragStart, onDragEnd, onThrottleDragMove] =
    ScrollX(); //가로스크롤
  //토큰에서 userId 가져오기
  const token = localStorage.getItem("token");
  const payload = jwt_decode(token);

  useEffect(() => {
    dispatch(__getMyPageUser(userId));
    dispatch(__getMyPage(userId));
    dispatch(__getRepresentative(userId));
    if (userGrade !== undefined) {
      gradeIcon(userGrade);
      gradeText(grade);
    }
  }, [profileIcon, gradeList, changeUser, grade, userGrade, userId]);

  //드래그와 클릭 구별하기
  useEffect(() => {
    let drag = false;
    document.addEventListener("mousedown", () => (drag = false)); //클릭
    document.addEventListener("mousemove", () => (drag = true)); //드래그
    document.addEventListener("mouseup", () => {
      drag ? setClick(false) : setClick(true);
    });
  }, []);

  //성별과 등급별로 아이콘 이미지 보여주기
  const gradeIcon = useCallback(
    async (userGrade) => {
      const grade = await userGrade?.split(" ")[1];
      const icon = userGrade?.split(" ")[0];
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
    },
    [profileIcon, users, gradeList]
  );

  //등급별로 안내 문구
  const gradeText = (grade) => {
    const gradName = [0, "티셔츠", "와이셔츠", "넥타이", "조끼", "자켓"];
    const hightLightText = [0, 0, "2단계", "3단계", "4단계", "5단계"];
    setGradeName(gradName[grade]);
    if (grade > 1) {
      setHightLightText(hightLightText[grade]);
    }
  };

  const text = `${users?.nickname}님의 \n옷장`;

  return (
    <Fragment>
      <Wrap>
        <ImgBox>
          {img === "null" ? (
            <Img src={`${profileIcon}`} alt="profile_icon" />
          ) : (
            <Img src={`${users?.imgUrl}`} alt="profile_icon" />
          )}
          <ProfileBox>
            <GradeIcon src={`${gradeImg}`} alt="grade_img" />
            <h4>{users?.nickname}</h4>
          </ProfileBox>
        </ImgBox>
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
                  src={`${question}`}
                  alt="question"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setMoodPoint(true)}
                />
              ) : null}
            </MoodBody>
            {moodPoint ? <MoodPoint setMoodPoint={setMoodPoint} /> : null}
            <MoodHeader>
              <p className="name">Catch Grade</p>
            </MoodHeader>
            <MoodBody>
              <GradeImg src={`${gradeImg}`} alt="grade_img" />
              <GradeText>
                <GradeQuestion>
                  <h6>{gradeName}</h6>
                  {payload.userId == userId ? (
                    <Question
                      src={`${question}`}
                      alt="question"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => setGradeList(true)}
                    />
                  ) : null}
                  {gradeList ? <GradeList setGradeList={setGradeList} /> : null}
                </GradeQuestion>
                <Progress>
                  <HighLight width={(grade / 5) * 100 - 3 + "%"}>
                    <h6>{hightLightText}</h6>
                  </HighLight>
                </Progress>
              </GradeText>
            </MoodBody>
          </MoodBox>
          {rep?.imgUrl === undefined ? (
            <PostImg
              src={`${hanger}`}
              alt="post_img"
              style={{ cursor: "pointer" }}
              onClick={() => {
                Swal.fire(
                  "대표게시물을 찾을 수 없습니다",
                  "캐처님의 게시물 상세페이지에서 대표 게시물을 등록해주세요",
                  "question"
                );
              }}
            />
          ) : (
            <PostImg
              src={`${rep?.imgUrl}`}
              alt="rep_img"
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/item_detail/${users.repPostId}/${users.userId}`)
              }
            />
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
                <EmptyClosetBox>
                  <EmptyCloset
                    src={`${empty}`}
                    alt="empty_closet"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/upload")}
                  />
                  <EmptyClosetTextBox>
                    <p>{users.nickname}님의</p>
                    <p>옷장이 비어있습니다</p>
                  </EmptyClosetTextBox>
                </EmptyClosetBox>
                <EmptyClosetBox>
                  <EmptyCloset
                    src={`${empty}`}
                    alt="empty_closet"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/upload")}
                  />
                  <EmptyClosetTextBox>
                    <p>옷장도 꾸미고</p>
                    <p>무드도 캐치하세요</p>
                  </EmptyClosetTextBox>
                </EmptyClosetBox>
              </>
            ) : (
              <>
                {myClosetList?.length < 5 && (
                  <>
                    {myClosetList.map((item) => (
                      <EachMyCloset item={item} click={click} />
                    ))}
                    <OpenClosetBox>
                      <GoCloset
                        src={`${closet}`}
                        alt="go_closet"
                        onClick={() => navigate(`/closet/${userId}`)}
                      />
                      <OpenCloset>
                        <OpenText>{text}</OpenText>
                      </OpenCloset>
                    </OpenClosetBox>
                  </>
                )}
                {myClosetList?.length >= 5 && (
                  <>
                    {myClosetList.slice(0, 4).map((item) => (
                      <EachMyCloset
                        key={item.postId}
                        item={item}
                        click={click}
                      />
                    ))}
                    <OpenClosetBox>
                      <GoCloset
                        src={`${closet}`}
                        alt="go_closet"
                        onClick={() => navigate(`/closet/${userId}`)}
                      />
                      <OpenCloset>
                        <OpenText>{text}</OpenText>
                      </OpenCloset>
                    </OpenClosetBox>
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
const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Img = styled.img`
  margin: 10px auto 10px auto;
  border-radius: 50%;
  width: 107px;
  height: 107px;
`;

const ProfileBox = styled.div`
  display: flex;
  margin: 0 auto 10px auto;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  h4 {
    font-weight: 800;
    font-size: 16px;
    text-align: center;
    color: #2d273f;
  }
`;

const GradeIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const MyPageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const MoodBox = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MoodHeader = styled.div`
  margin: 10px auto 5px;
  border-radius: 17px;
  width: 150px;
  height: 30px;
  background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  & .name {
    margin-top: 5px;
    font-family: "Unna";
    font-style: normal;
    font-weight: 100;
    font-size: 18px;
    color: white;
  }
`;
const MyClosetText = styled.p`
  position: relative;
  top: 4px;
  font-family: "Unna";
  font-style: normal;
  font-weight: 100;
  font-size: 18px;
  color: white;
`;

const MoodBody = styled.div`
  display: flex;
  border: 3px solid #e6e5ea;
  border-radius: 10px;
  width: 150px;
  height: 80px;
  background-color: white;
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

const GradeImg = styled.img`
  width: 60px;
  height: 60px;
`;
const GradeText = styled.div`
  display: flex;
  margin-top: 25px;
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
    font-weight: 700;
  }
`;

const Question = styled.img`
  margin-left: 7px;
  margin-top: 3px;
  margin-bottom: -5px;
  width: 15px;
  height: 15px;
  z-index: 10;
`;
const MoodQuestion = styled.img`
  position: relative;
  top: 7px;
  left: 5px;
  width: 15px;
  height: 15px;
  opacity: 70%;
`;

const Progress = styled.div`
  position: relative;
  top: -23px;
  display: flex;
  margin-top: 30px;
  border-radius: 10px;
  width: 73px;
  height: 15px;
  background-color: #7b758b;
  align-items: left;
  justify-content: baseline;
  flex-direction: column;
`;
const HighLight = styled.div`
  position: relative;
  top: 0.5px;
  display: flex;
  margin: 1px;
  border-radius: 10px;
  width: ${(props) => props.width};
  height: 12px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  h6 {
    font-size: 8px;
    font-style: normal;
    font-weight: 700;
  }
`;
const PostImg = styled.img`
  margin-left: 20px;
  width: 180px;
  height: 260px;
  border-radius: 12px;
`;
const ClosetList = styled.div`
  display: flex;
  margin: 0px auto 0;
  height: 230px;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  p {
    display: block;
    margin-top: 40px;
    font-family: "Unna";
    font-weight: 700;
    font-size: 15px;
    text-align: center;
    color: #7b758b;
  }
`;

const GoCloset = styled.img`
  margin: 5px;
  border-radius: 10px;
  width: 160px;
  height: 200px;
  flex-shrink: 0;
  text-align: left;
  cursor: pointer;
`;
const OpenClosetBox = styled.div`
  position: relative;
  width: auto;
`;

const OpenCloset = styled.div`
  position: absolute;
  top: 45%;
  left: 15%;
  cursor: pointer;
`;
const OpenText = styled.h5`
  display: block;
  font-weight: 700;
  font-size: 17px;
  text-align: center;
  color: #534b67;
  white-space: pre-wrap;
  cursor: pointer;
`;
const EmptyClosetBox = styled.div`
  position: relative;
  width: auto;
`;
const EmptyClosetTextBox = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
`;

const EmptyCloset = styled.img`
  margin: 10px;
  border-radius: 10px;
  width: 160px;
  height: 190px;
  vertical-align: middle;
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
