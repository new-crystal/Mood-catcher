import React, { useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token
import { useNavigate } from "react-router-dom";
import _ from "lodash";

// 통신
import { __getUsers } from "../redux/async/signup";
import { __getRepresentative } from "../redux/async/upload";
import { __getHotPosts } from "../redux/async/rank";

// 컴포넌트
import HotPosts from "../components/mainComponents/HotPosts";
import AllPosts from "../components/mainComponents/AllPosts";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";

// 아이콘
const upButton = "/images/upArrow.png";

const Main = (props) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { userId } = jwt(token);

  // 랭크게시물 불러옴
  const hotPosts = useSelector((state) => state.rank.hotPosts);

  // 스크롤 위치계산시 연산 너무 많이되는 것
  // 방지하기 위해 300ms 쓰로틀적용
  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollTop;
    SetScrollHeightInfo(scrollHeight);
  }, 300);

  // toTop버튼
  const [scrollHeightInfo, SetScrollHeightInfo] = useState(0);
  const showTopButton = () => {
    if (scrollHeightInfo > 2000) {
      //2000px밑으로 스크롤 내려갔을때 위로가는 Top 버튼 보이기
      return (
        <TopButton
          style={{ backgroundImage: `url(${upButton})` }}
          onClick={ScrollToTop}
        >
          <img
            src={`${upButton}`}
            alt=""
            width="0"
            height="0"
            style={{ display: "none !important" }}
          />
        </TopButton>
      );
    } else {
      return null;
    }
  };

  // 실행시 맨위로 올라옴
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", _scrollPosition); // scroll event listener 등록
    return () => {
      window.removeEventListener("scroll", _scrollPosition); // scroll event listener 해제(스크롤이벤트 클린업)
    };
  }, [scrollHeightInfo]);

  // 유저정보를 불러와서 토큰이 없다면 다시 로그인
  // 유저정보 조회해서 프로필 사진 확보
  useEffect(() => {
    dispatch(__getUsers(userId));
    // dispatch(__getRepresentative(userId));
    dispatch(__getHotPosts());
  }, [dispatch]);

  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
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
`;

const TopButton = styled.div`
  position: fixed;
  bottom: 74px;
  left: 50%;
  margin-left: -20px;
  width: 40px;
  height: 40px;
  background-size: cover;
  cursor: pointer;
`;
