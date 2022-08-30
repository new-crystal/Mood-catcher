import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { __login } from "../../redux/modules/loginSlice";

const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    dispatch(__login);
  };

  return (
    <Container>
      <SignUpHeader>
        <h1>Mood catcher</h1>
      </SignUpHeader>
      <LogInBox>
        <h1>Log In</h1>
      </LogInBox>
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
          {" "}
          로그인{" "}
        </LogInBtn>
      </LogBox>
      <BtnBox>
        <p>무드캐쳐가 처음이신가요?</p>
        <LogBtn kakao type="button">
          {" "}
          카카오로 로그인{" "}
        </LogBtn>
        <LogBtn type="button"> 이메일로 회원가입 </LogBtn>
      </BtnBox>
    </Container>
  );
};

const Container = styled.div`
  width: 428px;
  height: 926px;

  input {
    background-color: #e6e5ea;
    border: 0px;
    border-radius: 20px;
    height: 50px;
    width: 280px;
    margin: 10px;
  }
`;

const ErrorMsg = styled.p`
  color: #c60000;
  font-size: 10px;
  margin-left: 30px;
`;

const SignUpHeader = styled.div`
  width: 428px;
  height: 60px;
  background-color: #a396c9;
  color: white;
`;
const LogInBox = styled.div`
  border-bottom: 2px solid #c4c2ca;
  width: 200px;
  color: #2d273f;
`;

const LogInBtn = styled.button`
  background-color: #7b758b;
  color: white;
  width: 120px;
  height: 113px;
  margin-top: 15px;
  margin-right: 30px;
  border: 0px;
  border-radius: 20px;
`;

const LogBox = styled.form`
  display: flex;
  margin-top: 50px;
`;

const BtnBox = styled.div`
  width: 480px;
  height: 173px;
  text-align: center;
`;

const LogBtn = styled.button`
  width: 280px;
  height: 50px;
  border-radius: 20px;
  border: 0px;
  margin: 10px auto;
  background: ${(props) => (props.kakao ? "#F4E769" : "#C4C2CA")};
`;

export default LoginForm;
