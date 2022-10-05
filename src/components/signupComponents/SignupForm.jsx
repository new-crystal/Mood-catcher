import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";

//통신
import {
  __checkEmail,
  __postAuthNum,
  __postEmail,
  __signUp,
} from "../../redux/async/signup";
import { changeEmail, changeAuthNum } from "../../redux/modules/signUpSlice";

const SigupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkEmail = useSelector((state) => state.signup.checkEmail); //이메일 중복확인
  const authNum = useSelector((state) => state.signup.checkAuthNum); //인증번호 확인
  const [sendEmail, setSendEmail] = useState(false);

  //로그인 한 경우
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/main");
    }
  }, []);

  //email 중복확인 성공했을 때 메시지 띄워주기
  useEffect(() => {
    if (checkEmail === true) {
      setError("email", { message: "사용 가능한 이메일입니다." });
    }
    if (authNum == true) {
      setError("sendEmail", { message: "인증번호가 일치합니다." });
    }
  }, [checkEmail, authNum]);

  //react-hook-form에서 불러오기
  const {
    register,
    setError,
    getValues,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //이메일이 바뀐 값 디스패치하기
  const onChangeEmail = () => {
    dispatch(changeEmail());
  };

  //인증번호가 바뀐 값 디스패치하기
  const onChangeSendEmail = () => {
    dispatch(changeAuthNum());
  };

  //이메일 중복확인 눌렀을 때
  const onClickCheckBtnHandler = async () => {
    const email = await getValues("email");
    if (email !== "" && errors.email === undefined) {
      dispatch(__checkEmail(email));
      if (checkEmail === false) {
        setError(
          "email",
          { message: "중복된 이메일입니다." },
          { shouldFocus: true }
        );
      }
    } else {
      setError(
        "email",
        { message: "이메일을 확인하고 중복확인을 해주세요." },
        { shouldFocus: true }
      );
    }
  };

  //이메일 인증번호 발송하기
  const onClickSendEmail = () => {
    const email = getValues("email");
    if (!checkEmail) {
      Swal.fire("에러", "이메일 중복확인을 해주세요!", "error");
      setSendEmail(false);
    }
    if (checkEmail) {
      Swal.fire({
        icon: "success",
        title: "이메일로 인증번호가 발송되었습니다!",
        showConfirmButton: false,
        timer: 1500,
      });
      setSendEmail(true);
      dispatch(__postEmail({ email }));
    }
  };

  //인증번호 확인하기
  const onClickSendAuthNum = async () => {
    const authEmailNum = await getValues("sendEmail");
    if (errors.sendEmail !== undefined) {
      setError(
        "sendEmail",
        { message: "인증번호를 확인해주세요" },
        { shouldFocus: true }
      );
    }
    if (authEmailNum !== "" && errors.sendEmail === undefined) {
      const email = getValues("email");
      dispatch(__postAuthNum({ email, authNum: authEmailNum }));
      if (authNum === false) {
        setError(
          "sendEmail",
          { message: "인증번호를 확인해주세요" },
          { shouldFocus: true }
        );
      }
    }
  };

  //회원가입 버튼을 눌렀을 때
  const onValid = async (data) => {
    //이메일 중복확인을 안 했을 때 돌려보내기
    if (checkEmail === false) {
      setError(
        "email",
        { message: "이메일 중복확인을 해주세요" },
        { shouldFocus: true }
      );
    } else {
      ///비밀번호 암호화
      const salt = bcrypt.genSaltSync(10);
      const key = getValues("password").toString();
      const ciphertext = bcrypt.hashSync(key, "$2a$10$CwTycUXWue0Thq9StjUM0u");

      //비밀번호 값과 비밀번호 확인 값이 같을 때만
      if (data.password === data.confirmPw && authNum === true) {
        await new Promise((r) => setTimeout(r, 300));
        const password = ciphertext;
        const confirmPw = ciphertext;
        const email = getValues("email");
        const authNum = getValues("sendEmail");

        dispatch(__signUp({ email, authNum, password, confirmPw })).then(
          navigate("/login")
        );
      }
      if (data.password !== data.confirmPw) {
        setError(
          "confirmPw",
          { message: "비밀번호가 일치하지 않습니다." },
          { shouldFocus: true }
        );
      }
      if (!authNum) {
        setError(
          "sendEmail",
          { message: "이메일 인증번호를 확인해주세요" },
          { shouldFocus: true }
        );
      }
    }
  };

  return (
    <SignUpWrap>
      <Container onSubmit={handleSubmit(onValid)}>
        <SignUpBox>
          <h1>Sign Up</h1>
        </SignUpBox>
        <FormCantainer>
          <div>
            <TextBox>
              <h4>이메일</h4>
              {errors.email !== undefined ? (
                errors.email.message === "사용 가능한 이메일입니다." ? (
                  <p style={{ color: "blue" }}>{errors.email.message}</p>
                ) : (
                  <p>{errors.email.message}</p>
                )
              ) : null}
            </TextBox>
            <input
              className="email"
              name="email"
              type="email"
              aria-invalid={
                !isDirty ? undefined : errors.email ? "true" : "false"
              }
              {...register("email", {
                onChange: () => onChangeEmail(),
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
            <ConfirmBtn type="button" onClick={() => onClickCheckBtnHandler()}>
              <p>중복확인</p>
            </ConfirmBtn>
          </div>
          <div>
            <PwTextBox>
              <h4>인증번호</h4>
              {errors.sendEmail !== undefined ? (
                errors.sendEmail.message === "인증번호가 일치합니다." ? (
                  <p style={{ color: "blue" }}>{errors.sendEmail.message}</p>
                ) : (
                  <p>{errors.sendEmail.message}</p>
                )
              ) : null}
            </PwTextBox>
            {!sendEmail ? (
              <SendEmailBtn type="button" onClick={() => onClickSendEmail()}>
                <p>인증번호 발송하기</p>
              </SendEmailBtn>
            ) : (
              <>
                <input
                  name="sendEmail"
                  className="email"
                  placeholder="이메일로 발송 된 인증번호를 입력해주세요"
                  aria-invalid={
                    !isDirty ? undefined : errors.sendEmail ? "true" : "false"
                  }
                  {...register("sendEmail", {
                    onChange: () => onChangeSendEmail(),
                    required: "인증번호는 필수 입력입니다.",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "인증번호를 숫자로만 작성해주세요",
                    },
                  })}
                />
                <ConfirmNumBtn
                  type="button"
                  onClick={() => onClickSendAuthNum()}
                >
                  <p>인증번호확인</p>
                </ConfirmNumBtn>
              </>
            )}
          </div>
          <div>
            <PwTextBox>
              <h4>비밀번호</h4>
              {errors.password && <p>{errors.password.message}</p>}
            </PwTextBox>
            <input
              name="password"
              type="password"
              placeholder="영문,숫자,특수문자 포함 8자 이상 20자 이하"
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
          <div>
            <PwTextBox>
              <h4>비밀번호 확인</h4>
              {errors.confirmPw && <p>{errors.confirmPw.message}</p>}
            </PwTextBox>
            <input
              name="confirmPw"
              type="password"
              {...register("confirmPw", {
                required: "비밀번호 확인을 해주세요",
              })}
            />
          </div>
        </FormCantainer>
        <OkBtn type="submit" disabled={isSubmitting}>
          가입하기
        </OkBtn>
        <LoginBox>
          <p>무드캐처의 캐처이신가요?</p>
          <LoginBtn type="button" onClick={() => navigate("/login")}>
            로그인
          </LoginBtn>
        </LoginBox>
      </Container>
    </SignUpWrap>
  );
};

const SignUpWrap = styled.div`
  display: flex;
  width: 100%;
  background-color: #ffffff;
  flex-direction: column;
  text-align: center;
`;

const Container = styled.form`
  margin: 0 auto;

  .email {
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

const FormCantainer = styled.div`
  display: flex;
  margin: 50px auto 0px;
  width: 300px;
  align-items: center;
  justify-content: left;
  align-items: baseline;
  flex-direction: column;
`;

const ConfirmBtn = styled.button`
  margin-left: 20px;
  border-radius: 5px;
  border: 0px;
  width: 90px;
  height: 40px;
  background: #a8a6af;
  font-family: "Noto Sans KR", sans-serif;
  color: white;
  cursor: default;
  p {
    margin: 0 auto;
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
  }
`;

const ConfirmNumBtn = styled.button`
  margin-left: 20px;
  border: 0px;
  border-radius: 5px;
  width: 90px;
  height: 40px;
  background: #a8a6af;
  color: white;
  cursor: default;
  p {
    margin: 0 auto;
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
  }
`;
const SendEmailBtn = styled.button`
  margin-top: 10px;
  border: 0px;
  border-radius: 5px;
  width: 300px;
  height: 50px;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 16px;
  background: #a8a6af;
  cursor: default;
  p {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
  }
`;

const SignUpBox = styled.div`
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
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  h4 {
    margin-top: 0px;
    margin-bottom: 0px;
    color: #2d273f;
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

const PwTextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  h4 {
    margin-top: 20px;
    margin-bottom: 7px;
    color: #2d273f;
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

const OkBtn = styled.button`
  margin-top: 20px;
  border: 0px;
  border-radius: 5px;
  width: 300px;
  height: 50px;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 16px;
  background: #a8a6af;
  cursor: default;
  p {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
  }
`;

const LoginBtn = styled.button`
  margin-bottom: 20px;
  border: 0px;
  border-radius: 5px;
  width: 300px;
  height: 50px;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 16px;
  background: #a8a6af;
  cursor: default;
  p {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
  }
`;

const LoginBox = styled.div`
  padding: 0px;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: black;
  p {
    margin-top: 20px;
    margin-bottom: 20px;
    color: black;
    text-decoration: none;
    font-weight: bold;
  }
`;
export default SigupForm;
