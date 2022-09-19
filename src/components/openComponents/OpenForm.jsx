import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import openCloset from "../../image/6565656.png";
import { __getOpen } from "../../redux/async/signUpSlice";

const OpenForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startMsg = useSelector((state) => state.signup.startMsg);

  useEffect(() => {
    dispatch(__getOpen());
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, []);

  return (
    <OpenBox>
      <TextBox>
        <p>{startMsg}</p>
      </TextBox>
    </OpenBox>
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
