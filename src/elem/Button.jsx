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
  width: 280px;
  height: 50px;
  border-radius: 20px;
  border: 0px;
  font-size: 20px;
  /* margin-top: -100px; */
  font-family: "Roboto";
  line-height: 130%;
  font-weight: bold;
  background-color: ${(props) =>
    props.theme === "dark" ? "#C4C2CA" : "#1E1919"};
  color: #2d273f;
  @media screen and (max-width: 350px) {
    width: 250px;
  }
`;
