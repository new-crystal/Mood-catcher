import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { __checkEmail, __signUp } from "../../redux/modules/signUpSlice";
import { useState } from "react";
import crypto from "crypto-js";
//import { useNavigate } from "react-router-dom";

const SigupForm = () => {
  const [confirm, setConfirm] = useState(false);
  //const checkEmail = useSelector((state) => state.signUp.checkEmail);
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    setError,
    getValues,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm();

  //이메일 중복확인 눌렀을 때
  const onClickCheckBtnHandler = () => {
    const email = getValues("email");
    dispatch(__checkEmail(email));
    setConfirm(true);
  };

  //회원가입 버튼을 눌렀을 때
  const onValid = async (data) => {
    if (!confirm) {
      setError(
        "email",
        { message: "이메일 중복확인을 해주세요" },
        { shouldFocus: true }
      );
    }

    const key = getValues("password");
    const secretKey = "12345678901234567890123456789012";
    const iv = "abcdefghijklmnop";
    const cipher = crypto.AES.encrypt(key, crypto.enc.Utf8.parse(secretKey), {
      iv: crypto.enc.Utf8.parse(iv),
      padding: crypto.pad.Pkcs7,
      mode: crypto.mode.CBC,
    });
    const pwpwpw = cipher.key.words[0];

    if (data.password === data.pwConfirm) {
      await new Promise((r) => setTimeout(r, 300));
      //navigate("/");
      const email = getValues("email");
      const password = pwpwpw;
      const confirmPw = pwpwpw;
      console.log(email, password, confirmPw);
      dispatch(__signUp({ email, password, confirmPw }));
    } else {
      setError(
        "pwConfirm",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
  };

  return (
    <Container onSubmit={handleSubmit(onValid)}>
      <SignUpHeader>
        <h1>Mood catcher</h1>
      </SignUpHeader>
      <SignUpBox>
        <h1>Sign Up</h1>
      </SignUpBox>
      <div>
        <TextBox>
          <h4>이메일</h4>
          {errors.email && <p>{errors.email.message}</p>}
        </TextBox>
        <input
          className="email"
          name="email"
          type="email"
          aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
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
        <ConfirmBtn type="button" onClick={() => onClickCheckBtnHandler()}>
          중복확인
        </ConfirmBtn>
      </div>
      <div>
        <TextBox>
          <h4>비밀번호</h4>
          {errors.password && <p>{errors.password.message}</p>}
        </TextBox>
        <input
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
        <h6>영문, 숫자, 특수문자(!@#$%^&*) 조합으로 8자 이상 20자 이하</h6>
      </div>
      <div>
        <TextBox>
          <h4>비밀번호 확인</h4>
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
    </Container>
  );
};

const Container = styled.form`
  width: 428px;
  height: 926px;

  .email {
    width: 270px;
  }

  input {
    background-color: #e6e5ea;
    border: 0px;
    border-radius: 7px;
    height: 40px;
    width: 387px;
  }
`;

const ConfirmBtn = styled.button`
  background-color: #7b758b;
  border: 0px;
  width: 110px;
  height: 40px;
  color: white;
  border-radius: 7px;
  margin-left: 20px;
`;

const SignUpHeader = styled.div`
  width: 428px;
  height: 60px;
  background-color: #a396c9;
  color: white;
`;
const SignUpBox = styled.div`
  border-bottom: 2px solid #c4c2ca;
  width: 200px;
  color: #2d273f;
`;
const TextBox = styled.div`
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
const OkBtn = styled.button`
  background-color: #7b758b;
  color: white;
  border: 0px;
  border-radius: 10px;
  width: 150px;
  height: 40px;
  margin: 100px auto;
`;

export default SigupForm;
