import styled from "styled-components";
import { useRef, useState } from "react";

const EditProfileForm = () => {
  const [attachment, setAttachment] = useState(null);
  const fileInput = useRef();

  //이미지 미리보기
  const selectImg = (e) => {
    const reader = new FileReader();
    const theFile = fileInput.current.files[0];
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishiedEvent) => {
      const {
        currentTarget: { result },
      } = finishiedEvent;
      setAttachment(result);
    };
  };

  return (
    <Container>
      <MyPageHeader>
        <h1>Mood catcher</h1>
      </MyPageHeader>
      <ProfileBox>
        <h3>프로필 설정</h3>
      </ProfileBox>
      <Img
        src={
          attachment
            ? attachment
            : "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800"
        }
        alt="업로드할 이미지"
      />
      <form encType="multipart/form-data">
        <input type="file" name="image" ref={fileInput} onChange={selectImg} />
      </form>
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
