import React, { useState, Fragment, Suspense, useEffect } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import RepPost from "../components/mainComponents/RepPost";
import HotPosts from "../components/mainComponents/HotPosts";
import AllPosts from "../components/mainComponents/AllPosts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getUsers } from "../redux/modules/signUpSlice";
import { __getRepPost } from "../redux/modules/uploadSlice";
import { __getHotPosts } from "../redux/modules/rankSlice";
import _ from "lodash";
import { getCookie } from "../shared/cookie";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token

const upButton = "/images/upArrow.png";

const Main = (props) => {
  const [scrollHeightInfo, SetScrollHeightInfo] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 유저정보 조회
  const userStatus = useSelector((state) => state.signup.userStatus);
  // 대표게시물 조회
  const repPost = useSelector((state) => state.upload.representative);
  // 랭크게시물 불러옴
  const hotPosts = useSelector((state) => state.rank.hotPosts);
  // console.log(hotPosts);

  const token = getCookie("token");
  const { userId } = jwt(token);
  const preview_URL =
    "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png";
  // profile_pic를 정하는 부분
  // const [profile, setProfile] = useState({
  //   image_file: "",
  //   preview_URL:
  //     "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png",
  // });

  // toTop버튼
  const showTopButton = () => {
    if (scrollHeightInfo > 2000) {
      //2000px밑으로 스크롤 내려갔을때 위로가는 Top 버튼 보이기
      return <TopButton onClick={ScrollToTop}></TopButton>;
    } else {
      return null;
    }
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //스크롤 위치계산시 연산 너무 많이되는 것
  //방지하기 위해 300ms 쓰로틀적용
  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollTop;
    SetScrollHeightInfo(scrollHeight);
  }, 300);

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
    dispatch(__getRepPost(userId));
    dispatch(__getHotPosts());
  }, []);

  return (
    <Fragment>
      <Suspense
        fallback={
          <LoaderWrap>
            <Loader />
          </LoaderWrap>
        }
      >
        <Header />
        <Container>
          <Grid>
            {/* imgUrl 있으면 imgUrl 출력 */}
            {userStatus.imgUrl === undefined ||
            userStatus.imgUrl.slice(-4) === "null" ? (
              <Img url={preview_URL}></Img>
            ) : (
              <Img url={userStatus?.imgUrl}></Img>
            )}
            {/* <Img
              url={
                profile.image_file ? profile.image_file : profile.preview_URL
              }
            ></Img> */}
            {/* 대표게시물 출력 */}
            <RepPost myRepPost={repPost} />
            {/* 랭킹게시물 출력 */}
            <HotPosts hotPosts={hotPosts} />
            <AllPosts />
            {showTopButton()}
          </Grid>
        </Container>
        <NavigationBar props={props} />
      </Suspense>
    </Fragment>
  );
};

export default Main;

const LoaderWrap = styled.div`
  position: absolute;
  margin-top: -100px;
  margin-left: -100px;
  top: 50%;
  left: 50%;
`;

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
  width: 428px;
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
  box-shadow: 5px 5px 4px #877f92;
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
