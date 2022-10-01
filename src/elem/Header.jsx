import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// 따로 shared에 있는 스타일을 사용합니다.
import "../shared/style/TestHeader.css";
import Notification from "../image/notification.png";
import NotificationTrue from "../image/notificationTrue.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getHeaderUser } from "../redux/async/login";
import { getCookie } from "../shared/cookie";
import jwt_decode from "jwt-decode";
import Setting from "../image/settings.png";

const Back = "/images/Back2.png";
const arrow_back = "/images/arrow_back.png";
const Map = "/images/Map.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [headerText, setHeaderText] = useState("Mood Catcher");
  const [main, setMain] = useState(true);
  const [settings, setSettings] = useState(false);
  const [detail, setDetail] = useState(false);

  const users = useSelector((state) => state.login.headerUser);
  const [userId, setUserId] = useState(users.userId);

  //토큰이 있을 경우 확인하기
  useEffect(() => {
    checkLogin();
  }, []);

  //토큰이 있을 경우 확인하기
  const checkLogin = () => {
    const token = getCookie("token");
    if (token !== undefined) {
      const payload = jwt_decode(token);
      setUserId(payload.userId);
      setIsLogin(true);
      dispatch(__getHeaderUser(payload.userId));
    }
  };

  //url의 주소를 조건으로 헤더의 상세 부분 변경하기
  useEffect(() => {
    if (
      window.location.pathname.split("/")[1] === "mypage" &&
      window.location.pathname.split("/")[2] * 1 === userId * 1
    ) {
      setHeaderText("My Page");
      setSettings(true);
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
    if (
      window.location.pathname.split("/")[1] === "closet" &&
      window.location.pathname.split("/")[2] * 1 === userId * 1
    ) {
      setHeaderText("My Closet");
    }
    if (window.location.pathname === "/main") {
      setMain(false);
    }
    if (window.location.pathname.split("/")[2] === "detail") {
      setDetail(true);
    }
  }, []);

  return (
    <Fragment>
      {/* position은 fixed이며 z-index값을 높게 줍니다. */}
      <Headers className={"header"}>
        {/* marginTop을 0으로 줘서 제일 위에 붙을 수 있게 합니다. */}
        <HeaderBox style={{ marginTop: "0" }}>
          {/* 메인에서 헤더에  줄을 줍니다*/}

          {/* 로그인 상태이고 메인이 아닐때 */}
          {isLogin && main && (
            <>
              {/* 뒤로가기 이미지와 뒤로가기 기능 */}
              <GoBack
                style={{ backgroundImage: `url(${arrow_back})` }}
                onClick={() => {
                  navigate(-1);
                }}
              ></GoBack>
              <HeaderLogo
                margin="-10.313rem"
                //style={{ marginLeft: "3.5rem", top: "0.7rem" }}

                style={{
                  marginLeft: "4.813rem",
                  top: "0.7rem",
                }}
                onClick={() => {
                  navigate("/main");
                }}
              >
                <span
                  onClick={() => {
                    navigate("/main");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {headerText}
                </span>
              </HeaderLogo>
              <a href="/kakao">
                <Star
                  style={{ backgroundImage: `url(${Map})`, cursor: "pointer" }}
                />
              </a>
            </>
          )}
          {/* 로그인 상태가 아닐 때 */}
          {!isLogin && (
            <>
              <GoBack></GoBack>
              <HeaderLogo
                margin="-11.563rem"
                //style={{ marginLeft: "-12.5rem", color: "#7B758B" }}
                style={{ marginLeft: "-6.5rem" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {headerText}
                </span>
              </HeaderLogo>
            </>
          )}
          {/* 메인화면일 때 */}
          {!main && (
            <>
              <GoBack></GoBack>
              <HeaderLogo margin="-11.563rem" style={{ marginLeft: "1.5rem" }}>
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {headerText}
                </span>

              //<HeaderLogo
                //margin="-11.563rem"
                //style={{ marginLeft: "1.5rem", color: "#2d273f" }}
                //onClick={() => {
                  //navigate("/login");
                //}}
              //>
                //<span>{headerText}</span>

              </HeaderLogo>
              <a href="/kakao">
                <Star
                  style={{ backgroundImage: `url(${Map})`, cursor: "pointer" }}
                />
              </a>
            </>
          )}
          {/* 로고는 span을 이용해 그냥 텍스트로 처리하고
          누르면 main으로 갈 수 있게 합니다. */}
          {/* 로그인 상태이고 알람표시가 필요할 때 */}
          {isLogin &&
            !settings &&
            (users?.isExistsNotice === 0 ? (
              <Notifications
                url={`${Notification}`}
                style={{ opacity: "60%", cursor: "pointer" }}
                onClick={() => navigate(`/alarm/${users.userId}`)}
              ></Notifications>
            ) : (
              <Notifications
                url={`${NotificationTrue}`}
                style={{ opacity: "60%", cursor: "pointer" }}
                onClick={() => navigate(`/alarm/${users.userId}`)}
              ></Notifications>
            ))}
          {/* 알람표시가 아닌 프로필 설정이 필요할 때 */}
          {settings && (
            <Notifications
              url={`${Setting}`}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/edit_profile")}
            ></Notifications>
          )}

          {/* <Star
            onClick={() => navigate("/kakao")}
            style={{ backgroundImage: `url(${star})` }}
          ></Star> */}
        </HeaderBox>
      </Headers>
    </Fragment>
  );
};

export default Header;
const Star = styled.div`
  width: 25px;
  height: 25px;
  margin-top: -32px;
  float: right;
  margin-right: 70px;
  background-color: rgba(0, 0, 0, 0);
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  z-index: 20;
  opacity: 60%;
`;

const ImageWrap = styled.div`
  margin: 0 auto;
  margin-top: 13px;
  width: 22px;
  height: 22px;
  background-size: cover;
`;

const Headers = styled.div`
  max-width: 428px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background: linear-gradient(
    180deg,
    #a396c9 0%,
    rgba(181, 170, 211, 0.810298) 31.7%,
    rgba(191, 182, 217, 0.699081) 40.03%,
    rgba(255, 255, 255, 0) 100%
  );

`;

const HeaderBox = styled.div`
  /* max-width: 428px; */
  width: 100vw;
  z-index: 10;
  position: relative;
  top: -20px;
  background: linear-gradient(#a396c9, white);
`;

const GoBack = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: cover;
  margin: 16px 0 4px 57px;
  cursor: pointer;
  opacity: 50%;
  position: relative;
  top: 28px;
`;

const HeaderLogo = styled.div`
  font-family: "Unna";
  /* position: absolute;
  top: 12px;
  left: 50%; */
  //margin-left: ${(props) => props.margin};
  margin-top: -3px;
  margin-left: 40px;
  font-size: 30px;
  font-weight: 700;
  color: #2d273f;
  cursor: default;
`;

const Notifications = styled.div`
  width: 30px;
  height: 30px;
  margin-top: -35px;
  float: right;
  margin-right: 25px;
  /* margin-left: 22em; */
  background-color: rgba(0, 0, 0, 0);
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  z-index: 20;
`;
