import React, { Fragment, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getLikeAllPosts } from "../../redux/async/like";
import InfinityScrollLoader from "../../elem/InfinityScrollLoader";
import _ from "lodash";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token

//컴포넌트
import CardForm from "../../elem/CardForm";

//이미지
import hanger from "../../image/옷걸이.png";
import heart from "../../image/heart.png";

const LikePosts = () => {
  const dispatch = useDispatch();
  const allLikePostList = useSelector((state) => state.like.allPosts); //좋아요 전체리스트
  const allLikePosts = [...new Set(allLikePostList.map(JSON.stringify))].map(
    JSON.parse
  ); //좋아요 전체리스트 중복제거
  const last = useSelector((state) => state.like.postLast); //마지막페이지
  const [mood, setMood] = useState(`${heart}`); //좋아요
  const [loading, setLoading] = useState(false); //데이터 받아오는동안 로딩 true로 하고 api요청 그동안 한번만되게
  const [paging, setPaging] = useState(1); //페이지넘버

  // 토큰 decode를 통해서 현재 로그인한 유저 id 가져오기
  const token = localStorage.getItem("token");
  const { userId } = jwt(token);

  useEffect(() => {
    if (paging === 1 && allLikePosts.length === 0) {
      dispatch(__getLikeAllPosts({ paging: paging, userId: userId }));
      setPaging(paging + 1);
    } //첫렌더링시 0페이지 받아오기
    if (allLikePosts.length !== 0) {
      setPaging(allLikePosts.length / 6 + 1);
    } //다른컴포넌트 갔다 올때 렌더링시 페이지넘버 계산
  }, [mood]);

  useEffect(() => {
    if (loading) {
      return;
    } //로딩이 true일 경우 리턴
    window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
    return () => {
      window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
    };
  }, [paging, loading]);

  const getLikeList = useCallback(() => {
    const getLikeData = async () => {
      await dispatch(__getLikeAllPosts({ paging: paging, userId: userId })); //api요청
      setLoading(false); //요청하고나면 loading false로
    };
    return getLikeData();
  }, [paging, allLikePosts]); //usecallback의 deps에 페이지랑 맥주목록 바뀔때마다 실행되게

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
      getLikeList(); //api요청 실행
      setLoading(true); //실행동안 loading true로 바꾸고 요청 막기
    }
  }, 500);

  return (
    <Fragment>
      {allLikePosts?.length === 0 && (
        <>
          <EmptyLike src={`${hanger}`} alt="empty_like" />
          <EmptyText>
            <p>캐처님께서 </p>
            <p>아직 좋아한 </p>
            <p>게시물이 없습니다</p>
          </EmptyText>
        </>
      )}
      {allLikePosts?.map((item, idx) => (
        <CardForm key={idx} item={item} />
      ))}

      {loading ? <InfinityScrollLoader /> : ""}
    </Fragment>
  );
};

const EmptyLike = styled.img`
  margin: 200px auto auto auto;
  width: 250px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-style: Bold;
  font-weight: 700;
  font-size: 17px;
`;
const EmptyText = styled.div`
  margin: -70px auto 0 auto;
  width: 200px;
  text-align: center;
`;

export default LikePosts;
