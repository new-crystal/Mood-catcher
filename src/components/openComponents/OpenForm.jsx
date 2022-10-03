import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import openCloset from "../../image/6565656.png";
import { __getOpen } from "../../redux/async/signup";

const OpenForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startMsg = useSelector((state) => state.signup.startMsg);

  //오픈 메시지 받아오기
  useEffect(() => {
    dispatch(__getOpen());
  }, []);

  useEffect(() => {
    if (window.location.search === "") {
      const token = localStorage.getItem("token");
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
          <h4>{startMsg}</h4>
        </TextBox>
      </OpenBox>
    </Fragment>
  );
};

const OpenBox = styled.div`
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-image: url(${openCloset});
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: none;

  h4 {
    margin-top: 0px;
    color: #dfd9e3;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
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
