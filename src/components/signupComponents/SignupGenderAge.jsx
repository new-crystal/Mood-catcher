import styleds from "styled-components";
import { styled } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { ButtonBase } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useState } from "react";
import { InputLabel } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { __detail } from "../../redux/modules/loginSlice";
import { useForm } from "react-hook-form";
import { __checkNickname } from "../../redux/modules/loginSlice";
//mport male from "../../../public/image/mail.png";
//import female from "../../../public/";

const SignupGenderAge = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const {
    register,
    setError,
    getValues,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm();

  //나이값 담기
  const onChangeHandler = (e) => {
    setAge(e.target.value);
  };

  //성별 담기
  const onClickGenderHandler = (key) => {
    setGender(key.target.outerText);
    setShow(false);
  };
  //성별, 나이, 닉네임 보내주기
  const onClickOKBtnHandler = () => {
    const nickname = getValues("nickname");
    dispatch(__detail({ age, gender, nickname }));
  };
  //닉네임 중복확인
  const onClickCheckBtnHandler = (e) => {
    e.preventDefault();
    const value = getValues("nickname");
    dispatch(__checkNickname(value));
  };

  const images = [
    {
      url: "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/2TKUKXYMQF7ASZEUJLG7L4GM4I.jpg",
      title: "Male",
      width: "50%",
    },
    {
      url: "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/2TKUKXYMQF7ASZEUJLG7L4GM4I.jpg",
      title: "Female",
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
    <Container>
      <SignUpHeader>
        <h1>Mood catcher</h1>
      </SignUpHeader>
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
                  <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
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
            <form>
              <div>
                <TextBox>
                  <h4>Nickname</h4>
                  {errors.nickname && <p>{errors.nickname.message}</p>}
                </TextBox>
                <input
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
              </div>
              <ConfirmBtn onClick={(e) => onClickCheckBtnHandler(e)}>
                중복확인
              </ConfirmBtn>
            </form>
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
            <OkBtn onClick={() => onClickOKBtnHandler()}>OK</OkBtn>
          </>
        )}
      </div>
    </Container>
  );
};

const Container = styleds.div`
  width: 428px;
  height: 926px;
  div{
    text-align: center;
  }
  
  .label {
    margin-top: 80px;
  }
  .age {
    width: 300px;
    margin-top: 100px;
  }
  
  form {
    display : flex;
  }

  input {
    background-color: #e6e5ea;
    border: 0px;
    border-radius: 7px;
    height: 40px;
    width: 250px;
  }

`;
const TextBox = styleds.div`
  display: flex;

  h4 {
    color: #2d273f;
  }

  p {
    color: #c60000;
    font-size: 10px;
    margin-top: 30px;
    margin-left: 20px;
  }
`;
const ConfirmBtn = styleds.button`
  background-color: #7b758b;
  color : white;
  border: 0px;
  border-radius: 10px;
  width: 150px;
  height: 45px;
  margin: 60px 10px;
`;
const SignUpHeader = styleds.div`
  width: 428px;
  height: 60px;
  background-color: #a396c9;
  color: white;
`;
const AgeBox = styleds.div`
  width: 326px;
  height: 50px;
  background-color: #A396C9;
  color: white;
`;
const OkBtn = styleds.button`
  background-color: #7b758b;
  color: white;
  border: 0px;
  border-radius: 10px;
  width: 150px;
  height: 40px;
  margin: 100px auto;
`;

export default SignupGenderAge;
