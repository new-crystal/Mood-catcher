import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux/es/exports";
import { __deleteComment } from "../../redux/modules/commentSlice";
import DetailChangeComment from "./DetailChangeComments";

// 상세페이지에 댓글 list 컴포넌트
const DetailCommentList = ({ commentData }) => {
  const dispatch = useDispatch();
  // 수정 토글 창 관리 state
  const [changeState, setChangeState] = useState(false);

  // 댓글 삭제 이벤트
  const deleteComment = () => {
    dispatch(
      __deleteComment({ commentId: commentData.id, postId: commentData.PostId })
    );
  };
  return (
    <>
      {changeState ? (
        <DetailChangeComment
          commentData={commentData}
          btnState={setChangeState}
        />
      ) : null}

      <WrapComment>
        <h3>{commentData?.User?.nickname}</h3>
      </WrapComment>
      <CommentText>
        <pre>{commentData?.comment}</pre>
      </CommentText>
      <WrapBtn>
        <div>
          <button
            onClick={() => {
              setChangeState(true);
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              deleteComment();
            }}
          >
            삭제
          </button>
        </div>
      </WrapBtn>
    </>
  );
};

export default DetailCommentList;

const WrapComment = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;

  border: 1px solid var(--greyD);
  border-radius: 10px 10px 0 0;
  span {
    margin-right: 10px;
    color: var(--greyD);
    font-weight: 600;
  }
`;

const CommentText = styled.div`
  text-align: left;
  padding: 20px;
  border-radius: 0 0 10px 10px;
  border: 1px solid var(--grey);
  margin-bottom: 8px;
  pre {
    white-space: pre-wrap;
    word-break: break-all;
    overflow: auto;
  }
`;

const WrapBtn = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  div {
    display: flex;
    gap: 10px;
    width: 30%;
    margin-bottom: 10px;
  }
`;
