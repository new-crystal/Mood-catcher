import styled from "styled-components";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  __delUser,
  __editProfile,
  __checkNickname,
  __getUser,
} from "../../redux/async/login";
import { changeNickname } from "../../redux/modules/loginSlice";
import { deleteCookie, getCookie } from "../../shared/cookie";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editNickname, setEditNickname] = useState(false);
  const checkNickname = useSelector((state) => state.login.checkNickname);
  const users = useSelector((state) => state.login.userStatus);
  const [gender, setGender] = useState(users?.gender);
  const [age, setAge] = useState(users?.age);
  const [image, setImage] = useState({
    image_file: "",
    preview_URL:
      "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png",
  });
  const token = getCookie("token");
  const payload = jwt_decode(token);
  const userId = payload.userId;

  //토큰이 없는 상태일 경우 로그인 페이지로 이동
  useEffect(() => {
    if (token === undefined) {
      navigate("/login");
    }
  }, []);

  //유저 정보 가져오기
  useEffect(() => {
    dispatch(__getUser(userId));
  }, []);

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

  //닉네임 중복확인을 눌렀을 때
  useEffect(() => {
    if (checkNickname === true) {
      setError("nickname", { message: "사용 가능한 닉네임입니다." });
    }
  }, [checkNickname]);

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
    if (nickname !== "" && errors.nickname === undefined) {
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

  //중복확인 이후 닉네임이 변할 때
  const onChangeNickname = () => {
    dispatch(changeNickname());
  };

  //수정된 프로필 이미지, 닉네임, 성별, 나이 전송하기
  const onSubmit = async () => {
    // console.log(editNickname);
    if (image.image_file === "") {
      alert("새로운 프로필 사진을 입력해주세요!");
    } else {
      const nickname = getValues("nickname");
      const formData = new FormData();
      formData.append("userValue", image.image_file);
      if (editNickname === false && errors.nickname === undefined) {
        dispatch(
          __editProfile({
            userValue: formData,
            nickname: users.nickname,
            gender,
            age,
          })
        )
          .then(alert("캐처님의 프로필이 수정되었습니다!"))
          .then(navigate(`/mypage/${userId}`));
      }
      if (editNickname === true && errors.nickname === undefined) {
        dispatch(__editProfile({ userValue: formData, nickname, gender, age }))
          .then(alert("캐처님의 프로필이 수정되었습니다!"))
          .then(navigate(`/mypage/${userId}`));
      }
      if (editNickname === true && errors.nickname !== undefined) {
        setError(
          "nickname",
          { message: "닉네임 중복확인을 해주세요." },
          { shouldFocus: true }
        );
      }
    }
  };

  //로그아웃
  const onClickLogOut = () => {
    alert("로그아웃 되셨습니다");
    deleteCookie("token");
    navigate("/login");
  };

  //회원탍퇴
  const onClickDelBtn = () => {
    const result = window.confirm(
      "다른 분들이 캐처님의 옷장을 기다리고 계시는데 회원탈퇴를 하시겠습니까?"
    );
    if (result) {
      dispatch(__delUser);
    }
  };

  //닉네임 변경하기 전에 확인받기
  const onClickEditNickname = () => {
    const result = window.confirm(
      `${users.nickname}님의 현재 닉네임을 사용하실 수 없습니다. 변경하시겠습니까?`
    );
    if (result) {
      setEditNickname(true);
    }
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
          name="userValue"
          accept="image/*"
          type="file"
          onChange={saveImg}
          onClick={(e) => (e.target.value = null)}
          ref={(refParam) => (inputRef = refParam)}
        />
        프로필 사진 변경하기
      </ChangeProfile>
      <form onSubmit={handleSubmit(onSubmit)}>
        {editNickname ? (
          <>
            {errors.nickname && <p>{errors.nickname.message}</p>}
            <input
              type="text"
              placeholder={users.nickname}
              name="nickname"
              aria-invalid={
                !isDirty ? undefined : errors.nickname ? "true" : "false"
              }
              {...register("nickname", {
                onChange: () => onChangeNickname(),
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
            <CheckBtn type="button" onClick={(e) => onClickCheckBtnHandler(e)}>
              중복 확인
            </CheckBtn>
          </>
        ) : (
          <EditNicknameBtn type="button" onClick={onClickEditNickname}>
            닉네임 변경하기
          </EditNicknameBtn>
        )}
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
                  <MenuItem value={"남자"}>남자</MenuItem>
                  <MenuItem value={"여자"}>여자</MenuItem>
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
          완료
        </ChangeBtn>
      </form>
      <ProfileBox>
        <h3>계정 설정</h3>
      </ProfileBox>
      <LogOut>
        <button onClick={onClickLogOut}>로그아웃</button>
        <button onClick={onClickDelBtn}>계정탈퇴</button>
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
    background-color: #fff;
    border: 0px;
    border-radius: 7px;
    height: 50px;
    width: 250px;
    margin-left: 20px;
    margin-bottom: 40px;
  }
  p {
    color: #c60000;
    font-size: 10px;
    margin-top: -20px;
    margin-left: -190px;
  }
`;

const ProfileBox = styled.div`
  width: 380px;
  height: 40px;
  border-bottom: 3px solid #fff;
  margin-left: 20px;
  text-align: left;
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
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  border: 0px;
  color: #6a6578;
  margin-top: -20px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
`;
const EditNicknameBtn = styled.button`
  background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
  border: 0px;
  border-radius: 10px;
  width: 200px;
  height: 40px;
  margin: 20px auto;
  color: white;
  display: block;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
`;
const GenderAgeBox = styled.div`
  width: 390px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .gender {
    width: 180px;
  }
  .age {
    width: 180px;
  }
`;
const CheckBtn = styled.button`
  background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
  color: white;
  border: 0px;
  border-radius: 10px;
  height: 50px;
  width: 80px;
  margin-left: 20px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
`;

const LogOut = styled.div`
  flex-direction: row;
  button {
    background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
    border: 0px;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    margin: 20px auto;
    color: white;
    display: block;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
  }
`;

const ChangeBtn = styled.button`
  background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
  border: 0px;
  border-radius: 5px;
  width: 90px;
  height: 40px;
  margin: 20px auto;
  color: white;
  display: block;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
`;
export default EditProfileForm;
