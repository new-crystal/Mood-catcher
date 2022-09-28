import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getMainAllPosts } from "../../redux/async/rank";
import EachPost from "./EachPost";
import styled from "styled-components";
import InfinityScrollLoader from "./InfinityScrollLoader";
import _ from "lodash";
import { getCookie } from "../../shared/cookie";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token

const AllPosts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); //데이터 받아오는동안 로딩 true로 하고 api요청 그동안 한번만되게
  const [paging, setPaging] = useState(1); //페이지넘버
  const token = getCookie("token");
  const { userId } = jwt(token);
  const allMainPostList = useSelector((state) => state.rank.allPosts);
  const last = useSelector((state) => state.rank.postLast);
  const allMainPosts = [...new Set(allMainPostList.map(JSON.stringify))].map(
    JSON.parse
  );

  const getMainList = useCallback(() => {
    async function getMainData() {
      await dispatch(__getMainAllPosts({ paging: paging, userId: userId })); //api요청
      setLoading(false); //요청하고나면 loading false로
    }
    return getMainData();
  }, [paging, allMainPosts]);

  // 스크롤위치 계산
  const _handleScroll = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    //스크롤계산 사용자의 현재위치 + 스크롤위에서부터 위치가 전체 높이보다 커지면 함수실행
    if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      if (last) {
        return;
      }
      setPaging(paging + 1); //다음페이지
      getMainList(); //api요청 실행
      setLoading(true); //실행동안 loading true로 바꾸고 요청 막기
    }
  }, 500);

  useEffect(() => {
    if (paging === 1 && allMainPosts.length === 0) {
      dispatch(__getMainAllPosts({ paging: paging, userId: userId }));
      setPaging(paging + 1);
    } //첫렌더링시 0페이지 받아오기
    if (allMainPosts.length !== 0) {
      setPaging(allMainPosts.length);
    } //다른컴포넌트 갔다 올때 렌더링시 페이지넘버 계산
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    } //로딩이 true일 경우 리턴
    window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
    return () => {
      window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
    };
  }, [paging, loading]);

  return (
    <Fragment>
      <List>
        {allMainPosts?.map((item, idx) => (
          <EachPost key={idx} item={item} />
        ))}
      </List>
      {loading ? <InfinityScrollLoader /> : ""}
    </Fragment>
  );
};

export default AllPosts;

const List = styled.div`
  width: 312px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
