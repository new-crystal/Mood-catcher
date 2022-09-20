import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
// 따로 shared에 있는 스타일을 사용합니다.
import "../shared/style/TestHeader.css";
import Notification from "../image/notification.png";
import NotificationTrue from "../image/notificationTrue.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getUser } from "../redux/modules/loginSlice";
import { getCookie } from "../shared/cookie";
import jwt_decode from "jwt-decode";
import { set } from "lodash";

const Back = "/images/Back2.png";
const arrow_back = "/images/arrow_back.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [headerText, setHeaderText] = useState("Mood Catcher");
  const [detail, setDetail] = useState(true);
  const [headerLine, setHeaderLine] = useState(false);
  const [main, setMain] = useState(true);

  const users = useSelector((state) => state.login.userStatus);

  useEffect(() => {
    const token = getCookie("token");
    if (token !== undefined) {
      const payload = jwt_decode(token);
      setIsLogin(true);
      dispatch(__getUser(payload.userId));
    }
  }, []);

  //헤더 글자 바꾸기
  useEffect(() => {
    if (window.location.pathname.split("/")[1] === "mypage") {
      setHeaderText("My Page");
    }
    if (window.location.pathname.split("/")[1] === "like") {
      setHeaderText("Like");
    }
    if (
      window.location.pathname === "/search" ||
      window.location.pathname.split("/")[1] === "search"
    ) {
      setHeaderText("Search");
    }
    if (window.location.pathname.split("/")[1] === "closet") {
      setHeaderText("My Closet");
    }
    if (window.location.pathname.split("/")[1] === "item_detail") {
      setDetail(false);
    }
    if (window.location.pathname === "/main") {
      setHeaderLine(true);
      setMain(false);
    }
  }, []);

  return (
    <Fragment>
      {/* position은 fixed이며 z-index값을 높게 줍니다. */}
      <div className={"header"}>
        {/* marginTop을 0으로 줘서 제일 위에 붙을 수 있게 합니다. */}
        <HeaderBox style={{ marginTop: "0" }}>
          {headerLine ? <MainHeaderLine> </MainHeaderLine> : null}
          {/* 뒤로가기 이미지와 뒤로가기 기능 */}
          {isLogin && main ? (
            <>
              <GoBack
                style={{ backgroundImage: `url(${arrow_back})` }}
                onClick={() => {
                  navigate(-1);
                }}
              ></GoBack>
              <HeaderLogo
                margin="-165px"
                style={{ top: "12px" }}
                onClick={() => {
                  navigate("/main");
                }}
              >
                <span>{headerText}</span>
              </HeaderLogo>
            </>
          ) : (
            <HeaderLogo
              margin="-185px"
              style={{ top: "12px" }}
              onClick={() => {
                navigate("/main");
              }}
            >
              <span>{headerText}</span>
            </HeaderLogo>
          )}
          {/* 로고는 span을 이용해 그냥 텍스트로 처리하고
          누르면 main으로 갈 수 있게 합니다. */}
        </HeaderBox>
        {isLogin && detail ? (
          users?.isExistsNotice === 0 ? (
            <Notifications
              url={`${Notification}`}
              onClick={() => navigate(`/alarm/${users.userId}`)}
            ></Notifications>
          ) : (
            <Notifications
              url={`${NotificationTrue}`}
              onClick={() => navigate(`/alarm/${users.userId}`)}
            ></Notifications>
          )
        ) : null}
      </div>
    </Fragment>
  );
};

export default Header;

const MainHeaderLine = styled.div`
  width: 380px;
  border-bottom: 2px solid #fff;
  position: relative;
  top: 55px;
  left: 23px;
`;

const HeaderBox = styled.div`
  width: 428px;
  z-index: 10;
  /* background: linear-gradient(#a396c9, white); */
  background: #a396c9;
`;

const GoBack = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: cover;
  margin: 20px 0 0 25px;
  cursor: pointer;
`;

const HeaderLogo = styled.div`
  font-family: "Unna";
  position: absolute;
  top: 12px;
  left: 50%;
  margin-left: ${(props) => props.margin};
  margin-top: 1px;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
`;

const Notifications = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 50%;
  margin-right: -195px;
  margin-top: 17px;
  background-color: rgba(0, 0, 0, 0);
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  z-index: 11;
`;
