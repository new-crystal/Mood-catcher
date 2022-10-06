import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getMainAllPosts } from "../../redux/async/rank";
import EachPost from "./EachPost";
import styled from "styled-components";
import InfinityScrollLoader from "./InfinityScrollLoader";
import _ from "lodash";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token

const AllPosts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); //데이터 받아오는동안 로딩 true로 하고 api요청 그동안 한번만되게
  const [paging, setPaging] = useState(1); //페이지넘버
  const token = localStorage.getItem("token");
  const { userId } = jwt(token);
  const allMainPostList = useSelector((state) => state.rank.allPosts);
  const last = useSelector((state) => state.rank.postLast);
  const allMainPosts = [...new Set(allMainPostList.map(JSON.stringify))].map(
    JSON.parse
  );
  const isPosting = useSelector((state) => state.upload.addPosting);

  // useCallback을 사용하는 이유는 해당 스크롤 이벤트 자체가
  // 상위 컴포넌트의 '값 변동(스크롤을 내림으로 값이 추가됨)'으로 인해
  // 여러번 불러와지게 되는데 그 것을 최초 1번만 불러와서
  // 변동사항 없으면 계속 쓰기 위함이다.
  const getMainList = useCallback(() => {
    async function getMainData() {
      await dispatch(__getMainAllPosts({ paging: paging, userId: userId })); //api요청
      setLoading(false); //요청하고나면 loading false로
    }
    return getMainData();
  }, [paging, allMainPosts, isPosting]);

  // 스크롤위치 계산시 연산 너무 많이되는 것
  // 방지하기 위해 500ms 쓰로틀적용 (0.5초 마다 보낸다.)
  // 스크롤 하단부가 100px 이하에 위치한다는 조건이 만족할 시
  // 일정 시간마다 요청을 보낸다.
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
    if ((paging === 1 && allMainPosts.length === 0) || isPosting === true) {
      dispatch(__getMainAllPosts({ paging: paging, userId: userId }));
      setPaging(paging + 1);
    } //첫렌더링시 0페이지 받아오기
    if (allMainPosts.length !== 0) {
      setPaging(allMainPosts.length / 8 + 1);
    } //다른컴포넌트 갔다 올때 렌더링시 페이지넘버 계산
  }, [isPosting]);

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
        {allMainPosts
          ?.sort((a, b) => b.postId - a.postId)
          .map((item, idx) => (
            <EachPost key={idx} item={item} />
          ))}
      </List>
      {loading ? <InfinityScrollLoader /> : ""}
    </Fragment>
  );
};

export default AllPosts;

const List = styled.div`
  width: 346px;
  /* height: 440px; */
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
