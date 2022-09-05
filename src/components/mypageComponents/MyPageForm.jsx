import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import cat from "../../image/냥5.png";
import question from "../../image/question.png";
import { __getMyPage, __getRepPost } from "../../redux/modules/uploadSlice";
import ClosetForm from "./ClosetForm";
import GradeList from "./GradeList";

const MyPageForm = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [gradeList, setGradeList] = useState(false);

  //mypage의 데이터 받아오기!!
  const postList = useSelector((state) => state);

  //대표 게시물 불러오기!!
  const repList = useSelector((state) => state);

  //userId 보내주기!!
  useEffect(() => {
    dispatch(__getMyPage(userId));
    dispatch(__getRepPost(userId));
  }, []);

  return (
    <Container>
      <MyPageHeader>
        <h1>My Page</h1>
      </MyPageHeader>
      <Img url="https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png"></Img>
      <ProfileBox>
        <GradeIcon></GradeIcon>
        <h4>수수</h4>
      </ProfileBox>
      <MyPageBox>
        <MoodBox>
          <MoodHeader>Mood Point</MoodHeader>
          <MoodBody>
            <h1>10</h1>
          </MoodBody>
          <MoodHeader>Catch Grade</MoodHeader>
          <MoodBody>
            <GradeImg></GradeImg>
            <GradeText>
              <GradeQuestion>
                <h6>양복</h6>
                <Question onClick={() => setGradeList(true)}></Question>
                {gradeList ? <GradeList setGradeList={setGradeList} /> : null}
              </GradeQuestion>
              <Progress>
                <HighLight></HighLight>
              </Progress>
            </GradeText>
          </MoodBody>
        </MoodBox>
        <PostImg url="https://img.danawa.com/prod_img/500000/946/645/img/2645946_1.jpg?shrink=330:330&_v=20160728145124"></PostImg>
      </MyPageBox>
      <MoodHeader>My Closet</MoodHeader>
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
      <ProfileEditBtn onClick={() => navigate("/edit_profile")}>
        내 프로필 수정하기
      </ProfileEditBtn>
    </Container>
  );
};

const Container = styled.div`
  width: 428px;
  height: 926px;
`;

const MyPageHeader = styled.div`
  width: 428px;
  height: 60px;
  background-color: #a396c9;
  color: white;
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: -20px;
`;
const GradeIcon = styled.div`
  width: 50px;
  height: 50px;
  background-position: center;
  background-size: cover;
  background-image: url(${cat});
`;

const MyPageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const MoodBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const MoodHeader = styled.div`
  width: 150px;
  height: 30px;
  color: white;
  background-color: #7b758b;
  border-radius: 15px;
  text-align: center;
  margin: 10px auto;
`;
const MoodBody = styled.div`
  width: 150px;
  height: 80px;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const GradeImg = styled.div`
  width: 60px;
  height: 60px;
  background-position: center;
  background-size: cover;
  background-image: url(${cat});
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
  width: 70px;
  height: 15px;
  border-radius: 10px;
  background-color: #7b758b;
  margin-top: -10px;
`;
const HighLight = styled.div`
  background-color: white;
  height: 13px;
  width: 35px;
`;
const PostImg = styled.div`
  width: 180px;
  height: 260px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
const ClosetList = styled.div`
  width: 400px;
  height: 230px;
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
  margin-left: 100px;
`;
export default MyPageForm;
