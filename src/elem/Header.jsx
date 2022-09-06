import React, { Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// 따로 shared에 있는 스타일을 사용합니다.
import "../shared/style/TestHeader.css";

const Back = "/images/Back2.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* position은 fixed이며 z-index값을 높게 줍니다. */}
      <div className={"header"}>
        {/* marginTop을 0으로 줘서 제일 위에 붙을 수 있게 합니다. */}
        <HeaderBox style={{ marginTop: "0" }}>
          {/* 뒤로가기 이미지와 뒤로가기 기능 */}
          <GoBack
            style={{ backgroundImage: `url(${Back})` }}
            onClick={() => {
              navigate(-1);
            }}
          ></GoBack>
          {/* 로고는 span을 이용해 그냥 텍스트로 처리하고
          누르면 main으로 갈 수 있게 합니다. */}
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
  /* background: linear-gradient(#a396c9, white); */
  background: #a396c9;
`;

const GoBack = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-size: cover;
  margin: 10px 0 0 12px;
  cursor: pointer;
`;

const HeaderLogo = styled.div`
  font-family: "Unna";
  position: absolute;
  top: 12px;
  left: 50%;
  margin-left: -160px;
  margin-top: 2px;
  font-size: 30px;
  color: #333333;
  cursor: pointer;
`;
