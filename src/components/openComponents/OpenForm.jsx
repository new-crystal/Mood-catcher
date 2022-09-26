import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import openCloset from "../../image/6565656.png";
import { __getOpen } from "../../redux/async/signup";
import { getCookie, setCookie } from "../../shared/cookie";

const OpenForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startMsg = useSelector((state) => state.signup.startMsg);

  useEffect(() => {
    dispatch(__getOpen());
  }, []);

  //url에 있는 exist와 토큰 받아오기
  useEffect(() => {
    //url에 exist와 token이 있는 경우
    if (window.location.search !== "") {
      const existList = window.location.href.split("=")[1];
      const exist = existList.split("&")[0];
      const token = getCookie("token");

      //카카오 로그인->토큰이 없는 경우
      if (token === undefined) {
        setCookie("token", window.location.href.split("token=")[1]);
      }
      if (exist === "true") {
        setTimeout(() => {
          navigate("/main");
        }, 3000);
      }
      if (exist === "false") {
        setCookie("token", window.location.href.split("token=")[1]);
        setTimeout(() => {
          navigate("/login/detail");
        }, 3000);
      }
    }
  }, []);

  useEffect(() => {
    if (window.location.search === "") {
      const token = getCookie("token");
      if (token !== undefined) {
        setTimeout(() => {
          navigate("/main");
        }, 3000);
      }
      if (token === undefined) {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    }
  }, []);

  return (
    <Fragment>
      <OpenBox>
        <TextBox>
          <p>{startMsg}</p>
        </TextBox>
      </OpenBox>
    </Fragment>
  );
};

const OpenBox = styled.div`
  width: 428px;
  height: 926px;
  background-position: center;
  background-size: cover;
  background-image: url(${openCloset});
  text-align: center;
  align-items: center;
  justify-content: center;

  p {
    margin-top: 0px;
    font-family: "Unna";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    color: white;
    position: relative;
    top: 190px;
  }
`;

const TextBox = styled.div`
  width: 370px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px auto;
`;

export default OpenForm;
