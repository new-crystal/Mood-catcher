import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux/es/exports";
import { __deleteComment } from "../../redux/async/comment";
import DetailChangeComment from "./DetailChangeComments";
import DetailRecomments from "./DetailRecomments";
import { getCookie } from "../../shared/cookie";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useDetectClose from "../../elem/useDetectClose";

const more = "/images/more.png";
const chat = "/images/chat.png";

// 상세페이지에 댓글 list 컴포넌트
const DetailCommentList = (props) => {
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { item } = props;
  const { postId } = props;
  const { userId } = props;

  const token = getCookie("token");
  const payload = jwt(token);

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
          onClick={() => {
            navigate(`/mypage/${item.userId}`);
            window.location.reload();
          }}
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
          {/* <pre>{item.content}</pre> */}
          <textarea>{item.content}</textarea>
        </WrapComment>
        <R_Count
          onClick={() => {
            setRecommentState(true);
          }}
        >
          <div>{item.recommentCount}</div>
        </R_Count>

        {payload.userId == item.userId ? (
          <DropdownContainer>
            <DropdownButton onClick={myPageHandler} ref={myPageRef}>
              <StLoginList />
            </DropdownButton>
            <Menu isDropped={myPageIsOpen}>
              <Ul>
                <Li>
                  <LinkWrapper href="#1-1">
                    <AddCommentButton2
                      onClick={() => {
                        setChangeState(true);
                      }}
                    >
                      수정
                    </AddCommentButton2>
                    <AddCommentButton2
                      onClick={() => {
                        Swal.fire({
                          title: "이 댓글을 삭제하시겠습니까?",
                          text: "댓글을 삭제하시면 되돌리실 수 없습니다",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "댓글 삭제",
                          cancelButtonText: "삭제 취소",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire(
                              "삭제완료",
                              "캐처님의 댓글이 삭제되었습니다.",
                              "success"
                            );
                            deleteComment();
                            window.location.reload();
                          }
                        });
                      }}
                    >
                      삭제
                    </AddCommentButton2>
                  </LinkWrapper>
                </Li>
              </Ul>
            </Menu>
          </DropdownContainer>
        ) : (
          <Dummy></Dummy>
        )}
      </CommentBox>
      <StLine></StLine>
    </>
  );
};

export default DetailCommentList;

const StLine = styled.div`
  width: 360px;
  height: 1px;
  margin: 0 auto;
  background-color: #d5d5d5;
`;

const Dummy = styled.div`
  width: 30px;
`;

const R_Count = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 30px;
  height: 30px;
  margin-top: 20px;
  opacity: 70%;
  font-size: 15px;
  /* margin-left: -10px; */
  /* align-items: center; */
  background-image: url(${chat});
  background-size: 30px;
  background-repeat: no-repeat;
  font-family: "Noto Sans KR", sans-serif;
  div {
    margin: 4px auto 0;
  }
`;

const WrapComment = styled.div`
  width: 245px;
  /* display: flex; */
  justify-content: space-between;
  /* padding: 0 20px; */
  margin-top: 9px;
  /* background-color: orange; */
  /* border: 1px solid black; */
  border-radius: 10px;
  span {
    font-size: 0.313rem;
    margin-left: 5px;
  }
  /* pre {
    width: 240px;
    margin-top: 5px;
    height: 20px;
    background-color: royalblue;
    //padding-top: 7px;
    margin-left: 3px;
    border: none;
    outline: none;
    overflow: hidden;
    font-size: 16px;
    font-family: "Noto Sans KR", sans-serif;
    //border: 1px solid black;
    border-radius: 5px;
    background-color: transparent;
  } */
  textarea {
    width: 230px;
    resize: none;
    height: 70px;
    background-color: royalblue;
    /* padding-top: 7px; */
    /* margin-top: 20px; */
    margin-left: 3px;
    border: none;
    outline: none;
    overflow: hidden;
    font-size: 16px;
    font-family: "Noto Sans KR", sans-serif;
    /* border: 1px solid black; */
    border-radius: 5px;
    background-color: transparent;
  }
`;

const CommentBox = styled.div`
  margin: 0 auto 0;
  display: flex;
  justify-content: center;
`;

const CommentImg = styled.div`
  margin: 8px 6px 4px 8px;
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

const DropdownContainer = styled.div`
  position: relative;
  margin-top: 13px;
  text-align: center;
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

const StLoginList = styled.div`
  background-image: url(${more});
  width: 30px;
  height: 30px;
  /* margin-right: 50px; */
  margin: 5px 0 0 0;
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

const AddCommentButton2 = styled.button`
  margin-top: 5px;
  text-align: center;
  color: black;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  width: 61px;
  height: 20px;
  background-color: white;
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 4px #877f92;
`;

const Menu = styled.div`
  background: gray;
  position: absolute;
  top: 52px;
  left: -45%;
  width: 85px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 50;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 25%;
    transform: translate(150%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: -45%;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 5px;
  }

  & > li:first-of-type {
    margin-top: 0px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li``;

const LinkWrapper = styled.div`
  font-size: 16px;
  text-decoration: none;
  color: white;
`;
