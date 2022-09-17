import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// 따로 shared에 있는 스타일을 사용합니다.
import "../shared/style/TestHeader.css";
import Notification from "../image/notification.png";
import NotificationTrue from "../image/notificationTrue.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getUser } from "../redux/modules/loginSlice";
import { getCookie } from "../shared/cookie";
import jwt_decode from "jwt-decode";

const Back = "/images/Back2.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const users = useSelector((state) => state.login.userStatus);

  useEffect(() => {
    const token = getCookie("token");
    if (token !== undefined) {
      const payload = jwt_decode(token);
      setIsLogin(true);
      dispatch(__getUser(payload.userId));
    }
  }, []);

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
              navigate("/main");
            }}
          >
            <span>Mood catcher</span>
          </HeaderLogo>
        </HeaderBox>
        {isLogin ? (
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

const Notifications = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  right: 50%;
  margin-right: -200px;
  margin-top: 9px;
  background-color: rgba(0, 0, 0, 0);
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  opacity: 60%;
  z-index: 11;
`;
