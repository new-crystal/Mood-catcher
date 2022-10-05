import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import "../shared/style/TestHeader.css";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token

//이미지
const home = "/images/home.png";
const search = "/images/search.png";
const add_circle = "/images/add_circle.png";
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
    //메인페이지일 때
    if (window.location.pathname === "/main") {
      setMain(true);
    }
    //검색, 검색 결과창일 때
    if (
      window.location.pathname === "/search" ||
      window.location.pathname.split("/")[1] === "search"
    ) {
      setSearching(true);
    }
    //업로드 페이지일 때
    if (
      window.location.pathname === "/upload" ||
      window.location.pathname === "/upload_select"
    ) {
      setUpload(true);
    }
    //좋아요 페이지일 때
    if (window.location.pathname.split("/")[1] === "like") {
      setLike(true);
    }
    //마이페이지일 때
    if (
      window.location.pathname.split("/")[1] === "mypage" &&
      window.location.pathname.split("/")[2] * 1 === userId * 1
    ) {
      setMyPage(true);
    }
  }, []);

  return (
    <Fragment>
      <NavBox>
        <SearchWrap
          onClick={() => {
            navigate("/main");
          }}
        >
          {main ? <Navigate></Navigate> : null}
          <ImageWrap src={`${home}`} alt="home" />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate("/search");
          }}
        >
          {searching ? <Navigate></Navigate> : null}
          <ImageWrap src={`${search}`} alt="search" />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate("/upload");
          }}
        >
          {upload ? <Navigate></Navigate> : null}
          <ImageWrap src={`${add_circle}`} alt="upload" />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate(`/like/${userId}`);
          }}
        >
          {like ? <Navigate></Navigate> : null}
          <ImageWrap src={`${heart}`} alt="like" />
        </SearchWrap>
        <SearchWrap
          onClick={() => {
            navigate(`/mypage/${userId}`);
          }}
        >
          {myPage ? <Navigate></Navigate> : null}
          <ImageWrap src={`${person}`} alt="person" />
        </SearchWrap>
      </NavBox>
    </Fragment>
  );
};

export default NavigationBar;

const NavBox = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  margin: 0px auto -1px;
  max-width: 428px;
  width: 100vw;
  height: 50px;
  background-color: #ffffff;
  justify-content: space-around;
  z-index: 10;
  box-shadow: 0px -7px 7px #877f92;
`;

const SearchWrap = styled.div`
  width: 100px;
  text-align: center;
  cursor: pointer;
`;

const ImageWrap = styled.img`
  margin: 13px auto 0 auto;
  width: 22px;
  height: 22px;
`;

const Navigate = styled.div`
  width: 85px;
  height: 4px;
  background-color: #7b758b;
`;
