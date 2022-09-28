import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { __login } from "../../redux/async/login";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { getCookie } from "../../shared/cookie";
import bcrypt from "bcryptjs";
import PwaButton from "../../elem/PwaButton";
import LawForm from "./LawForm";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const salt = bcrypt.genSaltSync(10);
  const [law, setLaw] = useState(false);
  console.log(law);

  //로그인 한 경우
  useEffect(() => {
    const token = getCookie("token");
    if (token !== undefined) {
      navigate("/main");
    }
  }, []);

  //react hook form
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
        <LoginBox>
          <JustifyAlign>
            <UploadText>Log in</UploadText>
          </JustifyAlign>
          <LogBox onSubmit={handleSubmit(onSubmit)}>
            <div>
              {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
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
              {errors.password && (
                <ErrorMsg>{errors.password.message}</ErrorMsg>
              )}
            </div>
            <LogInBtn type="submit" disabled={isSubmitting}>
              로그인
            </LogInBtn>
          </LogBox>
          <BtnBox>
            <LogLawBox>
              <LogText>무드캐쳐가 처음이신가요?</LogText>
              <LawText onClick={() => setLaw(!law)}>이용약관</LawText>
              {law ? <LawForm setLaw={setLaw} /> : null}
            </LogLawBox>
            <LogBtn
              type="button"
              kakao
              onClick={() => {
                window.location.href =
                  "https://kauth.kakao.com/oauth/authorize?client_id=c1fcfdc01631a1e8f1f65dab8f0c5c6b&redirect_uri=http://moodcatchers.link/api/auth/kakao/callback&response_type=code";
              }}
            >
              <p>카카오 로그인</p>
            </LogBtn>
            <LogBtn type="button" onClick={() => navigate("/signup")}>
              <p>이메일로 회원가입</p>
            </LogBtn>
          </BtnBox>
          <BtnBox>
            <PwText>캐처님 비밀번호가 기억나지 않으신가요?</PwText>
            <LogBtn type="button" onClick={() => navigate("/edit_password")}>
              <p>비밀번호 찾기</p>
            </LogBtn>
            <div>
              <PwaButton />
            </div>
          </BtnBox>
        </LoginBox>
      </BackGround>
    </Fragment>
  );
};

const BackGround = styled.div`
  width: 183px;
  height: 444px;
  margin: 0px auto;
  background-position: center;
  background-size: cover;
  background-image: url("https://cdn.discordapp.com/attachments/1014169130045292625/1015495006418653225/a81f043032c5c11a.png");
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
  color: #c60000;
  font-size: 10px;
  margin-left: -130px;
  margin-bottom: 0px;
`;
const LogLawBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const LogInBtn = styled.button`
  background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  width: 200px;
  height: 50px;
  margin-top: 15px;
  margin-right: 10px;
  border: 0px;
  border-radius: 20px;
  cursor: pointer;
`;

const LogBox = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  input {
    background-color: #ffffff;
    border: 0px;
    border-radius: 15px;
    height: 50px;
    width: 280px;
    margin: 10px;
    padding-left: 10px;
    :focus {
      outline: none;
    }
  }
`;

const BtnBox = styled.div`
  width: 390px;
  height: 173px;
  text-align: center;
`;

const LogText = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #2d273f;
  margin-top: 40px;
`;
const LawText = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #2d273f;
  margin-top: 40px;
  margin-left: 10px;
  cursor: pointer;
`;
const LogBtn = styled.div`
  width: 280px;
  height: 50px;
  border-radius: 20px;
  border: 0px;
  margin: 10px auto;
  background: ${(props) => (props.kakao ? "#F4E769" : "#C4C2CA")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  & > a,
  p {
    color: #2d273f;
    font-family: "Roboto";
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
  }
`;

const PwText = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #2d273f;
  margin-top: 30px;
`;

export default LoginForm;
