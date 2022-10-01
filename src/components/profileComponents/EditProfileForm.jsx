import styled from "styled-components";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  __delUser,
  __editProfile,
  __checkNickname,
  __editOrigin,
  __logout,
  __getMyPageUser,
} from "../../redux/async/login";
import { changeNickname } from "../../redux/modules/loginSlice";
import { deleteCookie, getCookie } from "../../shared/cookie";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editNickname, setEditNickname] = useState(false);
  const [original, setOriginal] = useState(false);
  const checkNickname = useSelector((state) => state.login.checkNickname);
  const users = useSelector((state) => state.login.myPageUser);
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
  const [edit, setEdit] = useState(false);

  //토큰이 없는 상태일 경우 로그인 페이지로 이동
  useEffect(() => {
    if (token === undefined) {
      navigate("/login");
    }
  }, []);

  //유저 정보 가져오기
  useEffect(() => {
    dispatch(__getMyPageUser(userId));
    if (users?.imgUrl.split(".com/")[1] !== "null") {
      setImage({ preview_URL: users.imgUrl });
    }
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
  //기본 이미지로 변경하기
  const onClickBasicBtn = () => {
    setImage({
      image_file: "",
      preview_URL:
        "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png",
    });
    setOriginal(true);
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
    const nickname = getValues("nickname");
    //이미지 파일 없고 닉네임 수정을 하지 않고 기본 이미지로 바꾸지 않았을 때
    if (
      image.image_file === "" &&
      editNickname === false &&
      errors.nickname === undefined &&
      original === false
    ) {
      dispatch(__editProfile({ nickname: users.nickname, gender, age }))
        .then(
          Swal.fire({
            icon: "success",
            title: "캐처님의 프로필이 수정되었습니다",
            showConfirmButton: false,
            timer: 1500,
          })
        )
        .then(navigate(`/mypage/${userId}`));
    }
    //이미지 파일 없고 닉네임 수정을 하지 않고 기본 이미지로 바꾸었을 때
    if (
      image.image_file === "" &&
      editNickname === false &&
      errors.nickname === undefined &&
      original === true
    ) {
      dispatch(
        __editOrigin({ nickname: users.nickname, gender, age, original })
      )
        .then(
          Swal.fire({
            icon: "success",
            title: "캐처님의 프로필이 수정되었습니다",
            showConfirmButton: false,
            timer: 1500,
          })
        )
        .then(navigate(`/mypage/${userId}`));
    }
    //이미지 파일 없고 닉네임 수정을 하고 기본 이미지로 바꾸지 않았을 때
    if (
      image.image_file === "" &&
      editNickname === true &&
      errors.nickname === undefined &&
      original === false &&
      checkNickname === true
    ) {
      dispatch(__editProfile({ nickname, gender, age }))
        .then(
          Swal.fire({
            icon: "success",
            title: "캐처님의 프로필이 수정되었습니다",
            showConfirmButton: false,
            timer: 1500,
          })
        )
        .then(navigate(`/mypage/${userId}`));
    }
    //이미지 파일 없고 닉네임 수정을 하고 기본 이미지로 바꾸었을 때
    if (
      image.image_file === "" &&
      editNickname === true &&
      errors.nickname === undefined &&
      original === true &&
      checkNickname === true
    ) {
      dispatch(__editOrigin({ nickname, gender, age, original }))
        .then(
          Swal.fire({
            icon: "success",
            title: "캐처님의 프로필이 수정되었습니다",
            showConfirmButton: false,
            timer: 1500,
          })
        )
        .then(navigate(`/mypage/${userId}`));
    }
    //이미지 파일 넣었을 때
    if (image.image_file !== "") {
      const formData = new FormData();
      formData.append("userValue", image.image_file);
      //닉네임 수정을 하지 않았을 경우
      if (
        editNickname === false &&
        errors.nickname === undefined &&
        checkNickname === false
      ) {
        dispatch(
          __editProfile({
            userValue: formData,
            nickname: users.nickname,
            gender,
            age,
            original,
          })
        )
          .then(
            Swal.fire({
              icon: "success",
              title: "캐처님의 프로필이 수정되었습니다",
              showConfirmButton: false,
              timer: 1500,
            })
          )
          .then(navigate(`/mypage/${userId}`));
      }
      //닉네임 수정을 했을 경우 에러가 없을 때
      if (
        editNickname === true &&
        errors.nickname === undefined &&
        checkNickname === true
      ) {
        dispatch(
          __editProfile({
            userValue: formData,
            nickname,
            gender,
            age,
            original,
          })
        )
          .then(
            Swal.fire({
              icon: "success",
              title: "캐처님의 프로필이 수정되었습니다",
              showConfirmButton: false,
              timer: 1500,
            })
          )
          .then(navigate(`/mypage/${userId}`));
      }
      //닉네임 수정을 했을 경우 에러가 있을 때
      if (editNickname === true && checkNickname === false) {
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
    Swal.fire({
      title: "로그아웃을 하시겠습니까?",
      text: "다른 분들이 캐처님의 옷장을 기다리고 계시는데 로그아웃을 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(__logout());
      }
    });
  };

  // //쿠키 삭제 함수
  // function deleteAllCookies() {
  //   const cookies = document.cookie.split(";");
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i];
  //     const eqPos = cookie.indexOf("=");
  //     const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //     document.cookie = name + "=;max-age=-1";
  //   }
  //   deleteCookie("token");
  // }

  //회원탍퇴
  const onClickDelBtn = () => {
    Swal.fire({
      title: "회원탈퇴를 하시겠습니까?",
      text: "다른 분들이 캐처님의 옷장을 기다리고 계시는데 회원탈퇴를 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "회원탈퇴",
      cancelButtonText: "탈퇴취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(__delUser());
        dispatch(__logout());
        navigate("/login");
      }
    });
  };

  //닉네임 변경하기 전에 확인받기
  const onClickEditNickname = () => {
    Swal.fire({
      title: "닉네임을 변경하시겠습니까?",
      text: `${users.nickname}님의 현재 닉네임이 변경됩니다`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "변경하기",
      cancelButtonText: "취소하기",
    }).then((result) => {
      if (result.isConfirmed) {
        setEditNickname(true);
      }
    });
  };

  return (
    <Container>
      <ProfileBox>
        <h3>프로필 설정</h3>
      </ProfileBox>
      <Img url={image.preview_URL}></Img>
      <Wrapper>
        <h5 style={{ cursor: "pointer" }} onClick={() => setEdit(!edit)}>
          프로필 사진 수정하기 ▼
        </h5>
        {edit ? (
          <EditBox>
            <ChangeProfile
              style={{ cursor: "pointer" }}
              onClick={() => inputRef.click()}
            >
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
            <BasicBtn
              style={{ cursor: "pointer" }}
              type="button"
              onClick={onClickBasicBtn}
            >
              기본 이미지로 변경하기
            </BasicBtn>
          </EditBox>
        ) : null}
      </Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        {editNickname ? (

          <StNicknameBox>
             {errors.nickname !== undefined ? (
              errors.nickname.message === "사용 가능한 닉네임입니다." ? (
                <p style={{ color: "blue" }}>{errors.nickname.message}</p>
              ) : (
                <p>{errors.nickname.message}</p>
              )
            ) : null}

            <NicknameInput
              type="text"
              id="nickname"
              placeholder={`${users.nickname}님의 새로운 닉네임을 입력해주세요`}
              name="nickname"
              aria-invalid={
                !isDirty ? undefined : errors.nickname ? "true" : "false"
              }
              {...register("nickname", {
                onChange: () => onChangeNickname(),
                required: "변경하실 닉네임을 입력해주세요",
                minLength: {
                  value: 2,
                  message: "닉네임을 2자 이상 작성해주세요",
                },
                maxLength: {
                  value: 16,
                  message: "닉네임을 16자 이하로 작성해주세요",
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$/,
                  message:
                    "닉네임은 영문 대소문자, 글자 단위 한글, 숫자만 가능합니다.",
                },
              })}
            />
            <CheckBtn
              style={{ cursor: "pointer" }}
              type="button"
              onClick={(e) => onClickCheckBtnHandler(e)}
            >
              중복 확인
            </CheckBtn>
          </StNicknameBox>
        ) : (

          <EditNicknameBtn
            style={{ cursor: "pointer" }}
            type="button"
            onClick={onClickEditNickname}
          >
            닉네임 변경

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
        <ChangeBtn
          style={{ cursor: "pointer" }}
          type="submit"
          disabled={isSubmitting}
        >
          완료
        </ChangeBtn>
      </form>
      <ProfileBox>
        <h3 className="auth">계정 설정</h3>
      </ProfileBox>
      <LogOut>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/edit_password")}
        >
          비밀번호 변경
        </button>
        <button style={{ cursor: "pointer" }} onClick={onClickLogOut}>
          로그아웃
        </button>
        <button style={{ cursor: "pointer" }} onClick={onClickDelBtn}>
          계정탈퇴
        </button>
      </LogOut>
    </Container>
  );
};

const Container = styled.div`
  /* width: 412px; */
  /* height: 926px; */
  width: 100%;
  margin: 0 auto;
  text-align: center;
  form {
    margin-top: 10px;
  }

  input {
    background-color: #fff;
    border: 2px solid grey;
    border-radius: 7px;
    height: 50px;

    //width: 250px;

    box-sizing: border-box;
    width: 175px;
    margin: 20px auto 40px;
    padding-left: 5px;
    :focus {
      outline: none;
    }
  }
  p {
    color: #c60000;
    font-size: 10px;
    margin-top: -20px;
    margin-left: -150px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h4 {
    font-family: "Noto Sans KR", sans-serif;
    /* font-family: "Roboto"; */
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
`;
// const ProfileBox = styled.div`
//   width: 380px;
//   height: 40px;
//   border-bottom: 3px solid rgb(148, 144, 160);
//   margin-left: 20px;
//   text-align: left;
// `;

const StNicknameBox = styled.div`
  width: 375px;
  display: flex;
  margin: 0 auto;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  h3 {
    margin: 20px 0px 0px 20px;
    color: #2d273f;
    font-family: "Noto Sans KR", sans-serif;
    /* font-family: "Roboto"; */
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
  h3.auth {
    margin: 50px 0px 0px 20px;
    color: #2d273f;
    font-family: "Noto Sans KR", sans-serif;
    /* font-family: "Roboto"; */
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
  p {
    color: #c60000;
    font-size: 10px;
    margin-left: 20px;
    margin-bottom: 0px;
  }
`;

const Img = styled.div`
  width: 107px;
  height: 107px;
  border-radius: 50%;
  margin: 20px auto;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
const EditBox = styled.div`
  margin-top: 7px;
  display: flex;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #e6e5ea;
  border-radius: 10px;
  height: 67px;
`;
const ChangeProfile = styled.button`
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  border: 0px;
  color: #6a6578;
  margin-top: 10px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  margin-top: 0px;
`;
const BasicBtn = styled.button`
  background-color: transparent;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  color: #6a6578;
  font-size: 12px;
  margin: 10px auto 0px auto;
  border: 0px;
`;
const NicknameInput = styled.input`
  /* box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25); */
`;
const EditNicknameBtn = styled.button`
  /* background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
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
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25); */
  background: #a8a6af;
  border: 0px;
  width: 375px;
  height: 50px;
  border-radius: 5px;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  margin: 10px auto 10px;
  cursor: default;
  p {
    color: white;
    /* font-family: "Roboto"; */
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
  }
`;
const GenderAgeBox = styled.div`
  width: 375px;
  margin: 0 auto 10px;
  /* padding: 15px; */
  display: flex;
  justify-content: space-between;
  .gender {
    width: 180px;
  }
  .age {
    width: 180px;
  }
`;
const CheckBtn = styled.button`
  /* background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
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
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25); */
  background: #a8a6af;
  border: 0px;
  width: 175px;
  height: 50px;
  margin: 0 auto;
  border-radius: 5px;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  margin-top: 20px;
  cursor: default;
  p {
    color: white;
    /* font-family: "Roboto"; */
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
  }
`;

const LogOut = styled.div`
  flex-direction: row;
  button {
    /* background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
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
    box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25); */
    background: #a8a6af;
    border: 0px;
    width: 300px;
    height: 50px;
    border-radius: 5px;
    color: white;
    font-family: "Noto Sans KR", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    margin-top: 20px;
    cursor: default;
    p {
      color: white;
      /* font-family: "Roboto"; */
      text-decoration: none;
      font-weight: bold;
      font-size: 15px;
    }
  }
`;

const ChangeBtn = styled.button`
  /* background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
  border: 0px;
  border-radius: 10px;
  width: 90px;
  height: 40px;
  margin: 20px auto;
  color: white;
  display: block;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25); */
  background: #a8a6af;
  border: 0px;
  width: 375px;
  height: 50px;
  border-radius: 5px;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  margin: 10px auto 10px;
  cursor: default;
  p {
    color: white;
    /* font-family: "Roboto"; */
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
  }
`;
export default EditProfileForm;
