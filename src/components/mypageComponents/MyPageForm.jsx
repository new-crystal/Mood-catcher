import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import question from "../../image/question.png";
import {
  __getMyPage,
  __getRepPost,
  __getCloset,
} from "../../redux/modules/uploadSlice";
import GradeList from "./GradeList";
import { Fragment } from "react";
import { __getUser } from "../../redux/modules/loginSlice";
import { getCookie } from "../../shared/cookie";
import jwt_decode from "jwt-decode";

const MyPageForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [gradeList, setGradeList] = useState(false);
  const [profileImg, setProfileImg] = useState(
    "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png"
  );
  const [gradeImg, setGradeImg] = useState(cat1);


  //유저의 닉네임, 프로필이미지, 등급, 무드 포인트 불러오기
  const users = useSelector((state) => state.login.userStatus);
  console.log(users);

  const grade = users.grade?.split(" ")[1];

  //토큰에서 userId 가져오기
  const token = getCookie("token");
  const payload = jwt_decode(token);

  useEffect(() => {
    dispatch(__getUser(userId));
    dispatch(__getMyPage(userId));
    dispatch(__getRepPost(userId));
    dispatch(__getCloset(userId));
    gradeIcon(grade);
  }, [grade]);

  //대표 게시물 불러오기!!
  const repList = useSelector((state) => state);

  //옷장 게시물 가져오기
  const closetList = useSelector((state) => state.upload.closetList);


  //성별과 등급별로 아이콘 이미지 보여주기
  const gradeIcon = (grade) => {
    const icon = users.grade?.split(" ")[0];
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
      {users.imgUrl ===
      "https://gwonyeong.s3.ap-northeast-2.amazonaws.com/null" ? (
        <Img url={profileImg}></Img>
      ) : (
        <Img url={users.imgUrl}></Img>
      )}
      <ProfileBox>
        <GradeIcon url={gradeImg}></GradeIcon>
        <h4>{users.nickname}</h4>
      </ProfileBox>
      <MyPageBox>
        <MoodBox>
          <MoodHeader>
            <p className="name">Mood Point</p>
          </MoodHeader>
          <MoodBody>
            <h1>{users.moodPoint}</h1>
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
                <Question onClick={() => setGradeList(true)}></Question>
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
        <PostImg url="https://img.danawa.com/prod_img/500000/946/645/img/2645946_1.jpg?shrink=330:330&_v=20160728145124"></PostImg>
      </MyPageBox>
      <MoodHeader>
        <p className="name">My Closet</p>
      </MoodHeader>
      <ClosetList>
        <Closet url="http://img4.tmon.kr/cdn4/deals/2022/01/24/7863616202/front_0af52_cxazv.jpg"></Closet>
        <Closet url="http://img4.tmon.kr/cdn4/deals/2022/01/24/7863616202/front_0af52_cxazv.jpg"></Closet>
        <Closet url="http://img4.tmon.kr/cdn4/deals/2022/01/24/7863616202/front_0af52_cxazv.jpg"></Closet>
        <Closet url="http://img4.tmon.kr/cdn4/deals/2022/01/24/7863616202/front_0af52_cxazv.jpg"></Closet>
        <Closet url="http://img4.tmon.kr/cdn4/deals/2022/01/24/7863616202/front_0af52_cxazv.jpg"></Closet>
        <Closet
          url="https://contents.lotteon.com/itemimage/LD/55/34/08/11/4_/0/LD553408114_0_5.jpg/dims/resizef/720X720"
          onClick={() => navigate(`/closet/${userId}`)}
        ></Closet>
      </ClosetList>
      {payload.userId == userId ? (
        <ProfileEditBtn onClick={() => navigate("/edit_profile")}>
          내 프로필 수정하기
        </ProfileEditBtn>
      ) : null}
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
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
const ClosetList = styled.div`
  width: 400px;
  height: 230px;
  background-color: #fff;
  border-radius: 10px;
  margin-left: 40px;
  margin-top: 20px;
  display: flexbox;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
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
`;

const ProfileEditBtn = styled.button`
  width: 135px;
  height: 20px;
  background-color: white;
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
