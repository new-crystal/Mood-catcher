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
import { __detail } from "../../redux/async/login";
import { useForm } from "react-hook-form";
import { __checkNickname } from "../../redux/async/login";
import { changeNickname } from "../../redux/modules/loginSlice";
import { __getUser } from "../../redux/async/login";

import male from "../../image/5man.png";
import female from "../../image/girl5.png";
import board from "../../image/board.png";
import { useNavigate } from "react-router-dom";
import gender from "../../image/gender.png";
import { getCookie } from "../../shared/cookie";
import jwt_decode from "jwt-decode";

const SignupGenderAge = (location) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [age, setAge] = useState("");
  const {
    register,
    setError,
    getValues,
    formState: { errors, isDirty },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //닉네임 중복확인 성공 여부 값 받아오기
  const checkNickname = useSelector((state) => state.login.checkNickname);
  const users = useSelector((state) => state.login.userStatus);

  //로그인을 안 한 경우
  useEffect(() => {
    const token = getCookie("token");
    if (token === undefined) {
      navigate("/login");
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
    const token = getCookie("token");
    const payload = jwt_decode(token);
    dispatch(__getUser(payload.userId));
  }, []);

  //닉네임 인풋 값 받아오기
  const nickname = getValues("nickname");

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

  //닉네임 중복확인
  const onClickCheckBtnHandler = (e) => {
    e.preventDefault();
    if (nickname !== "" && errors.nickname === undefined) {
      dispatch(__checkNickname(nickname));
      if (checkNickname === false) {
        setError(
          "nickname",
          { message: "중복된 닉네임입니다." },
          { shouldFocus: true }
        );
      }
    }
    if (errors.nickname !== undefined) {
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
      navigate("/start")
    );
  };

  const images = [
    {
      url: `${male}`,
      title: "남자",
      width: "105px",
    },
    {
      url: `${female}`,
      title: "여자",
      width: "105px",
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
      <Container>
        <Grid>
          <div>
            {show ? (
              <>
                <GenderImg>
                  <h1>성별</h1>
                </GenderImg>
                <Box
                  className="genderSelector"
                  sx={{
                    display: "flex",
                    minWidth: 300,
                    width: "400px",
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
                      <ImageSrc
                        style={{ backgroundImage: `url(${image.url})` }}
                      />
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
                <BottomImg></BottomImg>
              </>
            ) : (
              <>
                <Img>
                  <form method="post">
                    <NicknameBox>
                      <h4>닉네임</h4>
                      {errors.nickname && <p>{errors.nickname.message}</p>}
                    </NicknameBox>
                    <InputBox>
                      <input
                        type="text"
                        placeholder="닉네임을 입력해주세요"
                        name="nickname"
                        aria-invalid={
                          !isDirty
                            ? undefined
                            : errors.nickname
                            ? "true"
                            : "false"
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
                            value:
                              /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$/,
                            message:
                              "닉네임은 영문 대소문자, 글자 단위 한글, 숫자만 가능합니다.",
                          },
                        })}
                      />
                      <ConfirmBtn onClick={(e) => onClickCheckBtnHandler(e)}>
                        중복확인
                      </ConfirmBtn>
                    </InputBox>
                  </form>
                  <h4>나이</h4>
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
                  <OkBtn onClick={() => onClickOKBtnHandler()}>OK</OkBtn>
                </Img>
              </>
            )}
          </div>
        </Grid>
      </Container>
    </Fragment>
  );
};

const Container = styleds.div`
  display: flex;
  height: 984px;
  text-align: left;
  flex-direction: column;
  align-items: left;
  bottom: 110px;
  
  .label {
    margin: 20px 60px;
  }
  .age {
    width: 280px;
    height: 50px;
    margin-top: 25px;
    margin-left: 45px;
    margin-bottom : 20px;
  }
  form {
    width:428px;
    display: flex;
    align-items: left;
    justify-content:center;
    flex-direction: column;
  }
  input {
    background-color: #e6e5ea;
    border: 0px;
    border-radius: 7px;
    height: 50px;
    width: 180px;
    margin-left : -40px;
  }
  h4 {
    margin-left : 50px;
    margin-bottom : 5px;
    font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #2D273F;
   }
   p {
    position : relative;
    top:20px;
    left: 10px;
   }

   .genderSelector{
    width: 220px;
    margin-top : -30px;
    margin-left : 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
   }
`;

const Grid = styleds.div`
  //width: 100%;
  width: 428px;
  margin: 0 auto;
  background: linear-gradient(#a396c9, #ffffff);
  margin-top: 60px;
  margin-bottom: 500px;
  min-height: 928px;
`;

const GenderImg = styleds.div`
  width: 351px;
  height: 125px;
  margin : 0px auto 50px auto;
  background-position: center;
  background-size: cover;
  background-image: url(${gender});
  text-aligns : center;
  align-items: center;
  justify-content: center;
  
  h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    text-align: center;
    color: #2D273F;
    position : relative;
    top:75px;
  }
`;

const Img = styleds.div`
  margin: 60px auto 0px auto;
  width: 383px;
  height: 551px;
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  background-position: center;
  background-size: cover;
  background-image: url(${board});
`;

const BottomImg = styleds.div`
  transform: scaleY(-1);
  width: 264px;
  height: 93px;
  margin-top : 50px;
  margin-left : 80px;
  background-position: center;
  background-size: cover;
  background-image: url(${gender});
`;

const NicknameBox = styleds.div`
display: flex;
align-items: left;
justify-content: left;
flex-direction: row;

h4 {
  margin-left : 50px;
  margin-bottom : 5px;
  font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 20px;
color: #2D273F;
 }
 p {
  color: #c60000;
  font-size: 10px;
  margin-bottom : -30px;
}
`;

const InputBox = styleds.div`
width : 430px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const ConfirmBtn = styleds.button`
background: linear-gradient(78.32deg, #7B758B 41.41%, #FFFFFF 169.58%);
  color : white;
  border: 0px;
  border-radius: 10px;
  width: 90px;
  height: 50px;
  margin: 0px 10px;
  font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 16px;
`;

const OkBtn = styleds.button`
background: linear-gradient(78.32deg, #7B758B 41.41%, #FFFFFF 169.58%);
  color: white;
  border: 0px;
  border-radius: 10px;
  width: 90px;
  height: 40px;
  margin: 0px auto;
  text-align: center;
  font-family: 'Unna';
font-style: normal;
font-weight: 400;
font-size: 30px;
`;

export default SignupGenderAge;
