import { useSelector } from "react-redux";
import styled from "styled-components";
import cat from "../../image/냥5.png";

const MyPageForm = () => {
  const postList = useSelector((state) => state);

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
              <h6>양복</h6>
              <Progress></Progress>
            </GradeText>
          </MoodBody>
        </MoodBox>
        <PostImg></PostImg>
      </MyPageBox>
      <MoodHeader>My Closet</MoodHeader>
      <ClosetList>
        <Closet></Closet>
        <Closet></Closet>
        <Closet></Closet>
        <Closet></Closet>
        <Closet></Closet>
      </ClosetList>
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
const Progress = styled.div`
  width: 70px;
  height: 15px;
  border-radius: 10px;
  background-color: #7b758b;
  margin-top: -10px;
`;
const PostImg = styled.div`
  width: 180px;
  height: 260px;
  background-position: center;
  background-size: cover;
  background-image: url(${cat});
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
  background-image: url(${cat});
`;
export default MyPageForm;
