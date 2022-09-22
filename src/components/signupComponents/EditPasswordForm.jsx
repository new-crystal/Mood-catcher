import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { __postEmailNum, __putPassword } from "../../redux/async/signup";
import { changeEmail } from "../../redux/modules/signUpSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPw, setNewPw] = useState(false);

  const checkEmail = useSelector((state) => state.signup.checkEmail);
  const sendEmailNum = useSelector((state) => state.signup.sendEmailNum);

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

  //인증번호 비교하기
  const onClickOKBtn = () => {
    const emailNum = getValues("sendEmail");
    // const sendEmail = bcrypt.hash;
    if (emailNum === sendEmailNum) {
      setNewPw(true);
    } else {
      Swal.fire("에러", "이메일 인증번호를 확인해주세요!", "error");
      setError(
        "sendEmail",
        { message: "이메일 인증번호를 확인해주세요" },
        { shouldFocus: true }
      );
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
      const secretKey = "12345678901234567890123456789012";
      const iv = "abcdefghijklmnop";
      const cipher = crypto.AES.encrypt(key, crypto.enc.Utf8.parse(secretKey), {
        iv: crypto.enc.Utf8.parse(iv),
        padding: crypto.pad.Pkcs7,
        mode: crypto.mode.CBC,
      });
      const pwpwpw = cipher.key.words[0];

      //비밀번호 값과 비밀번호 확인 값이 같을 때만
      if (data.password === data.confirmPw && data.sendEmail === sendEmailNum) {
        await new Promise((r) => setTimeout(r, 300));

        const password = pwpwpw.toString();
        const confirmPw = pwpwpw.toString();
        const email = getValues("email");

        dispatch(__putPassword({ email, password, confirmPw })).then(
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
      if (data.sendEmail !== sendEmailNum) {
        setError(
          "sendEmail",
          { message: "이메일 인증번호를 확인해주세요" },
          { shouldFocus: true }
        );
      }
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
                type="sendEmail"
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
  margin-top: 50px;
  margin-left: 30px;
  display: flex;
  align-items: baseline;
  justify-content: left;
  flex-direction: column;

  h1 {
    font-family: "Unna";
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 46px;
    color: #2d273f;
  }
  .email {
    width: 250px;
  }
  input {
    background-color: #fff;
    border: 0px;
    border-radius: 10px;
    height: 50px;
    width: 350px;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  h4 {
    margin-bottom: 5px;
    color: #2d273f;
    font-family: "Roboto";
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
const ConfirmBtn = styled.button`
  background: linear-gradient(78.32deg, #7b758b 41.41%, #ffffff 169.58%);
  border: 0px;
  width: 90px;
  height: 50px;
  color: white;
  border-radius: 10px;
  margin-left: 20px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
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
  margin: 40px auto 0 auto;
  cursor: pointer;
`;
export default EditPasswordForm;
