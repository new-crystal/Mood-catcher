import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  __checkEmail,
  __signUp,
  changeEmail,
} from "../../redux/modules/signUpSlice";
import { useState } from "react";
import crypto from "crypto-js";
import { useNavigate } from "react-router-dom";

const SigupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkEmail = useSelector((state) => state.signup.checkEmail);

  //react-hook-form에서 불러오기
  const {
    register,
    setError,
    getValues,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm();

  //이메일 인풋 값 받아오기
  const email = getValues("email");

  //이메일 중복확인 눌렀을 때
  const onClickCheckBtnHandler = () => {
    //이메일을 빈값에서 중복확인을 눌렀을 경우
    if (email !== "") {
      dispatch(__checkEmail(email));
    } else {
      setError(
        "email",
        { message: "이메일을 입력 후 중복확인을 눌러주세요" },
        { shouldFocus: true }
      );
    }
  };

  //중복확인 후 이메일을 수정했을 때
  const onChangeEmail = () => {
    dispatch(changeEmail());
  };

  //회원가입 버튼을 눌렀을 때
  const onValid = async (data) => {
    //이메일 중복확인을 안 했을 때 돌려보내기
    if (checkEmail) {
      setError(
        "email",
        { message: "이메일 중복확인을 해주세요" },
        { shouldFocus: true }
      );
    } else {
      ///비밀번호 암호화
      const key = getValues("password");
      const secretKey = "12345678901234567890123456789012";
      const iv = "abcdefghijklmnop";
      const cipher = crypto.AES.encrypt(key, crypto.enc.Utf8.parse(secretKey), {
        iv: crypto.enc.Utf8.parse(iv),
        padding: crypto.pad.Pkcs7,
        mode: crypto.mode.CBC,
      });
      const pwpwpw = cipher.key.words[0];

      //비밀번호 값과 비밀번호 확인 값이 같을 때만
      if (data.password === data.confirmPw) {
        await new Promise((r) => setTimeout(r, 300));
        navigate("/login");

        const password = toString(pwpwpw);
        const confirmPw = toString(pwpwpw);

        dispatch(__signUp({ email, password, confirmPw }));
      } else {
        setError(
          "confirmPw",
          { message: "비밀번호가 일치하지 않습니다." },
          { shouldFocus: true }
        );
      }
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
          onChange={onChangeEmail}
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
    background-color: #e6e5ea;
  }
`;

const CheckMail = styled.div`
  border-radius: 7px;
  height: 40px;
  width: 387px;
`;

const ConfirmBtn = styled.button`
  background-color: #7b758b;
  border: 0px;
  width: 110px;
  height: 40px;
  color: white;
  border-radius: 7px;
  margin-left: 20px;
  cursor: pointer;
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
  cursor: pointer;
`;

export default SigupForm;
