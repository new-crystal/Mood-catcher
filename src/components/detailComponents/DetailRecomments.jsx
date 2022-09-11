import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __changeComment } from "../../redux/modules/commentSlice";
import { __addRecomment } from "../../redux/modules/commentSlice";

const DetailRecomments = ({ commentData, btnState, postId }) => {
  const dispatch = useDispatch();
  const commentText = useRef("");
  console.log(commentData);

  const [profile, setProfile] = useState({
    image_file: "",
    preview_URL:
      "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png",
  });

  useEffect(() => {
    if (commentData.imgUrl !== undefined) {
      setProfile({ image_file: `${commentData.imgUrl}` });
    }
  }, []);

  // 댓글 수정하기 이벤트
  const changeComment = () => {
    dispatch(
      __changeComment({
        postId: postId,
        commentId: commentData.commentId,
        comment: commentText.current.value,
      })
    );
    btnState(false);
  };

  useEffect(() => {
    commentText.current.value = commentData.content;
  }, [commentData]);

  // 대댓글 작성하기
  const addRecomment = () => {
    dispatch(
      __addRecomment({ comment: commentText.current.value, commentId: postId }) // , postId: postId
    );
    commentText.current.value = "";
  };
  return (
    <BackgroundDiv>
      <Wrapdiv>
        <h3>댓글</h3>
        <WrapTextarea>
          <CommentChangeTextBox ref={commentText} />
        </WrapTextarea>
        <CommentBox>
          <CommentImg
            url={profile.image_file ? profile.image_file : profile.preview_URL}
          ></CommentImg>
          <WrapComment>
            <Textarea placeholder="댓글을 작성해주세요." ref={commentText} />
          </WrapComment>
          <AddCommentButton onClick={addRecomment}>완료</AddCommentButton>
        </CommentBox>
        <Line />
        {/* {commentList?.map((item, idx) => (
              <DetailCommentList key={idx} item={item} postId={postId} />
            ))} */}
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

export default DetailRecomments;

const BackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
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
  background-color: #a396c9;
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
  margin-left: 10px;
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

const WrapComment = styled.div`
  padding: 10px;
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

const Line = styled.div`
  margin: 0px auto 16px;
  width: 363px;
  border-bottom: 2px solid white;
`;
