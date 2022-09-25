import { Fragment, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getBestPosts } from "../../redux/async/rank";
import _ from "lodash";
import heart from "../../image/heart.png";
import BestItems from "./BestItems";

const BestPostsForm = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState(`${heart}`);

  const bestPosts = useSelector((state) => state.rank.bestPosts);
  const last = useSelector((state) => state.rank.postLast);

  //명예의 전당 게시물 불러오기
  const getBestPostList = useCallback(() => {
    const getBestPost = async () => {
      await dispatch(__getBestPosts(page));
      setLoading(false);
    };
    return getBestPost();
  }, [page, bestPosts]);

  //스크롤 위치 계산하기
  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
      if (last) {
        return;
      }
      setPage(page + 1);
      getBestPostList();
      setLoading(true);
    }
  }, 500);

  //페이지 계산해서 get 요청 보내고 page 카운트 올리기
  useEffect(() => {
    if (page === 1 && bestPosts.length === 0) {
      dispatch(__getBestPosts(page));
      setPage(page + 1);
    }
    if (bestPosts.length !== 0) {
      setPage(bestPosts.length);
    }
  }, [mood]);

  //윈도우 스크롤 위치 계산하기
  useEffect(() => {
    if (loading) {
      return;
    }
    window.addEventListener("scroll", _scrollPosition);
    return () => {
      window.removeEventListener("scroll", _scrollPosition);
    };
  }, [page, loading]);
  return (
    <Fragment>
      {bestPosts?.map((bestPost) => (
        <BestItems key={bestPost.postId} item={bestPost} />
      ))}
    </Fragment>
  );
};

export default BestPostsForm;
