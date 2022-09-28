import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
} from "react";
import styled, { css } from "styled-components";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __addComment, __getComments } from "../redux/async/comment";
import {
  __getDetail,
  __editRepresentative,
  __deletePost,
} from "../redux/async/upload";
import { __getUser } from "../redux/async/login";
import { __getUsers } from "../redux/async/signup";

import DetailCommentList from "../components/detailComponents/DetailCommentList";
import { useParams } from "react-router-dom";
import { getCookie } from "../shared/cookie";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token
import useDetectClose from "../elem/useDetectClose";
import ScrollX from "../elem/ScrollX";
import heartFalse from "../image/heart.png";
import heartTrue from "../image/heartTrue.png";
import { __patchMood } from "../redux/async/like";
import Swal from "sweetalert2";
import _ from "lodash";
import InfinityScrollLoader from "../elem/InfinityScrollLoader";

const more = "/images/more.png";
const upButton = "/images/upArrow.png";

const Item_detail = (props) => {
  const preview_URL =
    "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png";

  const token = getCookie("token");
  const payload = jwt(token);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commentList = useSelector((state) => state.comment.comments);
  const { postId } = useParams();
  const { userId } = useParams();

  const detailPost = useSelector((state) => state.upload.detailPost);
  const detailItems = useSelector((state) => state.upload.detailItems);
  const userStatus = useSelector((state) => state.login.userStatus);
  const userStatusMe = useSelector((state) => state.signup.userStatus);
  const comments = useSelector((state) => state.comment.comments);

  const [mood, setMood] = useState(`${heartFalse}`);
  const like = useSelector((state) => state.upload.detailPost.likeStatus);
  const [likeStatus, setLikeStatus] = useState(like);
  const moodNum = useSelector((state) => state.upload.detailPost.likeCount);
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
  const [scrollRef, isDrag, onDragStart, onDragEnd, onThrottleDragMove] =
    ScrollX();

  const [paging, setPaging] = useState(1); //페이지넘버
  const [loading, setLoading] = useState(false); //데이터 받아오는동안 로딩 true로 하고 api요청 그동안 한번만되게
  const last = useSelector((state) => state.comment.commentLast);

  // 댓글 input
  let commentText = useRef("");

  // profile_pic를 정하는 부분
  const [profile, setProfile] = useState({
    image_file: "",
    preview_URL:
      "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png",
  });

  // 댓글 작성하기
  const addComment = () => {
    dispatch(
      __addComment({ comment: commentText.current.value, postId: postId }) // , postId: postId
    );
    commentText.current.value = "";
    window.location.reload();
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
    navigate(`/edit_post/${postId}`);
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
        Swal.fire(
          "삭제 완료",
          "캐처님의 게시물 삭제에 성공했습니다.",
          "success"
        );
        dispatch(__deletePost(postId));
      }
    });
  };

  useEffect(() => {
    dispatch(__getDetail(postId));
    dispatch(__getUser(userId));
    dispatch(__getUsers(payload.userId));
    dispatch(__getComments(postId));
    if (userStatus.imgUrl !== undefined) {
      setProfile({ image_file: `${userStatus.imgUrl}` });
    }
    setLikeStatus(like);
  }, [likeStatus, moodNum]);

  //새로고침시에도 무드 상태값 유지
  useEffect(() => {
    if (like === true && likeStatus === true) {
      setMood(`${heartTrue}`);
    }
    if (like === false && likeStatus === false) {
      setMood(`${heartFalse}`);
    }
  }, [mood, like, likeStatus]);

  //무드 버튼 누르기
  const onClickMoodBtn = () => {
    setLikeStatus(true);
    dispatch(__patchMood(detailPost.postId));
  };

  //무드버튼 취소하기
  const onClickMoodCancelBtn = () => {
    setLikeStatus(false);
    dispatch(__patchMood(detailPost.postId));
  };

  //리사이징 에러 났을 경우
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
      return <TopButton onClick={ScrollToTop}></TopButton>;
    } else {
      return null;
    }
  };

  // toTop버튼
  useEffect(() => {
    window.addEventListener("scroll", _scrollPosition); // scroll event listener 등록
    return () => {
      window.removeEventListener("scroll", _scrollPosition); // scroll event listener 해제(스크롤이벤트 클린업)
    };
  }, [scrollHeightInfo]);

  // 실행시 맨위로 올라옴
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <ProfileBox>
            <ProfileImg
              onClick={() => {
                navigate(`/mypage/${userId}`);
                window.location.reload();
              }}
              url={
                userStatus.imgUrl === undefined ||
                userStatus.imgUrl.slice(-4) === "null"
                  ? preview_URL
                  : userStatus?.imgUrl
              }
            ></ProfileImg>
            <NickTitle
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/mypage/${userId}`);
                window.location.reload();
              }}
            >
              <span>{detailPost.title}</span>
              <span className="nickname">{userStatus.nickname}</span>
            </NickTitle>

            {payload.userId == userId ? (
              <DropdownContainer>
                <DropdownButton onClick={myPageHandler} ref={myPageRef}>
                  <StLoginList />
                </DropdownButton>
                <Menu isDropped={myPageIsOpen}>
                  <Ul>
                    <Li>
                      <LinkWrapper href="#1-1">
                        <AddCommentButton2 onClick={patchRep}>
                          대표 게시물 지정하기
                        </AddCommentButton2>
                        <AddCommentButton2 onClick={putPost}>
                          수정하기
                        </AddCommentButton2>
                        <AddCommentButton2 onClick={deletePost}>
                          삭제하기
                        </AddCommentButton2>
                      </LinkWrapper>
                    </Li>
                  </Ul>
                </Menu>
              </DropdownContainer>
            ) : null}
          </ProfileBox>
          {/* <TitleText>{detailPost.title}</TitleText> */}

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
              <StMusinsaItemBox key={idx}>
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
              url={
                userStatusMe.imgUrl === undefined ||
                userStatusMe.imgUrl.slice(-4) === "null"
                  ? preview_URL
                  : userStatusMe?.imgUrl
              }
            ></CommentImg>
            <WrapComment>
              <Textarea
                placeholder="댓글을 작성해주세요."
                ref={commentText}
                maxLength={15}
              />
            </WrapComment>
            <AddCommentButton onClick={addComment}>완료</AddCommentButton>
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

const HeartBox = styled.div`
  margin: -30px auto 0;
  width: 336px;
  display: flex;
