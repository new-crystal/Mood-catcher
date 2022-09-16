import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux/es/exports";
import { __deleteComment } from "../../redux/modules/commentSlice";
import DetailChangeComment from "./DetailChangeComments";
import DetailRecomments from "./DetailRecomments";
import { getCookie } from "../../shared/cookie";
import jwt_decode from "jwt-decode";

// 상세페이지에 댓글 list 컴포넌트
const DetailCommentList = (props) => {
  const dispatch = useDispatch();
  const { item } = props;
  const { postId } = props;
  const token = getCookie("token");
  const payload = jwt_decode(token);

  const preview_URL =
    "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png";

  // profile_pic를 정하는 부분
  const [profile, setProfile] = useState({
    image_file: "",
    preview_URL:
      "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png",
  });

  // 수정 토글 창 관리 state
  const [changeState, setChangeState] = useState(false);
  const [recommentState, setRecommentState] = useState(false);

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
      })
    );
  };
  return (
    <>
      {changeState ? (
        <DetailChangeComment
          commentData={item}
          btnState={setChangeState}
          postId={postId}
        />
      ) : null}

      {recommentState ? (
        <DetailRecomments
          commentData={item}
          btnState={setRecommentState}
          postId={postId}
        />
      ) : null}

      <CommentBox>
        <CommentImg
          url={
            item.imgUrl === undefined || item.imgUrl.slice(-4) === "null"
              ? preview_URL
              : item?.imgUrl
          }
        ></CommentImg>
        <WrapComment
          onClick={() => {
            setRecommentState(true);
          }}
        >
          <span>{item.createdAt}</span>
          <span>작성자 : {item.nickname}</span>
          <pre>{item.content}</pre>
        </WrapComment>
        {payload.userId == item.userId ? (
          <>
            <AddCommentButton
              onClick={() => {
                setChangeState(true);
              }}
            >
              수정
            </AddCommentButton>
            <AddCommentButton
              onClick={() => {
                deleteComment();
              }}
            >
              삭제
            </AddCommentButton>
          </>
        ) : null}
      </CommentBox>
    </>
  );
};

export default DetailCommentList;

const WrapComment = styled.div`
  /* display: flex; */
  justify-content: space-between;
  /* padding: 0 20px; */
  /* margin-top: 7px; */
  /* background-color: orange; */
  /* border: 1px solid black; */
  border-radius: 10px;
  span {
    font-size: 5px;
    margin-left: 5px;
  }
  pre {
    width: 240px;
    margin-top: 5px;
    height: 16px;
    background-color: royalblue;
    /* padding-top: 7px; */
    margin-left: 3px;
    border: none;
    outline: none;
    overflow: hidden;
    font-size: 16px;
    /* border: 1px solid black; */
    border-radius: 5px;
    background-color: transparent;
  }
`;

const CommentBox = styled.div`
  display: flex;
`;

const CommentImg = styled.div`
  margin: 8px 6px 4px 23px;
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
  font-size: 8px;
  font-weight: bold;
  line-height: 20px;
  width: 35px;
  height: 30px;
  background-color: #7b758b;
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 4px #877f92;
`;
