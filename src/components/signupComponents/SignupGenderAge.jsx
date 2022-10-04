import React, { Fragment, useState, useEffect } from "react";
import styleds from "styled-components";
import {
  styled,
  Box,
  ButtonBase,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

//통신
import { __detail } from "../../redux/async/login";
import { __checkNickname } from "../../redux/async/login";
import { changeNickname } from "../../redux/modules/loginSlice";
import { __getUser } from "../../redux/async/login";

//이미지
import male from "../../image/5man.png";
import female from "../../image/girl5.png";
import gender from "../../image/gender.png";

const SignupGenderAge = (location) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkNickname = useSelector((state) => state.login.checkNickname); //닉네임 중복확인 성공 여부 값 받아오기
  const [show, setShow] = useState(false);
  const [age, setAge] = useState("");

  //url에 있는 exist와 토큰 받아오기
  useEffect(() => {
    //url에 exist와 token이 있는 경우
    if (window.location.search !== "") {
      const existList = window.location.href.split("=")[1];
      const exist = existList.split("&")[0];
      const token = localStorage.getItem("token");

      //카카오 로그인->토큰이 없는 경우
      if (token === null) {
        localStorage.setItem("token", window.location.href.split("token=")[1]);
      }
      if (exist === "true") {
        navigate("/main");
      }
      if (exist === "false") {
        console.log("test");
        localStorage.setItem("token", window.location.href.split("token=")[1]);
      }
    }
  }, []);

  //로컬로그인 exist 값 찾기
  useEffect(() => {
    if (window.location.search !== "") {
      const end = window.location.search.split("&")[0];
      const exist = end.split("=")[1];
      if (exist === "true") {
        navigate("/main");
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const payload = jwt_decode(token);
    dispatch(__getUser(payload.userId));
  }, []);

  //react-hook-form
  const {
    register,
    setError,
    getValues,
    formState: { errors, isDirty },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //나이값 담기
  const onChangeHandler = (e) => {
    setAge(e.target.value);
  };

  //닉네임 중복확인을 눌렀을 때
  useEffect(() => {
    if (checkNickname === true) {
      setError("nickname", { message: "사용 가능한 닉네임입니다." });
    }
  }, [checkNickname]);

  //닉네임 중복확인 버튼
  const onClickCheckBtnHandler = async () => {
    const nickname = await getValues("nickname");
    if (nickname !== "" && errors.nickname === undefined) {
      dispatch(__checkNickname(nickname));
      if (checkNickname === false) {
        setError(
          "email",
          { message: "중복된 닉네임입니다." },
          { shouldFocus: true }
        );
      }
    } else {
      setError(
        "email",
        { message: "닉네임을 확인하고 중복확인을 해주세요." },
        { shouldFocus: true }
      );
    }
  };

  //중복확인 이후 닉네임이 변할 때
  const onChangeNickname = () => {
    setError(
      "nickname",
      { message: "닉네임 중복확인을 해주세요" },
      { shouldFocus: true }
    );
    dispatch(changeNickname());
  };

  //성별 페이지로 넘어가기
  const onClickOKBtnHandler = () => {
    if (!checkNickname) {
      setError(
        "nickname",
        { message: "닉네임 중복확인을 해주세요" },
        { shouldFocus: true }
      );
    } else {
      setShow(true);
    }
  };

  //성별, 나이, 닉네임 보내기
  const onClickGenderHandler = async (key) => {
    const keyGender = await key.target.innerText;
    const nickname = getValues("nickname");
    dispatch(__detail({ age, gender: keyGender, nickname })).then(
      navigate("/")
    );
  };

  const images = [
    {
      url: `${male}`,
      title: "남자",
      width: "195px",
    },
    {
      url: `${female}`,
      title: "여자",
      width: "195px",
    },
  ];

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });
  const ManImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "90%",
    backgroundPosition: "center 20%",
    backgroundRepeat: "no-repeat",
  });
  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  return (
    <Fragment>
      {show ? (
        <NicknameWrap>
          <MiniContainer>
            <NicknameBox>
              <h1>Gender</h1>
            </NicknameBox>
            <Box
              className="genderSelector"
              sx={{
                display: "flex",
                minWidth: 300,
                width: "390px",
                marginTop: "150px",
              }}
            >
              {images.map((image) => (
                <ImageButton
                  key={image.title}
                  onClick={(key) => onClickGenderHandler(key)}
                  focusRipple
                  style={{
                    width: image.width,
                  }}
                >
                  {image.title === "남자" ? (
                    <ManImageSrc
                      style={{ backgroundImage: `url(${image.url})` }}
                    />
                  ) : (
                    <ImageSrc
                      style={{ backgroundImage: `url(${image.url})` }}
                    />
                  )}
                  <ImageBackdrop className="MuiImageBackdrop-root" />
                  <Image>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      sx={{
                        position: "relative",
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      }}
                    >
                      {image.title}
                      <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                  </Image>
                </ImageButton>
              ))}
            </Box>
          </MiniContainer>
        </NicknameWrap>
      ) : (
        <NicknameWrap>
          <MiniContainer>
            <NicknameBox>
              <h1>Profile</h1>
            </NicknameBox>
            <FormCantainer>
              <form method="post">
                <NicknameBox2>
                  <h4>닉네임</h4>
                  {errors.nickname !== undefined ? (
                    errors.nickname.message === "사용 가능한 닉네임입니다." ? (
                      <p style={{ color: "blue" }}>{errors.nickname.message}</p>
                    ) : (
                      <p>{errors.nickname.message}</p>
                    )
                  ) : null}
                </NicknameBox2>
                <input
                  className="nickname"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  name="nickname"
                  aria-invalid={
                    !isDirty ? undefined : errors.nickname ? "true" : "false"
                  }
                  {...register("nickname", {
                    onChange: () => onChangeNickname(),
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
                      value: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$/,
                      message: "영문, 한글, 숫자만 가능합니다.",
                    },
                  })}
                />
                <ConfirmBtn
                  type="button"
                  onClick={(e) => onClickCheckBtnHandler(e)}
                >
                  <p>중복확인</p>
                </ConfirmBtn>
              </form>
              <NicknameBox3>
                <h4>나이</h4>
              </NicknameBox3>
              <FormControl
                style={{
                  minWidth: "300px",
                }}
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
              >
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
                  <MenuItem value={"10대"}>10대</MenuItem>
                  <MenuItem value={"20대"}>20대</MenuItem>
                  <MenuItem value={"30대"}>30대</MenuItem>
                  <MenuItem value={"40대"}>40대</MenuItem>
                  <MenuItem value={"50대"}>50대 이상</MenuItem>
                </Select>
              </FormControl>
            </FormCantainer>
            <OkBtn onClick={() => onClickOKBtnHandler()}>다음</OkBtn>
          </MiniContainer>
        </NicknameWrap>
      )}
    </Fragment>
  );
};

