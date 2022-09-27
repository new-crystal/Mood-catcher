import React, { useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import RepPost from "../components/mainComponents/RepPost";
import HotPosts from "../components/mainComponents/HotPosts";
import AllPosts from "../components/mainComponents/AllPosts";
import { useDispatch, useSelector } from "react-redux";
import { __getUsers } from "../redux/async/signup";
import { __getRepresentative } from "../redux/async/upload";
import { __getHotPosts } from "../redux/async/rank";
import { getCookie } from "../shared/cookie";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const upButton = "/images/upArrow.png";

const Main = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // userId 조회 by token
  const token = getCookie("token");
  const { userId } = jwt(token);

  // 유저정보를 불러와서 토큰이 없다면 다시 로그인
  // 유저정보 조회해서 프로필 사진 확보
  useEffect(() => {
    dispatch(__getUsers(userId));
    dispatch(__getRepresentative(userId));
    dispatch(__getHotPosts());
  }, [dispatch]);

  // 유저정보 조회
  const userStatus = useSelector((state) => state.signup.userStatus);
  // 대표게시물 조회
  const repPost = useSelector((state) => state.upload.representative);
  // 랭크게시물 불러옴
  const hotPosts = useSelector((state) => state.rank.hotPosts);

  // 유저 프로필 이미지 없을때 미리보기 이미지
  const preview_URL =
    "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png";

  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollTop;
    SetScrollHeightInfo(scrollHeight);
  }, 300);

  // toTop버튼
  const [scrollHeightInfo, SetScrollHeightInfo] = useState(0);
  const showTopButton = () => {
    if (scrollHeightInfo > 2000) {
      //2000px밑으로 스크롤 내려갔을때 위로가는 Top 버튼 보이기
      return <TopButton onClick={ScrollToTop}></TopButton>;
    } else {
      return null;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", _scrollPosition); // scroll event listener 등록
    return () => {
      window.removeEventListener("scroll", _scrollPosition); // scroll event listener 해제(스크롤이벤트 클린업)
    };
  }, [scrollHeightInfo]);

  // 실행시 맨위로 올라옴
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          {/* imgUrl 있으면 imgUrl 출력 */}
          {userStatus.imgUrl === undefined ||
          userStatus.imgUrl.slice(-4) === "null" ? (
            <Img
              url={preview_URL}
              onClick={() => navigate("/edit_profile")}
            ></Img>
          ) : (
            <Img url={userStatus?.imgUrl}></Img>
          )}
          {/* 대표게시물 출력 */}
          <RepPost myRepPost={repPost} />

          {/* 랭킹게시물 출력 */}
          <HotPosts hotPosts={hotPosts} />
          <AllPosts />
          {showTopButton()}
          <NavigationBar props={props} />
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 926px; */
  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: auto;
    text-align: left;
  }
`;

const Grid = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 57px;
  max-width: 428px;
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);
  background: linear-gradient(#a396c9, #ffffff);
  /* background: #a396c9; */
`;

const Img = styled.div`
  margin: 14px auto 21px;
  width: 107px;
  height: 107px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  //box-shadow: 5px 5px 4px #877f92;
`;

const TopButton = styled.div`
  position: fixed;
  bottom: 74px;
  left: 50%;
  margin-left: -20px;
  width: 40px;
  height: 40px;
  background-image: url(${upButton});
  background-size: cover;
  cursor: pointer;
`;
