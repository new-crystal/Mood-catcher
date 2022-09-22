import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
// 따로 shared에 있는 스타일을 사용합니다.
import "../shared/style/TestHeader.css";
import Notification from "../image/notification.png";
import NotificationTrue from "../image/notificationTrue.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getUser } from "../redux/async/login";
import { getCookie } from "../shared/cookie";
import jwt_decode from "jwt-decode";
import { set } from "lodash";
import Setting from "../image/settings.png";

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
  const [settings, setSettings] = useState(false);

  const users = useSelector((state) => state.login.userStatus);
  const [userId, setUserId] = useState(users.userId);

  //토큰이 있을 경우 확인하기
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    const token = getCookie("token");
    if (token !== undefined) {
      const payload = jwt_decode(token);
      setUserId(payload.userId);
      setIsLogin(true);
      dispatch(__getUser(payload.userId));
    }
  };

  //url의 주소를 조건으로 헤더의 상세 부분 변경하기
  useEffect(() => {
    if (
      window.location.pathname.split("/")[1] === "mypage" &&
      window.location.pathname.split("/")[2] == userId
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
      <Headers className={"header"}>
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
            <>
              <GoBack></GoBack>
              <HeaderLogo
                margin="-185px"
                style={{ top: "12px" }}
                onClick={() => {
                  navigate("/main");
                }}
              >
                <span>{headerText}</span>
              </HeaderLogo>
            </>
          )}
          {/* 로고는 span을 이용해 그냥 텍스트로 처리하고
          누르면 main으로 갈 수 있게 합니다. */}
          {isLogin && detail && !settings ? (
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
          {settings && (
            <Notifications
              url={`${Setting}`}
              onClick={() => navigate("/edit_profile")}
            ></Notifications>
          )}
        </HeaderBox>
      </Headers>
    </Fragment>
  );
};

export default Header;
const Headers = styled.div`
  max-width: 428px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background: #a396c9;
`;
const MainHeaderLine = styled.div`
  max-width: 380px;
  width: 90vw;
  border-bottom: 2px solid #fff;
  position: relative;
  top: 80px;
  left: 23px;
`;

const HeaderBox = styled.div`
  /* max-width: 428px; */
  width: 100vw;
  z-index: 10;

  /* background: linear-gradient(#a396c9, white); */
`;

const GoBack = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: cover;
  margin: 20px 0 0 25px;
  cursor: pointer;
  opacity: 60%;
`;

const HeaderLogo = styled.div`
  font-family: "Unna";
  /* position: absolute;
  top: 12px;
  left: 50%; */
  //margin-left: ${(props) => props.margin};
  margin-top: 0px;
  margin-left: 40px;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
`;

const Notifications = styled.div`
  width: 30px;
  height: 30px;
  margin-top: -35px;
  margin-left: 350px;
  background-color: rgba(0, 0, 0, 0);
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  z-index: 20;
`;
