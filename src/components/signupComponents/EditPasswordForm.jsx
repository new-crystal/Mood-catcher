import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  __postAuthNum,
  __postEmailNum,
  __putPassword,
} from "../../redux/async/signup";
import { changeEmail } from "../../redux/modules/signUpSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";

const EditPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPw, setNewPw] = useState(false);
  const salt = bcrypt.genSaltSync(10);

  const checkEmail = useSelector((state) => state.signup.checkEmail);
  const authNum = useSelector((state) => state.signup.checkAuthNum);

  //react-hook-form에서 불러오기
  const {
    register,
    setError,
    getValues,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //이메일 인증번호 발송 버튼
  const onClickCheckBtnHandler = () => {
    if (errors.email === undefined) {
      const email = getValues("email");
      dispatch(__postEmailNum({ email }));
    } else {
      setError(
        "email",
        { message: "이메일을 확인해주세요" },
        { shouldFocus: true }
      );
    }
  };

  //인증번호 발송 성공!
  useEffect(() => {
    if (checkEmail) {
      setError("email", { message: "이메일 인증번호 발송에 성공했습니다" });
    }
  }, [checkEmail, authNum]);

  //이메일이 바뀐 값 디스패치하기
  const onChangeEmail = () => {
    dispatch(changeEmail());
  };

  //인증번호 발송하기
  const onClickOKBtn = () => {
    const key = getValues("sendEmail");
    const email = getValues("email");
    dispatch(__postAuthNum({ email, authNum: key }));
    if (!authNum) {
      setError(
        "sendEmail",
        { message: "인증번호를 확인해주세요" },
        { shouldFocus: true }
      );
      setNewPw(false);
    }
    if (authNum) {
      setNewPw(true);
    }
  };

  //비밀번호 제출할 때
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
      const key = getValues("password");

      const ciphertext = bcrypt.hashSync(key, "$2a$10$CwTycUXWue0Thq9StjUM0u");

      //비밀번호 값과 비밀번호 확인 값이 같을 때만
      if (data.password === data.confirmPw && newPw) {
        await new Promise((r) => setTimeout(r, 300));

        const password = ciphertext;
        const confirmPw = ciphertext;
        const email = getValues("email");
        const authNum = getValues("sendEmail");

        dispatch(__putPassword({ email, authNum, password, confirmPw })).then(
          navigate("/")
        );
      }
      if (data.password !== data.confirmPw) {
        setError(
          "confirmPw",
          { message: "비밀번호가 일치하지 않습니다." },
          { shouldFocus: true }
        );
      }
    }
  };

  return (
    <EditPwWrap>
      <Container onSubmit={handleSubmit(onValid)}>
        <SignUpBox>
          <h1>Edit PW</h1>
        </SignUpBox>
        <FormCantainer>
          {!newPw && (
            <>
              <div>
                <TextBox>
                  <h4>이메일</h4>
                  {errors.email !== undefined ? (
                    errors.email.message ===
                    "이메일 인증번호 발송에 성공했습니다" ? (
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
                  placeholder="가입하신 이메일을 입력해주세요"
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
                <ConfirmBtn
                  type="button"
                  onClick={() => onClickCheckBtnHandler()}
                >
                  <p>확인</p>
                </ConfirmBtn>
              </div>
              <div>
                <PwTextBox>
                  <h4>인증번호</h4>
                  {errors.sendEmail && <p>{errors.sendEmail.message}</p>}
                </PwTextBox>
                <input
                  name="sendEmail"
                  placeholder="이메일로 발송 된 인증번호를 입력해주세요"
                  aria-invalid={
                    !isDirty ? undefined : errors.sendEmail ? "true" : "false"
                  }
                  {...register("sendEmail", {
                    required: "인증번호는 필수 입력입니다.",
                  })}
                />
              </div>
              <OkBtn type="button" onClick={onClickOKBtn}>
                OK
              </OkBtn>
            </>
          )}
          {newPw && (
            <>
              <div>
                <TextBox>
                  <h4>새로운 비밀번호</h4>
                  {errors.password && <p>{errors.password.message}</p>}
                </TextBox>
                <input
                  className="new"
                  name="password"
                  type="password"
                  placeholder="영문, 숫자, 특수문자(!@#$%^&*) 조합으로 8자 이상 20자 이하"
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
                  <h4>새로운 비밀번호 확인</h4>
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
              <OkBtn type="submit" disabled={isSubmitting}>
                완료
              </OkBtn>
            </>
          )}
        </FormCantainer>
      </Container>
    </EditPwWrap>
  );
};

const EditPwWrap = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Container = styled.form`
  margin: 0 auto;

  display: flex;
  align-items: baseline;
  justify-content: left;
  flex-direction: column;

  .email {
    width: 183px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1;
    background-color: #ffffff;
    border-bottom: 2px solid black;
  }
  input {
    height: 24px;
    width: 300px;
    padding-left: 5px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1;
    background-color: #ffffff;
    border-bottom: 2px solid black;
    :focus {
      outline: none;
    }
    ::placeholder {
      /* color: black; */
      font-size: 0.6em;
      font-weight: 400;
      opacity: 1; /* Firefox */
    }
  }
  input.new {
    height: 24px;
    width: 300px;
    padding-left: 5px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1;
    background-color: #ffffff;
    border-bottom: 2px solid black;
    margin-top: 10px;
    :focus {
      outline: none;
    }
    ::placeholder {
      /* color: black; */
      font-size: 0.6em;
      font-weight: 400;
      opacity: 1; /* Firefox */
    }
  }
`;

const FormCantainer = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: left;
  align-items: baseline;
  flex-direction: column;
  margin: 50px auto 0px;
`;

const SignUpBox = styled.div`
  border-bottom: 3px solid #fff;
  width: 211px;
  margin: 0 auto;
  color: #2d273f;
  text-align: center;
  display: flex;
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
    margin-bottom: 0px;
    color: #2d273f;
    /* font-family: "Roboto"; */
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
  p {
    color: #c60000;
    font-size: 10px;
    margin-left: 20px;
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

const ConfirmBtn = styled.button`
  /* background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%); */
  background: #a8a6af;
  border: 0px;
  width: 90px;
  height: 40px;
  color: white;
  border-radius: 5px;
  /* margin: 5px auto; */
  margin-left: 20px;
  /* font-family: "Roboto"; */
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  /* font-weight: 700; */
  cursor: default;
  p {
    color: white;
    /* font-family: "Roboto"; */
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
    margin: 0 auto;
  }
`;

const OkBtn = styled.button`
  /* background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%); */
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
`;
export default EditPasswordForm;
