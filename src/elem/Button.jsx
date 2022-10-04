import React from "react";
import styled from "styled-components";

const Button = ({ theme, text, click, disabled }) => {
  return (
    <Btn theme={theme} onClick={click} disabled={disabled}>
      <p>{text}</p>
    </Btn>
  );
};

export default Button;

const Btn = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 5px;
  border: 0px;
  font-size: 15px;
  font-family: "Noto Sans KR", sans-serif;
  line-height: 130%;
  font-weight: bold;
  background-color: ${(props) =>
    props.theme === "dark" ? "#a8a6af" : "#a8a6af"};
  color: white;
`;
