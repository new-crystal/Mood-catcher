import { Fragment, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

//통신
import { __getBestPosts } from "../../redux/async/rank";

//컴포넌트
import CardForm from "../../elem/CardForm";

//이미지
import heart from "../../image/heart.png";

const BestPostsForm = () => {
  const dispatch = useDispatch();
  const bestPosts = useSelector((state) => state.rank.bestPosts); //명예의 전당 전체 리스트
  const last = useSelector((state) => state.rank.postLast); //페이지 마지막 도달했을 때
  const [page, setPage] = useState(1); //스크롤마다 페이지 카운트
  const [loading, setLoading] = useState(false); //로딩 중
  const [mood, setMood] = useState(`${heart}`); //좋아요 state

  //페이지 계산해서 get 요청 보내고 page 카운트 올리기
  useEffect(() => {
    if (page === 1 && bestPosts.length === 0) {
      dispatch(__getBestPosts(page));
      setPage(page + 1);
    }
    if (bestPosts.length !== 0) {
      setPage(bestPosts.length / 4 + 1);
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

  return (
    <Fragment>
      {bestPosts?.map((bestPost) => (
        <CardForm key={bestPost.postId} item={bestPost} />
      ))}
    </Fragment>
  );
};

export default BestPostsForm;
