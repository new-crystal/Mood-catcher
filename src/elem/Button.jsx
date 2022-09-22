import React from "react";
import styled from "styled-components";

const Button = ({ theme, text, click, disabled }) => {
  return (
    <Btn theme={theme} onClick={click} disabled={disabled}>
      {text}
    </Btn>
  );
};

export default Button;

const Btn = styled.button`
  width: 327px;
  height: 56px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 130%;
  background-color: ${(props) =>
    props.theme === "dark" ? "#956C4A" : "#1E1919"};
  color: ${(props) =>
    props.theme === "dark" ? "var(--white)" : "var(--white)"};
  @media screen and (max-width: 350px) {
    width: 250px;
  }
`;
