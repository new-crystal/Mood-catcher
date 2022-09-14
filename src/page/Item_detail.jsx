import React, { useEffect, useState, Fragment, Suspense, useRef } from "react";
import styled, { css } from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __addComment, __getComments } from "../redux/modules/commentSlice";
import {
  __getDetail,
  __representative,
  __deletePost,
} from "../redux/modules/uploadSlice";
import { __getUser } from "../redux/modules/loginSlice";
import DetailCommentList from "../components/detailComponents/DetailCommentList";
import { Link, useParams } from "react-router-dom";
import { deleteCookie, getCookie } from "../shared/cookie";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token
import useDetectClose from "../elem/useDetectClose";

const junsu = "/images/junsu.PNG";
const home = "/images/more.png";

const Item_detail = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commentList = useSelector((state) => state.comment.comments);
  const { postId } = useParams();
  const { userId } = useParams();

  const detailPost = useSelector((state) => state.upload.detailPost);
  const detailItems = useSelector((state) => state.upload.detailItems);
  const userStatus = useSelector((state) => state.login.userStatus);
  const comments = useSelector((state) => state.comment.comments);

  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);

  console.log(postId);
  console.log(userId);

  console.log(detailPost);
  console.log(detailItems);
  console.log(userStatus);
  console.log(comments);

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
  };
  // 대표 게시물 지정하기
  const patchRep = () => {
    dispatch(__representative(postId));
  };
  // 게시물 수정하기
  const putPost = () => {
    navigate(`/edit_post/${postId}`);
  };
  // 게시물 삭제하기
  const deletePost = () => {
    dispatch(__deletePost(postId));
  };

  useEffect(() => {
    dispatch(__getDetail(postId));
    dispatch(__getUser(userId));
    dispatch(__getComments(postId));
    if (userStatus.imgUrl !== undefined) {
      setProfile({ image_file: `${userStatus.imgUrl}` });
    }
  }, []);

  return (
    <Fragment>
      <Suspense
        fallback={
          <LoaderWrap>
            <Loader />
          </LoaderWrap>
        }
      >
        <Header />
        <Container>
          <Grid>
            <ProfileBox>
              <ProfileImg
                url={
                  profile.image_file ? profile.image_file : profile.preview_URL
                }
              ></ProfileImg>
              <span>{userStatus.nickname}</span>
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
            </ProfileBox>
            {/* <TitleText>{detailPost.title}</TitleText> */}

            <DetailImage>
              <img src={detailPost.imgUrl} />
            </DetailImage>
            <ContentText>{detailPost.content}</ContentText>
            <Line />
            <SliderContainer>
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
                        <StText>{item.price}</StText>
                      </Fragment>
                    )}
                  </StTextBox>
                </StMusinsaItemBox>
              ))}
            </SliderContainer>
            <CommentBox>
              <CommentImg
                url={
                  profile.image_file ? profile.image_file : profile.preview_URL
                }
              ></CommentImg>
              <WrapComment>
                <Textarea
                  placeholder="댓글을 작성해주세요."
                  ref={commentText}
                />
              </WrapComment>
              <AddCommentButton onClick={addComment}>완료</AddCommentButton>
            </CommentBox>
            <Line />
            {commentList?.map((item, idx) => (
              <DetailCommentList key={idx} item={item} postId={postId} />
            ))}
          </Grid>
        </Container>
        <NavigationBar props={props} />
      </Suspense>
    </Fragment>
  );
};

export default Item_detail;

const StLoginList = styled.div`
  background-image: url(${home});
  width: 40px;
  height: 40px;
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

const LoaderWrap = styled.div`
  position: absolute;
  margin-top: -100px;
  margin-left: -100px;
  top: 50%;
  left: 50%;
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
  width: 428px;
  min-height: 926px;

  background: linear-gradient(#a396c9, #c8c6d0);
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  & > span {
    font-size: 16px;
    color: black;
  }
`;

const ProfileImg = styled.div`
  margin: 5px 6px 4px 43px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  box-shadow: 5px 5px 4px #877f92;
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
  margin-left: 220px;
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

const Menu = styled.div`
  background: gray;
  position: absolute;
  top: 52px;
  left: -75%;
  width: 200px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
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
      left: -75%;
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
  margin: 4px 47px 8px 40px;
  border-radius: 20px;
  width: 341px;
  height: 452px;
  background-color: #ffffff;

  & > img {
    width: 341px;
    height: 452px;
    border-radius: 20px;
    box-shadow: 5px 5px 4px #877f92;
  }
`;

const ContentText = styled.div`
  margin: 0 48px 10px 42px;
  font-size: 16px;
`;

const Line = styled.div`
  margin: 0px auto 16px;
  width: 363px;
  border-bottom: 2px solid white;
`;

const SliderContainer = styled.div`
  margin: 0 29px;
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
  background-color: #e6e5ea;
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
  font-size: 16px;
  color: #7b758b;
  font-weight: bold;
`;