`;

const ImgBox = styled.div`
  /* margin: 0 20px 0 40px; */
  display: flex;
  opacity: 70%;

  &.heart {
    width: 35px;
    height: 35px;
    /* position: relative; */
    /* top: 0px; */
    /* left: 50px; */
    margin-left: 5px;
  }
  & > span {
    font-size: 18px;
    width: 225px;
    margin-top: 7px;
    margin-left: 7px;
    align-items: center;

    /* position: relative;
    top: -10px; */
    /* left: 55px; */
  }
  & > div {
    font-size: 12px;
    margin-top: -10px;
  }
`;

const StLoginList = styled.div`
  background-image: url(${more});
  width: 30px;
  height: 30px;
  /* margin-right: 50px; */
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 926px; */
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
  //height: calc(var(--vh, 1vh) * 100 + 50px);
  min-height: 926px;

  background: linear-gradient(#a396c9, #ffffff);
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const ProfileImg = styled.div`
  margin: 5px 6px 4px 5px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  box-shadow: 5px 5px 4px #877f92;
`;

const NickTitle = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
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

// const TitleText = styled.div`
//   margin: 0 48px 10px 42px;
//   font-size: 16px;
// `;

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
    //box-shadow: 5px 5px 4px #877f92;
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

// const StMusinsaItemBox = styled.div`
//   width: 150px;
//   height: 100px;
//   background-color: #e6e5ea;
//   border-radius: 15px;
//   margin-right: 15px;
//   font-size: 20px;
//   outline: none;
//   text-align: center;
//   cursor: pointer;
//   &.true {
//     height: 0;
//   }
//   transition: 0.5s;
// `;

const StMusinsaItemBox = styled.div`
  margin-right: 8px;
  display: flex;
  width: 200px;
  height: 100px;
  background-color: white;
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

const CommentBox = styled.div`
  margin: 0 auto 0;
  justify-content: center;
  display: flex;
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

const WrapComment = styled.div`
  padding: 10px;
`;

const Textarea = styled.textarea`
  width: 200px;
  height: 25px;
  padding-top: 10px;
  border: none;
  outline: none;
  font-size: 16px;
  border: 1px solid var(--grey);
  border-radius: 10px;
  background-color: transparent;
  font-family: "Noto Sans KR", sans-serif;
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

const AddCommentButton2 = styled.button`
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

const StMusinsaImage = styled.div`
  margin: 13px 12px 12px;
  width: 75px;
  height: 75px;
  border-radius: 15px;
  .ImgDiv {
    /* background-color: orange; */
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

const TopButton = styled.div`
  position: fixed;
  bottom: 74px;
  left: 50%;
  margin-left: -20px;
  width: 40px;
  height: 40px;
  background-image: url(${upButton});
  background-size: cover;
  cursor: pointer;
`;
