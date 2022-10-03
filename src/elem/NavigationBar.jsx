import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../shared/style/TestHeader.css";
import { getCookie } from "../shared/cookie";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token
import { useEffect } from "react";

const home = "/images/home.png";
const search = "/images/search.png";
const add_circle = "/images/add_circle.png";
const star = "/images/star.png";
const person = "/images/person.png";
const heart = "/images/heart.png";

const NavigationBar = (props) => {
  const token = localStorage.getItem("token");
  const { userId } = jwt(token);
  const navigate = useNavigate();
  const [main, setMain] = useState(false);
  const [searching, setSearching] = useState(false);
  const [upload, setUpload] = useState(false);
  const [like, setLike] = useState(false);
  const [myPage, setMyPage] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/main") {
      setMain(true);
    }
    if (
      window.location.pathname === "/search" ||
      window.location.pathname.split("/")[1] === "search"
    ) {
      setSearching(true);
    }
    if (
      window.location.pathname === "/upload" ||
      window.location.pathname === "/upload_select"
    ) {
      setUpload(true);
    }
    if (window.location.pathname.split("/")[1] === "like") {
      setLike(true);
    }
    if (window.location.pathname.split("/")[1] === "mypage") {
      setMyPage(true);
    }
  }, []);

  return (
    <Fragment>
      <NavBox>
        <SearchWrap
          onClick={() => {
            navigate("/main");
            //window.location.reload();
          }}
        >
          {main ? <Navigate></Navigate> : null}
          <ImageWrap style={{ backgroundImage: `url(${home})` }} />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate("/search");
          }}
        >
          {searching ? <Navigate></Navigate> : null}
          <ImageWrap style={{ backgroundImage: `url(${search})` }} />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate("/upload");
          }}
        >
          {upload ? <Navigate></Navigate> : null}
          <ImageWrap style={{ backgroundImage: `url(${add_circle})` }} />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate(`/like/${userId}`);
            //window.location.reload();
          }}
        >
          {like ? <Navigate></Navigate> : null}
          <ImageWrap style={{ backgroundImage: `url(${heart})` }} />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate(`/mypage/${userId}`);
          }}
        >
          {myPage ? <Navigate></Navigate> : null}
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
  margin: 0px auto -1px;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  max-width: 428px;
  width: 100vw;
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

const Navigate = styled.div`
  width: 85px;
  height: 4px;
  background-color: #7b758b;
`;
