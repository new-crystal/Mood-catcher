import React, { useState, Fragment, Suspense, useEffect } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import LikePosts from "../components/likeComponents/LikePosts";
import _ from "lodash";

const upButton = "/images/upArrow.png";

const Closet = (props) => {
  const [scrollHeightInfo, SetScrollHeightInfo] = useState(0);

  // toTop버튼
  const showTopButton = () => {
    if (scrollHeightInfo > 2000) {
      //2000px밑으로 스크롤 내려갔을때 위로가는 Top 버튼 보이기
      return <TopButton onClick={ScrollToTop}></TopButton>;
    } else {
      return null;
    }
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

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
            <LikePosts />
            {showTopButton()}
          </Grid>
        </Container>
        <NavigationBar props={props} />
      </Suspense>
    </Fragment>
  );
};

export default Closet;

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
  min-height: 926px;
  background: linear-gradient(#a396c9, #c8c6d0);
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
