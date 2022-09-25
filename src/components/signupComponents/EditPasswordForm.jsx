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
import Swal from "sweetalert2";
import crypto from "crypto-js";
import CryptoJS from "crypto-js";
import { getCookie } from "../../shared/cookie";
import bcrypt from "bcryptjs";

const EditPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPw, setNewPw] = useState(false);
  const salt = bcrypt.genSaltSync(10);

  const checkEmail = useSelector((state) => state.signup.checkEmail);
  const sendEmailNum = useSelector((state) => state.signup.sendEmailNum);
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
  }, [checkEmail]);

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
      // if (data.sendEmail !== sendEmailNum) {
      //   setError(
      //     "sendEmail",
      //     { message: "이메일 인증번호를 확인해주세요" },
      //     { shouldFocus: true }
      //   );
      // }
    }
  };

  return (
    <>
      <Container onSubmit={handleSubmit(onValid)}>
        <h1>비밀번호 변경하기</h1>
        {!newPw ? (
          <>
            <div>
              <TextBox>
                <h4>이메일</h4>
                {errors.email && <p>{errors.email.message}</p>}
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
                확인
              </ConfirmBtn>
            </div>
            <div>
              <TextBox>
                <h4>인증번호</h4>
                {errors.sendEmail && <p>{errors.sendEmail.message}</p>}
              </TextBox>
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
        ) : (
          <>
            <div>
              <TextBox>
                <h4>새로운 비밀번호</h4>
                {errors.password && <p>{errors.password.message}</p>}
              </TextBox>
              <input
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
              <TextBox>
                <h4>새로운 비밀번호 확인</h4>
                {errors.confirmPw && <p>{errors.confirmPw.message}</p>}
              </TextBox>
              <input
                name="confirmPw"
                type="password"
                {...register("confirmPw", {
                  required: "비밀번호 확인을 해주세요",
                })}
              />
            </div>
            <OkBtn type="submit" disabled={isSubmitting}>
              OK
            </OkBtn>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.form`
  margin-top: 3.125rem;
  margin-left: 1.875rem;
  display: flex;
  align-items: baseline;
  justify-content: left;
  flex-direction: column;

  h1 {
    font-family: "Unna";
    font-style: normal;
    font-weight: 700;
    font-size: 2.188rem;
    line-height: 2.875rem;
    color: #2d273f;
  }
  .email {
    width: 15.625rem;
  }
  input {
    background-color: #fff;
    border: 0px;
    border-radius: 0.625rem;
    height: 3.125rem;
    width: 21.875rem;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  h4 {
    margin-bottom: 0.313rem;
    color: #2d273f;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 1.25rem;
  }
  p {
    color: #c60000;
    font-size: 0.625rem;
    margin-left: 1.25rem;
  }
`;
const ConfirmBtn = styled.button`
  background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
  border: 0px;
  width: 5.625rem;
  height: 3.125rem;
  color: white;
  border-radius: 10px;
  margin-left: 1.25rem;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
`;

const OkBtn = styled.button`
  background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
  color: white;
  font-family: "Unna";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  border: 0px;
  border-radius: 10px;
  width: 150px;
  height: 40px;
  margin: 170px auto 0 auto;
  cursor: pointer;
`;
export default EditPasswordForm;
