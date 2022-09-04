import React, { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { api } from "../../shared/api";
import { __representative } from "../../redux/modules/uploadSlice";
import Like from "../../image/heart.png";
import { useInView } from "react-intersection-observer";

const ClosetForm = () => {
  const dispatch = useDispatch();
  //closetList 받아와서 뿌려주기!!
  const closetList = useSelector((state) => state);

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const count = 4;

  const [ref, inView] = useInView();

  //임시!!
  const userId = 1;
  // //userId, page, count 보내주기!!
  // useEffect(() => {
  //   dispatch(__getCloset());
  // }, []);

  //대표 게시물로 지정하기
  //postId 보내주기
  const onClickRepBtnHandler = () => {
    dispatch(__representative());
  };

  //무한 스크롤 구현
  const getItems = useCallback(async () => {
    setLoading(true);
    await api
      .get(`/user/mycloset/?userId=${userId}&page=${page}&count=${count}`)
      .then((res) => {
        setPosts((prevState) => [...prevState, res]);
      });
    setLoading(false);
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <Container>
      <ClosetHeader>
        <h1>My Closet</h1>
      </ClosetHeader>
      {posts?.map((post, idx) => (
        <React.Fragment key={idx}>
          {posts.length - 1 == idx ? (
            <PostBox ref={ref}>
              <PostImg url="https://image.kmib.co.kr/online_image/2018/1127/611211110012870271_1.jpg"></PostImg>
              <PostText>
                <h6>
                  2022.09.17.
                  {post.createdAt}
                </h6>
                <h4>내 달걀 후라이</h4>
                <h5>맛있는 달걀후라이</h5>
                <MoodBox>
                  <Heart></Heart>
                  <p>10000</p>
                </MoodBox>
                <RepresentativeBtn onClick={() => onClickRepBtnHandler()}>
                  대표게시물로 지정
                </RepresentativeBtn>
              </PostText>
            </PostBox>
          ) : (
            <PostBox>
              <PostImg url="https://image.kmib.co.kr/online_image/2018/1127/611211110012870271_1.jpg"></PostImg>
              <PostText>
                <h6>
                  2022.09.17.
                  {post.createdAt}
                </h6>
                <h4>내 달걀 후라이</h4>
                <h5>맛있는 달걀후라이</h5>
                <MoodBox>
                  <Heart></Heart>
                  <p>10000</p>
                </MoodBox>
                <RepresentativeBtn onClick={() => onClickRepBtnHandler()}>
                  대표게시물로 지정
                </RepresentativeBtn>
              </PostText>
            </PostBox>
          )}
        </React.Fragment>
      ))}
    </Container>
  );
};
const Container = styled.div`
  width: 428px;
  height: 926px;
`;
const ClosetHeader = styled.div`
  width: 428px;
  height: 50px;
  background-color: #a396c9;
  color: white;
`;
const PostBox = styled.div`
  width: 350px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 20px auto;
`;
const PostImg = styled.div`
  width: 130px;
  height: 175px;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
const PostText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px auto;
  color: #7b758b;

  h6 {
    margin-top: 30px;
    margin-left: 100px;
  }
  h4 {
    margin-top: 10px;
  }
`;
const MoodBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const Heart = styled.div`
  width: 20px;
  height: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${Like});
`;

const RepresentativeBtn = styled.button``;

export default ClosetForm;
