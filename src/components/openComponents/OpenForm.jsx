import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//통신
import { __getOpen } from "../../redux/async/signup";

//이미지
import openCloset from "../../image/6565656.png";

const OpenForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startMsg = useSelector((state) => state.signup.startMsg);

  //오픈 메시지 받아오기
  useEffect(() => {
    dispatch(__getOpen());
  }, []);

  //2초 뒤에 메인으로 보내기
  useEffect(() => {
    setTimeout(() => {
      navigate("/main");
    }, 3000);
  }, []);

  return (
    <Fragment>
      <OpenBox>
        <OpenImg src={`${openCloset}`} alt="open" />
        <TextBox>
          <h4>{startMsg}</h4>
        </TextBox>
      </OpenBox>
    </Fragment>
  );
};

const OpenBox = styled.div`
  position: relative;
  width: auto;
`;

const OpenImg = styled.img`
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: none;
`;

const TextBox = styled.div`
  position: absolute;
  top: -3%;
  left: 10%;
  display: flex;
  margin: 0px auto;
  width: 370px;
  align-items: center;
  justify-content: center;
  h4 {
    position: relative;
    top: 190px;
    margin-top: 0px;
    color: #dfd9e3;
    font-weight: 700;
    font-size: 20px;
  }
`;

export default React.memo(OpenForm);
