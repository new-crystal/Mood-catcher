import React, { Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../shared/style/TestHeader.css";

const Back = "./images/Back2.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className={"header"}>
        <HeaderBox style={{ marginTop: "0" }}>
          <GoBack
            style={{ backgroundImage: `url(${Back})` }}
            onClick={() => {
              navigate(-1);
            }}
          ></GoBack>
          <HeaderLogo
            style={{ top: "12px" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <span>Mood catcher</span>
          </HeaderLogo>
        </HeaderBox>
      </div>
    </Fragment>
  );
};

export default Header;

const HeaderBox = styled.div`
  width: 428px;
  z-index: 10;
  background-color: #a396c9;
`;

const GoBack = styled.div`
  background-color: green;
  display: inline-block;
  width: 40px;
  height: 40px;
  background-size: cover;
  margin: 10px 0 0 12px;
  cursor: pointer;
`;

const HeaderLogo = styled.div`
  background-color: yellow;
  font-family: "GmarketSansM";
  position: absolute;
  top: 12px;
  left: 50%;
  margin-left: -160px;
  margin-top: 2px;
  font-size: 30px;
  color: #333333;
  font-weight: bold;
  cursor: pointer;
`;
