import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __editRecomment } from "../../redux/async/comment";

const DetailChangeReComment = ({ commentData, btnState, postId }) => {
  const dispatch = useDispatch();
  const commentText = useRef("");

  // 댓글 수정하기 이벤트
  const changeComment = () => {
    dispatch(
      __editRecomment({
        postId: postId,
        recommentId: commentData.recommentId,
        comment: commentText.current.value,
      })
    );
    btnState(false);
  };

  useEffect(() => {
    commentText.current.value = commentData.content;
  }, [commentData]);
  return (
    <BackgroundDiv>
      <Wrapdiv>
        <h3>대댓글 수정하기</h3>
        <WrapTextarea>
          <CommentChangeTextBox ref={commentText} maxLength={50} />
        </WrapTextarea>
        <WrapBtn>
          <button onClick={changeComment}>수정하기</button>
          <button
            onClick={() => {
              btnState(false);
            }}
          >
            닫기
          </button>
        </WrapBtn>
      </Wrapdiv>
    </BackgroundDiv>
  );
};

export default DetailChangeReComment;

const BackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9;
`;

const Wrapdiv = styled.div`
  position: fixed;
  left: 50%;
  top: 200px;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 250px;
  padding: 20px 30px;
  background-color: #eeeeee;
  opacity: 1;
  border-radius: 20px;
  box-shadow: 1px 1px 2px 2px;
`;

const WrapTextarea = styled.div`
  border: 2px solid var(--blue);
  width: 100%;
  border-radius: 20px;
`;
const CommentChangeTextBox = styled.textarea`
  border: none;
  resize: none;
  width: 90%;
  height: 130px;
  margin: 10px;
  outline: none;
  overflow-y: auto;
  font-size: 16px;
  border-radius: 10px;
`;
const WrapBtn = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 20px;
  & > button {
    /* margin-top: 5px; */
    text-align: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
    line-height: 20px;
    width: 80px;
    height: 30px;
    background-color: #7b758b;
    border-radius: 10px;
    border: none;
    box-shadow: 5px 5px 4px #877f92;
  }
`;
