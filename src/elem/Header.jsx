import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
// 따로 shared에 있는 스타일을 사용합니다.
import "../shared/style/TestHeader.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

//통신
import { __getHeaderUser } from "../redux/async/login";

//이미지
import NotificationTrue from "../image/notificationTrue.png";
import Setting from "../image/settings.png";
import Notification from "../image/notification.png";
const arrow_back = "/images/arrow_back.png";
const Map = "/images/Map.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.login.headerUser); //헤더에서 유저 정보 가져오기
  const [isLogin, setIsLogin] = useState(false);
  const [headerText, setHeaderText] = useState("Mood Catcher");
  const [main, setMain] = useState(true);
  const [settings, setSettings] = useState(false);
  const [editPw, setEditPw] = useState(false);
  const [userId, setUserId] = useState(users.userId);

  //토큰이 있을 경우 확인하기
  useEffect(() => {
    checkLogin();
  }, []);

  //토큰이 있을 경우 확인하기
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const payload = jwt_decode(token);
      setUserId(payload.userId);
      setIsLogin(true);
      dispatch(__getHeaderUser(payload.userId));
    }
  };

  //url의 주소를 조건으로 헤더의 상세 부분 변경하기
  useEffect(() => {
    //마이페이지일 때
    if (
      window.location.pathname.split("/")[1] === "mypage" &&
      window.location.pathname.split("/")[2] * 1 === userId * 1
    ) {
      setHeaderText("My Page");
      setSettings(true);
    }
    //좋아요 페이지일 때
    if (window.location.pathname.split("/")[1] === "like") {
      setHeaderText("Like");
    }
    //검색, 검색 결과페이지일 때
    if (
      window.location.pathname === "/search" ||
      window.location.pathname.split("/")[1] === "search"
    ) {
      setHeaderText("Search");
    }
    //옷장 페이지일 때
    if (
      window.location.pathname.split("/")[1] === "closet" &&
      window.location.pathname.split("/")[2] * 1 === userId * 1
    ) {
      setHeaderText("My Closet");
    }
    //메인 페이지일 때
    if (window.location.pathname === "/main") {
      setMain(false);
    }
    //비밀번호 변경페이지일 때
    if (window.location.pathname.split("/")[1] === "edit_password") {
      setEditPw(true);
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
                src={`${arrow_back}`}
                alt="back"
                onClick={() => {
                  navigate(-1);
                }}
              />
              <HeaderLogo
                margin="-10.313rem"
                style={{ marginLeft: "3.5rem", top: "0.7rem" }}
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
                <Star src={`${Map}`} alt="map" style={{ cursor: "pointer" }} />
              </a>
            </>
          )}
          {/* 로그인 상태가 아니면서 비밀번호 수정이 아닐 때 */}
          {!isLogin && !editPw && (
            <>
              <GoBack></GoBack>
              <HeaderLogo
                margin="-11.563rem"
                style={{ marginLeft: "-12.5rem", color: "#7B758B" }}
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
          {/* 로그인 상태가 아니면서 비밀번호 수정할 때 */}
          {!isLogin && editPw && (
            <>
              <GoBack></GoBack>
              <HeaderLogo
                margin="-11.563rem"
                style={{
                  marginLeft: "0.9rem",
                  color: "#7B758B",
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
              </HeaderLogo>
              <a href="/kakao">
                <Star src={`${Map}`} alt="map" style={{ cursor: "pointer" }} />
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
                src={`${Notification}`}
                alt="notification"
                style={{
                  opacity: "60%",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/alarm/${users.userId}`)}
              />
            ) : (
              <Notifications
                src={`${NotificationTrue}`}
                alt="notification"
                style={{
                  opacity: "60%",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/alarm/${users.userId}`)}
              />
            ))}
          {/* 알람표시가 아닌 프로필 설정이 필요할 때 */}
          {settings && (
            <Notifications
              src={`${Setting}`}
              alt="setting"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/edit_profile")}
            />
          )}
        </HeaderBox>
      </Headers>
    </Fragment>
  );
};

export default Header;
// export default React.memo(Header);

const Star = styled.img`
  margin-top: -32px;
  margin-right: 70px;
  width: 25px;
  height: 25px;
  float: right;
  background-color: rgba(0, 0, 0, 0);
  z-index: 20;
  opacity: 60%;
`;

const Headers = styled.div`
  display: flex;
  max-width: 428px;
  width: 100vw;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background: linear-gradient(rgb(173, 156, 222), rgb(255, 255, 255));
`;

const HeaderBox = styled.div`
  position: relative;
  top: -20px;
  width: 100vw;
  z-index: 10;
`;

const GoBack = styled.img`
  position: relative;
  top: 28px;
  display: inline-block;
  margin: 20px 0 3px 25px;
  width: 20px;
  height: 20px;
  background-size: cover;
  cursor: pointer;
  opacity: 50%;
`;

const HeaderLogo = styled.div`
  margin-top: -3px;
  margin-left: 40px;
  font-family: "Unna";
  font-size: 30px;
  font-weight: 700;
  color: #7b758b;
  cursor: pointer;
`;

const Notifications = styled.img`
  margin-top: -35px;
  margin-right: 25px;
  width: 30px;
  height: 30px;
  float: right;
  background-color: rgba(0, 0, 0, 0);
  z-index: 20;
`;
