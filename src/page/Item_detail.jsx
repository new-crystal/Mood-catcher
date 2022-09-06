import React, { useState, Fragment, Suspense, useRef } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __addComment } from "../redux/modules/commentSlice";
import DetailCommentList from "../components/detailComponents/DetailCommentList";

const junsu = "/images/junsu.PNG";

const Item_detail = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commentList = useSelector((state) => state.comment.comments);

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
    const addState = dispatch(
      __addComment({ comment: commentText.current.value }) // , postId: postId
    );
    commentText.current.value = "";
  };

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
              <span>닉네임</span>
            </ProfileBox>
            <DetailImage>
              <img src={junsu} />
            </DetailImage>
            <ContentText>
              오랜만에 간 아쿠아리움, 원피스가 생각보다 이뻤다.
            </ContentText>
            <Line />
            <SliderContainer>
              <StMusinsaItemBox></StMusinsaItemBox>
              <StMusinsaItemBox></StMusinsaItemBox>
              <StMusinsaItemBox></StMusinsaItemBox>
              <StMusinsaItemBox></StMusinsaItemBox>
              <StMusinsaItemBox></StMusinsaItemBox>
              <StMusinsaItemBox></StMusinsaItemBox>
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
            {commentList?.map((v, l) => {
              return <DetailCommentList key={v.id} commentData={v} />;
            })}
          </Grid>
        </Container>
        <NavigationBar props={props} />
      </Suspense>
    </Fragment>
  );
};

export default Item_detail;

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

const DetailImage = styled.div`
  margin: 0 47px 8px 40px;
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

const StMusinsaItemBox = styled.div`
  width: 150px;
  height: 100px;
  background-color: #e6e5ea;
  border-radius: 15px;
  margin-right: 15px;
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
