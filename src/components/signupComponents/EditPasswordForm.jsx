import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";

//통신
import {
  __postAuthNum,
  __postEmailNum,
  __putPassword,
} from "../../redux/async/signup";
import { changeEmail } from "../../redux/modules/signUpSlice";

const EditPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkEmail = useSelector((state) => state.signup.checkEmail); //이메일 중복체크/인증번호전송
  const authNum = useSelector((state) => state.signup.checkAuthNum); //인증번호 확인
  const [newPw, setNewPw] = useState(false);
  const salt = bcrypt.genSaltSync(10);

  //인증번호 발송 성공!
  useEffect(() => {
    if (checkEmail) {
      setError("email", { message: "이메일 인증번호 발송에 성공했습니다" });
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

  //이메일이 바뀐 값 디스패치하기
  const onChangeEmail = () => {
    dispatch(changeEmail());
  };

  //인증번호 발송하기
  const onClickOKBtn = () => {
    const key = getValues("sendEmail");
    const email = getValues("email");
    if (
      errors.email === undefined &&
      errors.sendEmail === undefined &&
      authNum
    ) {
      dispatch(__postAuthNum({ email, authNum: key }));
    }

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
          navigate("/main")
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
  display: flex;
  width: 100%;
  background-color: #ffffff;
  flex-direction: column;
  text-align: center;
`;

const Container = styled.form`
  display: flex;
  margin: 0 auto;
  align-items: baseline;
  justify-content: left;
  flex-direction: column;

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
  input.new {
    margin-top: 10px;
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

const ConfirmBtn = styled.button`
  margin-left: 20px;
  border-radius: 5px;
  border: 0px;
  width: 90px;
  height: 40px;
  background: #a8a6af;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  cursor: default;
  p {
    margin: 0 auto;
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
  }
`;

const OkBtn = styled.button`
  margin-top: 20px;
  border: 0px;
  border-radius: 5px;
  width: 300px;
  height: 50px;
  color: white;
  background: #a8a6af;
  font-family: "Noto Sans KR", sans-serif;
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
export default EditPasswordForm;
