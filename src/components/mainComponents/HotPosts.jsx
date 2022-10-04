import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Swal from "sweetalert2";
import question from "../../image/question.png";
import HotList from "./HotList";

const HotPosts = ({ hotPosts }) => {
  const navigate = useNavigate();
  const [hot, setHot] = useState(false);

  const onClickHandler = useCallback(
    (hotPosts) => {
      if (hotPosts.delete) {
        Swal.fire({
          icon: "info",
          title: "삭제된 게시물입니다.",
          showConfirmButton: false,
          timer: 3000,
        }).then(navigate(`/main`).then(window.location.reload()));
      }
      navigate(`/item_detail/${hotPosts.postId}/${hotPosts.userId}`);
      //window.location.reload();
    },
    [navigate]
  );

  return (
    <Fragment>
      <Wrap>
        <StTag>Hot</StTag>
        <Question
          style={{ cursor: "pointer", backgroundImage: `url(${question})` }}
          onClick={() => setHot(true)}
        >
          <img
            src={`${question}`}
            alt=""
            width="0"
            height="0"
            style={{ display: "none !important" }}
          />
        </Question>
        {hot ? <HotList setHot={setHot} /> : null}
        <p onClick={() => navigate("/best")}>명예의 전당 ➡</p>
      </Wrap>
      <WritedHotInfo>
        <HotImage1>
          <img
            alt="hot-post-1"
            src={hotPosts[0]?.imgUrl}
            style={{ cursor: "pointer" }}
            onClick={() => {
              onClickHandler(hotPosts[0]);
            }}
          />
        </HotImage1>
        <HotWrap>
          <GridHorizonHot>
            <HotImage2>
              <img
                alt="hot-post-2"
                src={hotPosts[1]?.imgUrl}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onClickHandler(hotPosts[1]);
                }}
              />
            </HotImage2>
          </GridHorizonHot>
          <GridHorizonHot>
            <HotImage3>
              <img
                alt="hot-post-3"
                src={hotPosts[2]?.imgUrl}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onClickHandler(hotPosts[2]);
                }}
              />
            </HotImage3>
          </GridHorizonHot>
        </HotWrap>
      </WritedHotInfo>
    </Fragment>
  );
};

const Wrap = styled.div`
  margin: 21px auto 10px;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & p {
    flex-direction: row;
    font-family: "Noto Sans KR", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    margin-right: 15px;
    cursor: pointer;
    position: relative;
    top: 10px;
  }
`;

const StTag = styled.div`
  margin-bottom: -10px;
  width: 200px;
  height: 40px;
  border-radius: 17px;
  text-align: center;
  line-height: 40px;
  font-size: 30px;
  font-weight: 900;
  font-family: "Unna";
  color: #2d273f;
  margin-left: -60px;
  font-style: normal;
`;

const WritedHotInfo = styled.div`
  display: flex;
  margin: 0px auto 20px;
  width: 350px;
  height: 288px;
  background-color: #e4ddef;
  border-radius: 20px;
`;

const HotImage1 = styled.div`
  margin: 13px;
  border-radius: 20px;
  width: 80px;
  height: 90px;
  background-color: #ffffff;

  & > img {
    width: 200px;
    height: 266px;
    border-radius: 20px;
  }
`;

const HotWrap = styled.div`
  margin: 66px 0 30px 50px;
`;

const GridHorizonHot = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
`;

const HotImage2 = styled.div`
  margin: 0 0 40px 70px;
  border-radius: 20px;
  width: 80px;
  height: 90px;
  background-color: #ffffff;
  & > img {
    width: 110px;
    height: 130px;
    border-radius: 20px;
  }
`;

const HotImage3 = styled.div`
  margin: 215px 0 19px 70px;
  border-radius: 10px;
  width: 80px;
  height: 90px;

  background-color: #ffffff;
  & > img {
    width: 110px;
    height: 130px;
    border-radius: 10px;
  }
`;

const Question = styled.div`
  width: 15px;
  height: 15px;
  margin-left: -250px;
  margin-top: 19px;
  background-position: center;
  background-size: cover;
  /* background-image: url(${question}); */
`;
export default HotPosts;
