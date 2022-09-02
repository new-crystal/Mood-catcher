import React, { Fragment, useState, Suspense, useEffect } from "react";
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
import { __detail } from "../../redux/modules/loginSlice";
import { useForm } from "react-hook-form";
import {
  __checkNickname,
  changeNickname,
} from "../../redux/modules/loginSlice";
import male from "../../image/5man.png";
import female from "../../image/girl5.png";
import Artboard from "../../image/Artboard.png";

import Header from "../../elem/Header";
import Loader from "../../shared/Loader";

const SignupGenderAge = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const {
    register,
    setError,
    getValues,
    formState: { errors, isDirty },
  } = useForm({ criteriaMode: "all", mode: "onChange" });
  const checkNickname = useSelector((state) => state.login.checkNickname);
  console.log(checkNickname);
  //닉네임 인풋 값 받아오기
  const nickname = getValues("nickname");

  //나이값 담기
  const onChangeHandler = (e) => {
    setAge(e.target.value);
  };
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
  const onClickGenderHandler = (key) => {
    setGender(key.target.outerText);
    const nickname = getValues("nickname");
    dispatch(__detail({ age, gender, nickname }));
  };

  const images = [
    {
      url: `${male}`,
      title: "남자",
      width: "50%",
    },
    {
      url: `${female}`,
      title: "여자",
      width: "50%",
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
      <Suspense
        fallback={
          <LoaderWrap>
            <Loader />
          </LoaderWrap>
        }
      >
        <Header />
        <Container>
          <Grid>
            <div>
              {show ? (
                <>
                  <h1>Gender</h1>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      minWidth: 300,
                      width: "100%",
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
                </>
              ) : (
                <>
                  <form method="post">
                    <div>
                      <Img></Img>
                      <InputBox>
                        <TextBox>
                          {errors.nickname && <p>{errors.nickname.message}</p>}
                        </TextBox>
                        <input
                          onChange={onChangeNickname}
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
                        <ConfirmBtn onClick={(e) => onClickCheckBtnHandler(e)}>
                          중복확인
                        </ConfirmBtn>
                      </InputBox>
                    </div>
                  </form>
                  <FootBox>
                    <Foot></Foot>
                    <Foot></Foot>
                  </FootBox>
                  <AgeBox>
                    <h1>Age</h1>
                  </AgeBox>
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
                  <FootBox>
                    <Foot></Foot>
                    <OkBtn onClick={() => onClickOKBtnHandler()}>OK</OkBtn>
                    <Foot></Foot>
                  </FootBox>
                </>
              )}
            </div>
          </Grid>
        </Container>
      </Suspense>
    </Fragment>
  );
};

const LoaderWrap = styleds.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

const Container = styleds.div`
  display: flex;
  height: 984px;
  flex-direction: column;
  bottom: 110px;
  div {
    text-align: center;
  }
  .label {
    margin: 9px 30px;
  }
  .age {
    width: 280px;
    margin-top: 25px;
    margin-left: 25px;
    margin-bottom : 20px;
  }
  form {
    width:428px;
    display: flex;
    flex-direction: row;
  }
  input {
    background-color: #e6e5ea;
    border: 0px;
    border-radius: 7px;
    height: 35px;
    width: 210px;
  }
`;

const Grid = styleds.div`
  //width: 100%;
  width: 428px;
  margin: 0 auto;
  // background-color: royalblue;
  margin-top: 60px;
  margin-bottom: 500px;
`;

const Img = styleds.div`
  margin-top : 60px;
  width: 428px;
  height: 130px;
  background-position: center;
  background-size: cover;
  background-image: url(${Artboard});
`;

const InputBox = styleds.div`
  margin-top: -35px;
`;

const TextBox = styleds.div`
  display: flex;
  h4 {
    color: #2d273f;
  }
  p {
    color: #c60000;
    font-size: 10px;
    margin-top: 0px;
    margin-left: 90px;
  }
`;
const ConfirmBtn = styleds.button`
  background-color: #7b758b;
  color : white;
  border: 0px;
  border-radius: 10px;
  width: 80px;
  height: 40px;
  margin: 0px 10px;
`;
const SignUpHeader = styleds.div`
  width: 428px;
  height: 60px;
  background-color: #a396c9;
  color: white;
`;
const AgeBox = styleds.div`
  width: 300px;
  height: 40px;
  background-color: #A396C9;
  color: white;
  margin : 0px 55px;
  border-radius: 5px;
`;
const FootBox = styleds.div`
  width: 300px;
  display : flex;
  justify-content: space-between;
  margin : 10px 55px;
`;
const OkBtn = styleds.button`
  background-color: #7b758b;
  color: white;
  border: 0px;
  border-radius: 10px;
  width: 150px;
  height: 40px;
  margin: 0px auto;
`;
const Foot = styleds.div`
  width: 25px;
  height:40px;
  background-color: #a396c9;
`;

export default SignupGenderAge;
