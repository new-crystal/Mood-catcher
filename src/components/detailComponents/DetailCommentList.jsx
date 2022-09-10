import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux/es/exports";
import { __deleteComment } from "../../redux/modules/commentSlice";
import DetailChangeComment from "./DetailChangeComments";

// 상세페이지에 댓글 list 컴포넌트
const DetailCommentList = (props) => {
  const dispatch = useDispatch();
  const { item } = props;
  console.log(item);

  // profile_pic를 정하는 부분
  const [profile, setProfile] = useState({
    image_file: "",
    preview_URL:
      "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png",
  });

  // 수정 토글 창 관리 state
  const [changeState, setChangeState] = useState(false);

  useEffect(() => {
    if (item.imgUrl !== undefined) {
      setProfile({ image_file: `${item.imgUrl}` });
    }
  }, []);

  // 댓글 삭제 이벤트
  const deleteComment = () => {
    dispatch(
      __deleteComment({
        commentId: item.commentId,
        postId: item.PostId,
      })
    );
  };
  return (
    <>
      {changeState ? (
        <DetailChangeComment commentData={item} btnState={setChangeState} />
      ) : null}

      <CommentBox>
        <CommentImg
          url={profile.image_file ? profile.image_file : profile.preview_URL}
        ></CommentImg>
        <WrapComment>
          <pre>{item.content}</pre>
        </WrapComment>
        <AddCommentButton>완료</AddCommentButton>
      </CommentBox>

      {/* <WrapComment>
        <h3>{item.nickname}</h3>
      </WrapComment>
      <CommentText>
        <pre>{item.content}</pre>
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
      </WrapBtn> */}
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
  pre {
    width: 200px;
    height: 25px;
    padding-top: 13px;
    border: none;
    outline: none;
    font-size: 16px;
    border: 1px solid var(--grey);
    border-radius: 10px;
    background-color: transparent;
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

const CommentBox = styled.div`
  display: flex;
`;

const CommentImg = styled.div`
  margin: 8px 6px 4px 29px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  box-shadow: 5px 5px 4px #877f92;
`;

const AddCommentButton = styled.button`
  margin-top: 15px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  width: 70px;
  height: 30px;
  background-color: #7b758b;
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 4px #877f92;
`;

const Textarea = styled.textarea`
  width: 200px;
  height: 25px;
  padding-top: 13px;
  border: none;
  outline: none;
  font-size: 16px;
  border: 1px solid var(--grey);
  border-radius: 10px;
  background-color: transparent;
  ::placeholder {
  }
  resize: none;
  :focus {
    border: 2px solid var(--greyD);
  }
`;
