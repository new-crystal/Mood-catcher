import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  __delUser,
  __editProfile,
  __checkNickname,
} from "../../redux/modules/loginSlice";

const EditProfileForm = () => {
  const checkNickname = useSelector((state) => state.login.checkNickname);
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL:
      "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png",
  });

  //react-hook-form사용
  const {
    register,
    isDirty,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setError,
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  let inputRef;

  //수정된 성별 담기
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  //수정된 나이 담기
  const onChangeHandler = (e) => {
    setAge(e.target.value);
  };

  //이미지 미리보기
  const saveImg = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  //닉네임 중복확인하기
  const onClickCheckBtnHandler = (e) => {
    e.preventDefault();
    const nickname = getValues("nickname");
    if (errors.nickname === undefined) {
      dispatch(__checkNickname(nickname));
      if (checkNickname === false) {
        setError(
          "nickname",
          { message: "중복된 닉네임입니다." },
          { shouldFocus: true }
        );
      }
    } else {
      setError(
        "nickname",
        { message: "닉네임을 확인하고 중복확인을 해주세요." },
        { shouldFocus: true }
      );
    }
  };

  //수정된 프로필 이미지, 닉네임, 성별, 나이 전송하기
  const onSubmit = () => {
    const nickname = getValues("nickname");
    if (image.image_file && nickname && gender && age) {
      const formData = new FormData();
      formData.append("imgFile", image.image_file);
      formData.append("nickname", nickname);
      formData.append("gender", gender);
      formData.append("age", age);
      dispatch(__editProfile(formData));
    } else {
      alert("수정할 프로필을 모두 입력해주세요!");
    }
  };

  //회원탍퇴
  const onClickDelBtn = () => {
    window.confirm("정말 회원탈퇴를 하시겠습니까?");
    dispatch(__delUser);
  };

  return (
    <Container>
      <ProfileBox>
        <h3>프로필 설정</h3>
      </ProfileBox>
      <Img url={image.preview_URL}></Img>
      <ChangeProfile onClick={() => inputRef.click()}>
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={saveImg}
          onClick={(e) => (e.target.value = null)}
          ref={(refParam) => (inputRef = refParam)}
        />
        프로필 사진 변경하기
      </ChangeProfile>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.nickname && <p>{errors.nickname.message}</p>}
        <input
          type="text"
          placeholder="새로운 닉네임을 입력해주세요"
          name="nickname"
          aria-invalid={
            !isDirty ? undefined : errors.nickname ? "true" : "false"
          }
          {...register("nickname", {
            required: "닉네임은 필수 입력입니다.",
            minLength: {
              value: 2,
              message: "닉네임을 2자 이상 작성해주세요",
            },
            maxLength: {
              value: 16,
              message: "닉네임을 16자 이하로 작성해주세요",
            },
            pattern: {
              value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
              message:
                "닉네임은 영문 대소문자, 글자 단위 한글, 숫자만 가능합니다.",
            },
          })}
        />
        <CheckBtn onClick={(e) => onClickCheckBtnHandler(e)}>
          중복 확인
        </CheckBtn>
        <GenderAgeBox>
          <div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Gender
                </InputLabel>
                <Select
                  className="gender"
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={gender}
                  onChange={handleChange}
                  autoWidth
                  label="Age"
                >
                  <MenuItem value={"남자"}>Male</MenuItem>
                  <MenuItem value={"여자"}>Female</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                className="label"
              >
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={onChangeHandler}
                label="Age"
                className="age"
              >
                <MenuItem value={"10대"}>10대 미만</MenuItem>
                <MenuItem value={"10대"}>10대</MenuItem>
                <MenuItem value={"20대"}>20대</MenuItem>
                <MenuItem value={"30대"}>30대</MenuItem>
                <MenuItem value={"40대"}>40대</MenuItem>
                <MenuItem value={"50대"}>50대 이상</MenuItem>
              </Select>
            </FormControl>
          </div>
        </GenderAgeBox>
        <ChangeBtn type="submit" disabled={isSubmitting}>
          변경하기
        </ChangeBtn>
      </form>
      <ProfileBox>
        <h3>계정 설정</h3>
      </ProfileBox>
      <LogOut>
        <button>로그아웃</button>
        <button onClick={() => onClickDelBtn()}>계정탈퇴</button>
      </LogOut>
    </Container>
  );
};

const Container = styled.div`
  width: 428px;
  height: 926px;
  form {
    margin-top: 30px;
  }

  input {
    background-color: #e6e5ea;
    border: 0px;
    border-radius: 7px;
    height: 40px;
    width: 250px;
    margin-left: 20px;
    margin-bottom: 40px;
    background-color: #e6e5ea;
  }
  p {
    color: #c60000;
    font-size: 10px;
    margin-top: -20px;
    margin-left: -190px;
  }
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
  border-radius: 50%;
  margin: 10px auto;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;

const ChangeProfile = styled.button`
  background-color: white;
  border: 0px;
  color: #7b758b;
  margin-top: -20px;
`;
const GenderAgeBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .gender {
    width: 200px;
  }
  .age {
    width: 200px;
  }
`;
const CheckBtn = styled.button`
  background-color: #7b758b;
  color: white;
  border: 0px;
  border-radius: 5px;
  height: 40px;
  width: 80px;
  margin-left: 20px;
`;
const LogOut = styled.div`
  flex-direction: row;
  button {
    background-color: #7b758b;
    border: 0px;
    border-radius: 5px;
    width: 260px;
    height: 40px;
    margin: 20px auto;
    color: white;
    display: block;
  }
`;

const ChangeBtn = styled.button`
  background-color: #7b758b;
  border: 0px;
  border-radius: 5px;
  width: 260px;
  height: 40px;
  margin: 20px auto;
  color: white;
  display: block;
`;
export default EditProfileForm;
