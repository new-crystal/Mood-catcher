import React, { Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../shared/style/TestHeader.css";
import { getCookie } from "../shared/cookie";
import jwt_decode from "jwt-decode";

const home = "/images/home.png";
const search = "/images/search.png";
const add_circle = "/images/add_circle.png";
const star = "/images/star.png";
const person = "/images/person.png";

const NavigationBar = (props) => {
  const navigate = useNavigate();
  const token = getCookie("token");
  const payload = jwt_decode(token);

  return (
    <Fragment>
      <NavBox>
        <SearchWrap
          onClick={() => {
            navigate("/");
          }}
        >
          <ImageWrap style={{ backgroundImage: `url(${home})` }} />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate("/search");
          }}
        >
          <ImageWrap style={{ backgroundImage: `url(${search})` }} />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate("/upload");
          }}
        >
          <ImageWrap style={{ backgroundImage: `url(${add_circle})` }} />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate(`/like/${payload.userId}`);
          }}
        >
          <ImageWrap style={{ backgroundImage: `url(${star})` }} />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate(`/mypage/${payload.userId}`);
          }}
        >
          <ImageWrap style={{ backgroundImage: `url(${person})` }} />
        </SearchWrap>
      </NavBox>
    </Fragment>
  );
};

export default NavigationBar;

const NavBox = styled.div`
  display: flex;
  position: fixed;
  margin: 0 auto;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  max-width: 428px;
  background-color: #ffffff;
  font-family: "GmarketSansM";
  justify-content: space-around;
  z-index: 10;
  box-shadow: 0px -7px 7px #877f92;
`;

const SearchWrap = styled.div`
  text-align: center;
  width: 100px;
  cursor: pointer;
`;

const ImageWrap = styled.div`
  margin: 0 auto;
  margin-top: 13px;
  width: 22px;
  height: 22px;
  background-size: cover;
`;
