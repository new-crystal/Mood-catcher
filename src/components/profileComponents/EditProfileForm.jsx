import styled from "styled-components";

const EditProfileForm = () => {
  return (
    <Container>
      <MyPageHeader>
        <h1>Mood catcher</h1>
      </MyPageHeader>
      <ProfileBox>
        <h3>프로필 설정</h3>
      </ProfileBox>
      <Img></Img>
      <ChangeProfile>프로필 사진 변경하기</ChangeProfile>
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

const ProfileBox = styled.div`
  width: 380px;
  height: 40px;
  border-bottom: 3px solid #c4c2ca;
  margin-left: 20px;
`;

const Img = styled.div`
  width: 107px;
  height: 107px;
`;

const ChangeProfile = styled.button`
  background-color: white;
  border: 0px;
  color: #7b758b;
  margin: 20px 150px;
`;

export default EditProfileForm;
