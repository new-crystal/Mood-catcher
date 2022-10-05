import { useEffect, useState, useCallback, Fragment } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

//통신
import { __login } from "../../redux/async/login";
import PwaButton from "../../elem/PwaButton";

//컴포넌트
import LawForm from "./LawForm";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [law, setLaw] = useState(false);
  const [openAgree, setOpenAgree] = useState(false);
  const salt = bcrypt.genSaltSync(10); //암호화
  const onOpenAgreeHandler = useCallback(() => {
    setOpenAgree((value) => !value);
  }, []);

  //로그인 한 경우
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/main");
    }
  }, []);

  //react hook form을 이용한 유효성 검사
  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //로그인
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));

    //비밀번호 암호화
    const key = getValues("password");
    const ciphertext = bcrypt.hashSync(key, "$2a$10$CwTycUXWue0Thq9StjUM0u");

    const email = getValues("email");
    const password = ciphertext;

    dispatch(__login({ email, password }));
  };

  return (
    <Fragment>
      <BackGround>
        {openAgree && (
          <LawForm
            title="무드캐쳐 이용약관"
            confirmTitle="닫기"
            confirm={onOpenAgreeHandler}
            setLaw={setLaw}
          />
        )}
        <LoginBox>
          <JustifyAlign>
            <UploadText>Log in</UploadText>
          </JustifyAlign>
          <LogBox onSubmit={handleSubmit(onSubmit)}>
            <div>
              {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
              {errors.password && (
                <ErrorMsg>{errors.password.message}</ErrorMsg>
              )}
              <input
                placeholder="Email"
                name="email"
                type="email"
                aria-invalid={
                  !isDirty ? undefined : errors.email ? "true" : "false"
                }
                {...register("email", {
                  required: "이메일은 필수 입력입니다.",
                  minLength: {
                    value: 8,
                    message: "이메일을 8자 이상 작성해주세요",
                  },
                  maxLength: {
                    value: 30,
                    message: "이메일을 30자 이하로 작성해주세요",
                  },
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                    message: "이메일이 형식에 맞지 않습니다.",
                  },
                })}
              />
              <input
                placeholder="PW"
                name="password"
                type="password"
                aria-invalid={
                  !isDirty ? undefined : errors.password ? "true" : "false"
                }
                {...register("password", {
                  required: "비밀번호는 필수 입력입니다.",
                  minLength: {
                    value: 8,
                    message: "비밀번호를 8자 이상 작성해주세요",
                  },
                  maxLength: {
                    value: 20,
                    message: "비밀번호를 20자 이하로 작성해주세요",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                    message: "비밀번호가 형식에 맞지 않습니다.",
                  },
                })}
              />
            </div>
            <LogInBtn type="submit" disabled={isSubmitting}>
              <p>로그인</p>
            </LogInBtn>
            <KakaoLogBtn
              type="button"
              kakao
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.location.href =
                  "https://kauth.kakao.com/oauth/authorize?client_id=c1fcfdc01631a1e8f1f65dab8f0c5c6b&redirect_uri=http://moodcatchers.link/api/auth/kakao/callback&response_type=code";
              }}
            >
              <p>카카오 로그인</p>
            </KakaoLogBtn>
          </LogBox>
          <BtnWrap>
            <BtnBox>
              <LogLawBox>
                <LogText>무드캐쳐가 처음이신가요?</LogText>
              </LogLawBox>
              <LogBtn
                type="button"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/signup")}
              >
                <p>이메일로 회원가입</p>
              </LogBtn>
            </BtnBox>
            <BtnBox>
              <PwText>비밀번호가 기억나지 않으신가요?</PwText>
              <LogBtn
                type="button"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/edit_password")}
              >
                <p>비밀번호 찾기</p>
              </LogBtn>
            </BtnBox>
          </BtnWrap>
          <div>
            <PwaButton style={{ cursor: "pointer" }} />
          </div>
          <LawText style={{ cursor: "pointer" }} onClick={onOpenAgreeHandler}>
            이용약관
          </LawText>
        </LoginBox>
      </BackGround>
    </Fragment>
  );
};

const BtnWrap = styled.div`
  display: flex;
`;

const BackGround = styled.div`
  margin: 0px auto;
  width: 183px;
  height: 444px;
`;
const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const JustifyAlign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UploadText = styled.span`
  margin: 70px auto 0;
  font-size: 60px;
  font-family: "Unna";
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 69px;
  color: #2d273f;
`;

const ErrorMsg = styled.p`
  margin-bottom: 0px;
  color: #c60000;
  font-size: 10px;
`;
const LogLawBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const LogInBtn = styled.button`
  margin-top: 15px;
  border: 0px;
  border-radius: 5px;
  width: 300px;
  height: 50px;
  background: #a8a6af;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  cursor: pointer;
  color: white;
`;

const LogBox = styled.form`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  input {
    margin: 10px;
    padding-left: 10px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1;
    border-bottom: 2px solid black;
    height: 50px;
    width: 280px;
    background-color: #ffffff;
    :focus {
      outline: none;
    }
  }
`;

const BtnBox = styled.div`
  width: 155px;
  height: 100px;
  text-align: center;
`;

const LogText = styled.p`
  margin-top: 10px;
  margin-bottom: 0px;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #2d273f;
`;

const LawText = styled.p`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #2d273f;
  margin-top: 10px;
  margin-bottom: 0px;
  cursor: default;
`;

const KakaoLogBtn = styled.div`
  display: flex;
  margin: 10px auto;
  border-radius: 5px;
  border: 0px;
  width: 300px;
  height: 50px;
  background-color: #f4e769;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  & > a,
  p {
    color: #2d273f;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
  }
`;

const LogBtn = styled.div`
  display: flex;
  margin: 10px auto;
  border-radius: 5px;
  border: 1px solid gray;
  width: 140px;
  height: 50px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  & > a,
  p {
    color: #2d273f;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
  }
  :hover {
    background-color: #a8a6af;
    color: white;
  }
`;

const PwText = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #2d273f;
`;

export default LoginForm;
