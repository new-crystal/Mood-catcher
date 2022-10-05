import React, { useEffect, useState, Fragment, useRef } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token
import Swal from "sweetalert2";
import _ from "lodash";

// 통신
import { __addComment, __getComments } from "../redux/async/comment";
import { deleteAllPosts } from "../redux/modules/rankSlice";
import {
  __getDetail,
  __editRepresentative,
  __deletePost,
} from "../redux/async/upload";
import { __getUser } from "../redux/async/login";
import { __getUsers } from "../redux/async/signup";
import { __patchMood } from "../redux/async/like";

// 컴포넌트
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import DetailCommentList from "../components/detailComponents/DetailCommentList";
import useDetectClose from "../elem/useDetectClose";
import ScrollX from "../elem/ScrollX";
import InfinityScrollLoader from "../elem/InfinityScrollLoader";

// 아이콘
import heartFalse from "../image/heart.png";
import heartTrue from "../image/heartTrue.png";

const more = "/images/more.png";
const upButton = "/images/upArrow.png";
const send = "/images/Send.png";

const Item_detail = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { userId } = useParams();

  const preview_URL =
    "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png";

  const token = localStorage.getItem("token");
  const payload = jwt(token);

  let commentText = useRef("");

  const commentList = useSelector((state) => state.comment.comments);
  const detailPost = useSelector((state) => state.upload.detailPost);
  const detailItems = useSelector((state) => state.upload.detailItems);
  const userStatus = useSelector((state) => state.login.userStatus);
  const userStatusMe = useSelector((state) => state.signup.userStatus);
  const moodNum = useSelector((state) => state.upload.detailPost.likeCount);
  const like = useSelector((state) => state.upload.detailPost.likeStatus);
  const editStatus = useSelector((state) => state.comment.editComment);
  const addCommentStatus = useSelector((state) => state.comment.addComment);
  const delStatus = useSelector((state) => state.comment.delComment);
  const addReStatus = useSelector((state) => state.comment.addReComment);
  const editReStatus = useSelector((state) => state.comment.editReComment);
  const delReStatus = useSelector((state) => state.comment.delReComment);
  const last = useSelector((state) => state.comment.commentLast);

  const [click, setClick] = useState(false);
  const [mood, setMood] = useState(`${heartFalse}`);
  const [likeStatus, setLikeStatus] = useState(like);
  const [paging, setPaging] = useState(1); //페이지넘버
  const [loading, setLoading] = useState(false); //데이터 받아오는동안 로딩 true로 하고 api요청 그동안 한번만되게
  const [isComment, setIsComment] = useState(false);
  // profile_pic를 정하는 부분
  const [profile, setProfile] = useState({
    image_file: "",
    preview_URL:
      "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png",
  });

  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
  const [scrollRef, isDrag, onDragStart, onDragEnd, onThrottleDragMove] =
    ScrollX();

  // 댓글 작성하기
  const addComment = () => {
    dispatch(
      __addComment({
        comment: commentText.current.value,
        postId: postId,
      }) // , postId: postId
    );
    commentText.current.value = "";
    setIsComment(!isComment);
  };

  // 대표 게시물 지정하기
  const patchRep = () => {
    Swal.fire({
      title: "이 게시물을 대표게시물로 지정하겠습니까?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "대표게시물 지정",
      cancelButtonText: "대표게시물 취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "대표게시물 지정 완료",
          "캐처님의 대표게시물로 지정되었습니다.",
          "success"
        );
        dispatch(__editRepresentative(postId));
      }
    });
  };

  // 게시물 수정하기
  const putPost = () => {
    navigate(`/edit_post/${postId}/${detailPost.imgUrl.slice(-18)}`);
  };

  // 게시물 삭제하기
  const deletePost = () => {
    Swal.fire({
      title: "게시물을 삭제하시겠습니까?",
      text: "캐처님의 옷장을 다시 보실 수 없습니다",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(__deletePost(postId))
          .then(dispatch(deleteAllPosts(postId)))
          .then(navigate("/main"));
        Swal.fire(
          "삭제 완료",
          "캐처님의 게시물 삭제에 성공했습니다.",
          "success"
        );
      }
    });
  };

  // 무드 버튼 누르기
  const onClickMoodBtn = () => {
    setLikeStatus(true);
    dispatch(__patchMood(detailPost.postId));
  };

  // 무드버튼 취소하기
  const onClickMoodCancelBtn = () => {
    setLikeStatus(false);
    dispatch(__patchMood(detailPost.postId));
  };

  // 리사이징 에러 났을 경우
  const onErrorHandler = (e) => {
    const url = detailPost.imgUrl.split("w560")[0];
    const name = detailPost.imgUrl.split("w560")[1];
    e.target.src = `${url}post${name}`;
  };

  // toTop버튼
  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollTop;
    SetScrollHeightInfo(scrollHeight);
  }, 300);

  // toTop버튼
  const [scrollHeightInfo, SetScrollHeightInfo] = useState(0);
  const showTopButton = () => {
    if (scrollHeightInfo > 500) {
      //2000px밑으로 스크롤 내려갔을때 위로가는 Top 버튼 보이기
      return (
        <TopButton
          style={{ backgroundImage: `url(${upButton})` }}
          onClick={ScrollToTop}
        >
          <img
            src={`${upButton}`}
            alt=""
            width="0"
            height="0"
            style={{ display: "none !important" }}
          />
        </TopButton>
      );
    } else {
      return null;
    }
  };

  // 실행시 맨위로 올라옴
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 드래그와 클릭 구별하기
  useEffect(() => {
    let drag = false;
    document.addEventListener("mousedown", () => (drag = false));
    document.addEventListener("mousemove", () => (drag = true));
    document.addEventListener("mouseup", () => {
      drag ? setClick(false) : setClick(true);
    });
  }, []);

  // 렌더링시 데이터들 가져옴
  useEffect(() => {
    dispatch(__getDetail(postId));
    dispatch(__getUser(userId));
    dispatch(__getUsers(payload.userId));
    if (userStatus.imgUrl !== undefined) {
      setProfile({ image_file: `${userStatus.imgUrl}` });
    }
    setLikeStatus(like);
  }, [likeStatus, moodNum]);

  // 댓글(새로고침 방지)
  useEffect(() => {
    dispatch(__getComments(postId));
  }, [
    isComment,
    addCommentStatus,
    editStatus,
    delStatus,
    delReStatus,
    addReStatus,
    editReStatus,
  ]);

  //새로고침시에도 무드 상태값 유지
  useEffect(() => {
    if (like === true && likeStatus === true) {
      setMood(`${heartTrue}`);
    }
    if (like === false && likeStatus === false) {
      setMood(`${heartFalse}`);
    }
  }, [mood, like, likeStatus]);

  // toTop버튼
  useEffect(() => {
    window.addEventListener("scroll", _scrollPosition); // scroll event listener 등록
    return () => {
      window.removeEventListener("scroll", _scrollPosition); // scroll event listener 해제(스크롤이벤트 클린업)
    };
  }, [scrollHeightInfo]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []); //첫 렌더링시 맨위로 스크롤 이동

  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <ProfileBox>
            <ProfileImg
              onClick={() => {
                navigate(`/mypage/${userId}`);
              }}
              style={{
                backgroundImage: `url(${
                  userStatus.imgUrl === undefined ||
                  userStatus.imgUrl.slice(-4) === "null"
                    ? preview_URL
                    : userStatus?.imgUrl
                })`,
              }}
            >
              <img
                src={`${
                  userStatus.imgUrl === undefined ||
                  userStatus.imgUrl.slice(-4) === "null"
                    ? preview_URL
                    : userStatus?.imgUrl
                }`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </ProfileImg>
            <NickTitle
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/mypage/${userId}`);
              }}
            >
              <span>{detailPost.title}</span>
              <span className="nickname">{userStatus.nickname}</span>
            </NickTitle>

            {payload.userId == userId ? (
              <DropdownContainer>
                <DropdownButton onClick={myPageHandler} ref={myPageRef}>
                  <StLoginList style={{ backgroundImage: `url(${more})` }}>
                    <img
                      src={`${more}`}
                      alt=""
                      width="0"
                      height="0"
                      style={{ display: "none !important" }}
                    />
                  </StLoginList>
                </DropdownButton>
                <Menu isDropped={myPageIsOpen}>
                  <Ul>
                    <Li>
                      <LinkWrapper href="#1-1">
                        <DropBtn onClick={patchRep}>
                          대표 게시물 지정하기
                        </DropBtn>
                        <DropBtn onClick={putPost}>수정하기</DropBtn>
                        <DropBtn onClick={deletePost}>삭제하기</DropBtn>
                      </LinkWrapper>
                    </Li>
                  </Ul>
                </Menu>
              </DropdownContainer>
            ) : null}
          </ProfileBox>

          <DetailImage>
            <img
              src={detailPost.imgUrl}
              alt="detail_img"
              onError={onErrorHandler}
            />
          </DetailImage>
          <HeartBox>
            <ImgBox>
              {likeStatus ? (
                <img
                  style={{ cursor: "pointer" }}
                  className="heart"
                  src={mood}
                  alt="heart"
                  onClick={onClickMoodCancelBtn}
                />
              ) : (
                <img
                  style={{ cursor: "pointer" }}
                  className="heart"
                  src={mood}
                  alt="heart"
                  onClick={onClickMoodBtn}
                />
              )}
              <span>{moodNum}</span>
              <div>{detailPost?.createdAt?.slice(2, 10)}</div>
            </ImgBox>
          </HeartBox>

          <ContentText>
            <div>{detailPost.content}</div>
          </ContentText>
          <Line />
          <SliderContainer
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={isDrag ? onThrottleDragMove : null}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            {detailItems?.map((item, idx) => (
              <StMusinsaItemBox
                key={idx}
                click={click}
                onClick={() => {
                  if (item.url === null) {
                    Swal.fire({
                      icon: "info",
                      title: "무신사 링크가 아직 없습니다...",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  } else if (click) window.open(`${item.url}`, "_black");
                }}
              >
                <StMusinsaImage>
                  <div className="ImgDiv">
                    <img src={item.imgUrl} alt="" />
                  </div>
                </StMusinsaImage>
                <StTextBox>
                  {item.length === 0 ? (
                    <Fragment>
                      <StText>이름</StText>
                      <StText>가격</StText>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <StText>{item.name}</StText>
                      {item.price.indexOf(" ") !== -1 ? (
                        <StText>
                          {item.price.slice(item.price.indexOf(" "))}
                        </StText>
                      ) : (
                        <StText>{item.price}</StText>
                      )}
                    </Fragment>
                  )}
                </StTextBox>
              </StMusinsaItemBox>
            ))}
          </SliderContainer>
          <CommentBox>
            <CommentImg
              style={{
                backgroundImage: `url(${
                  userStatusMe.imgUrl === undefined ||
                  userStatusMe.imgUrl.slice(-4) === "null"
                    ? preview_URL
                    : userStatusMe?.imgUrl
                })`,
              }}
            >
              <img
                src={`${
                  userStatusMe.imgUrl === undefined ||
                  userStatusMe.imgUrl.slice(-4) === "null"
                    ? preview_URL
                    : userStatusMe?.imgUrl
                }`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </CommentImg>
            <WrapComment>
              <textarea
                placeholder="댓글을 작성해주세요."
                ref={commentText}
                maxLength={50}
              />
            </WrapComment>
            <AddCommentButton
              style={{ backgroundImage: `url(${send})` }}
              onClick={addComment}
            >
              <img
                src={`${send}`}
                alt=""
                width="0"
                height="0"
                style={{ display: "none !important" }}
              />
            </AddCommentButton>
          </CommentBox>
          <Line />
          {commentList?.map((item, idx) => (
            <DetailCommentList
              key={idx}
              item={item}
              postId={postId}
              userId={userId}
            />
          ))}
          {loading ? <InfinityScrollLoader /> : ""}
          {showTopButton()}
        </Grid>
      </Container>
      <NavigationBar props={props} />
    </Fragment>
  );
};

export default Item_detail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: auto;
    text-align: left;
  }
`;

const Grid = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 57px;
  max-width: 428px;
  width: 100vw;
  padding-bottom: 60px;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 330px;
  margin: 0 auto;
`;

const ProfileImg = styled.div`
  margin: 5px 6px 4px 0px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  box-shadow: 5px 5px 4px #877f92;
`;

const NickTitle = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  & > span {
    font-size: 16px;
    color: black;
  }
  .nickname {
    font-size: 12px;
    color: black;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

const StLoginList = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

const Menu = styled.div`
  background: gray;
  position: absolute;
  top: 52px;
  left: -235%;
  width: 200px;
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
    left: 69%;
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
      left: -235%;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }
  & > li:first-of-type {
    margin-top: 10px;
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

const DropBtn = styled.button`
  margin-top: 15px;
  text-align: center;
  color: black;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  width: 180px;
  height: 30px;
  background-color: white;
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 4px #877f92;
`;

const DetailImage = styled.div`
  margin: 4px auto 40px;
  border-radius: 20px;
  width: 341px;
  height: 452px;
  background-color: #ffffff;

  & > img {
    width: 341px;
    height: 452px;
    border-radius: 20px;
  }
`;

const HeartBox = styled.div`
  margin: -30px auto 0;
  width: 336px;
  display: flex;
`;

const ImgBox = styled.div`
  display: flex;
  opacity: 70%;

  &.heart {
    width: 35px;
    height: 35px;
    margin-left: 5px;
  }
  & > span {
    font-size: 18px;
    width: 225px;
    margin-top: 7px;
    margin-left: 7px;
    align-items: center;
  }
  & > div {
    font-size: 12px;
  }
`;

const ContentText = styled.div`
  margin: 10px auto 10px;
  padding-left: 10px;
  font-size: 16px;
  width: 336px;
`;

const Line = styled.div`
  margin: 0px auto 16px;
  width: 363px;
  border-bottom: 2px solid white;
`;

const SliderContainer = styled.div`
  margin: 0 auto 0;
  width: 350px;
  overflow: hidden;
  display: flexbox;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  &.true {
    display: none;
    margin: 0;
  }
  transition: 0.5s;
`;

const StMusinsaItemBox = styled.div`
  margin-right: 8px;
  display: flex;
  width: 200px;
  height: 100px;
  background-color: #dbd4f1;
  border-radius: 15px;
  font-size: 20px;
  outline: none;
  text-align: center;
  cursor: pointer;
  &.true {
    height: 0;
  }
  transition: 0.5s;
`;

const StMusinsaImage = styled.div`
  margin: 13px 12px 12px;
  width: 75px;
  height: 75px;
  border-radius: 15px;
  .ImgDiv {
    width: 100%;
    height: 75px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    img {
      /* flex: 1 1 auto; */
    }
  }
  transition: display 0.5s, height 0.5s;
`;

const StTextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StText = styled.span`
  margin-top: 18px;
  margin-right: 6px;
  font-size: 8px;
  color: #7b758b;
  font-weight: bold;
`;

const CommentBox = styled.div`
  margin: 0 auto 0;
  justify-content: center;
  display: flex;
`;

const CommentImg = styled.div`
  margin: 8px 6px 4px 0px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  box-shadow: 5px 5px 4px #877f92;
`;

const WrapComment = styled.div`
  width: 254px;
  margin: 10px 5px 10px;
  background: #e6e5ea;
  border-radius: 15px;
  outline: none;
  & > textarea {
    width: 225px;
    height: 45px;
    border: none;
    outline: none;
    resize: none;
    box-sizing: border-box;
    padding: 6px 0 0 0;
    margin-left: 10px;
    font-family: "Noto Sans KR", sans-serif;
    background: #e6e5ea;
    font-size: 20px;
  }
`;

const AddCommentButton = styled.div`
  margin-top: 17px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  border: none;
`;

const TopButton = styled.div`
  position: fixed;
  bottom: 74px;
  left: 50%;
  margin-left: -20px;
  width: 40px;
  height: 40px;
  background-size: cover;
  cursor: pointer;
`;