const FormCantainer = styleds.div`
display: flex;
margin: 50px auto 0px;
  width: 300px;
  align-items: center;
  justify-content: left;
  align-items: baseline;
  flex-direction: column;
`;

const NicknameWrap = styleds.div`
display: flex;
  width: 100%;
  background-color: #ffffff;
  flex-direction: column;
  text-align: center;
`;

const MiniContainer = styleds.form`
  margin: 0 auto;

  .nickname {
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1;
    border-bottom: 2px solid black;
    width: 183px;
    background-color: #ffffff;
  }
  input {
    padding-left: 5px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1;
    border-bottom: 2px solid black;
    width: 300px;
    height: 24px;
    background-color: #ffffff;
    :focus {
      outline: none;
    }
    ::placeholder {
      font-size: 0.6em;
      font-weight: 400;
      opacity: 1; /* Firefox */
    }
  }
`;

const NicknameBox = styleds.div`
display: flex;
margin: 0 auto;
  border-bottom: 3px solid #fff;
  width: 211px;
  color: #2d273f;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    margin: 70px auto 0;
    margin-bottom: 0px;
    font-family: "Unna";
    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    line-height: 69px;
  }
  p {
    margin-left: 20px;
    margin-bottom: 0px;
  color: #c60000;
  font-size: 10px;
  }
`;

const NicknameBox2 = styleds.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  h4 {
    margin-top: 0px;
    margin-bottom: 0px;
    font-family: "Noto Sans KR", sans-serif;
    color: #2d273f;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
  p {
    margin-left: 20px;
    margin-bottom: 0px;
    color: #c60000;
    font-size: 10px;
  }
`;

const NicknameBox3 = styleds.div`
display: flex;
flex-direction: row;
align-items: baseline;

h4 {
  margin-top: 20px;
  margin-bottom: 7px;
  color: #2d273f;
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

const ConfirmBtn = styleds.button`
margin-left: 20px;
border: 0px;
border-radius: 5px;
width: 90px;
height: 40px;
background: #a8a6af;
color: white;
font-family: "Noto Sans KR", sans-serif;
font-style: normal;
cursor: default;
p {
  margin: 0 auto;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 15px;
}
`;

const OkBtn = styleds.button`
margin-top: 20px;
border: 0px;
border-radius: 5px;
width: 300px;
height: 50px;
color: white;
background: #a8a6af;
font-family: "Noto Sans KR", sans-serif;
font-style: normal;
font-weight: 700;
font-size: 16px;
cursor: default;
p {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 15px;
}
`;

export default SignupGenderAge;
