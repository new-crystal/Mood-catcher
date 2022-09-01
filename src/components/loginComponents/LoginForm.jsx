import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { __login, __socialLogin } from "../../redux/modules/loginSlice";
import { useNavigate } from "react-router-dom";
import crypto from "crypto-js";
import { Fragment } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    const secretKey = "12345678901234567890123456789012";
    const iv = "abcdefghijklmnop";
    const cipher = crypto.AES.encrypt(key, crypto.enc.Utf8.parse(secretKey), {
      iv: crypto.enc.Utf8.parse(iv),
      padding: crypto.pad.Pkcs7,
      mode: crypto.mode.CBC,
    });
    const pwpwpw = cipher.key.words[0];

    const email = getValues("email");
    const password = toString(pwpwpw);

    dispatch(__login({ email, password })).then(navigate("/login/detail"));
  };
  //소셜로그인 버튼
  const onClickKakao = () => {
    dispatch(__socialLogin());
  };

  return (
    <Fragment>
      <Container>
        <JustifyAlign>
          <UploadText>Log In</UploadText>
        </JustifyAlign>
        <LogBox onSubmit={handleSubmit(onSubmit)}>
          <div>
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
            {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
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
            {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
          </div>
          <LogInBtn type="submit" disabled={isSubmitting}>
            로그인
          </LogInBtn>
        </LogBox>
        <BtnBox>
          <p>무드캐쳐가 처음이신가요?</p>
          <LogBtn kakao>
            <a href="http://3.34.190.2/api/auth/kakao">카카오 로그인</a>
          </LogBtn>
          <LogBtn type="button" onClick={() => navigate("/signup")}>
            <p>이메일로 회원가입</p>
          </LogBtn>
        </BtnBox>
      </Container>
    </Fragment>
  );
};

const Container = styled.div`
  background-color: royalblue;
  width: 428px;
  height: 966px;
`;

const JustifyAlign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: yellowgreen;
`;

const UploadText = styled.span`
  margin: 205px auto 0;
  font-size: 60px;
  font-family: "Unna";
`;

const ErrorMsg = styled.p`
  color: #c60000;
  font-size: 10px;
  /* margin-left: 30px; */
`;

const LogInBtn = styled.button`
  background-color: #7b758b;
  color: white;
  width: 86px;
  height: 110px;
  margin-top: 15px;
  margin-right: 30px;
  border: 0px;
  border-radius: 20px;
  cursor: pointer;
`;

const LogBox = styled.form`
  display: flex;
  margin-top: 50px;
  input {
    background-color: #e6e5ea;
    border: 0px;
    border-radius: 20px;
    height: 50px;
    width: 280px;
    margin: 10px;
  }
`;

const BtnBox = styled.div`
  width: 428px;
  height: 173px;
  text-align: center;
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

export default LoginForm;
