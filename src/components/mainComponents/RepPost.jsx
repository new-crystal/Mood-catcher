import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import heartFalse from "../../image/heart.png";
import heartTrue from "../../image/heartTrue.png";
import { useDispatch } from "react-redux";
import { __patchMood } from "../../redux/modules/likeSlice";

const junsu = "/images/junsu.PNG";
const noimage = "/images/noimage.PNG";

const heart = "/images/heart.png";

const RepPost = ({ myRepPost }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likeStatus, setLikeStatus] = useState(myRepPost?.likeStatus);
  const [mood, setMood] = useState(`${heartFalse}`);
  const [moodNum, setMoodNum] = useState(myRepPost?.likeCount);
  console.log(myRepPost);

  //새로고침시에도 무드 상태값 유지
  useEffect(() => {
    if (likeStatus === true) {
      setMood(`${heartTrue}`);
    }
    if (likeStatus === false) {
      setMood(`${heartFalse}`);
    }
  }, [mood, likeStatus, myRepPost]);

  //무드 버튼 누르기
  const onClickMoodBtn = () => {
    setMoodNum(moodNum + 1);
    setLikeStatus(true);
    dispatch(__patchMood(myRepPost?.postId));
  };

  //무드버튼 취소하기
  const onClickMoodCancelBtn = () => {
    setMoodNum(moodNum - 1);
    setLikeStatus(false);
    dispatch(__patchMood(myRepPost?.postId));
  };

  return (
    <Fragment>
      {/* 대표게시물 조회 */}
      <Wrap>
        <StTag>My Closet</StTag>
      </Wrap>
      {myRepPost.userId === undefined ? (
        <WritedClosetInfo
          onClick={() => {
            navigate(`/closet/${myRepPost.userId}`);
            window.location.reload();
          }}
        >
          <ClosetImage>
            <img src={noimage} />
          </ClosetImage>
          <ClosetTextWrap>
            <GridHorizon>
              <TitleText>
                <span>대표게시물</span>
              </TitleText>
              <ContentText>
                {/* <span>{myRepPost?.createdAt.slice(5)}</span> */}
                <span>{myRepPost?.createdAt}</span>
                <br />
                <span>지정해주세요</span>
              </ContentText>
            </GridHorizon>
          </ClosetTextWrap>
        </WritedClosetInfo>
      ) : (
        <WritedClosetInfo
          onClick={() => {
            navigate(`/closet/${myRepPost.userId}`);
            window.location.reload();
          }}
        >
          <ClosetImage>
            <img src={myRepPost.imgUrl} />
          </ClosetImage>
          <ClosetTextWrap>
            <GridHorizon>
              <CreatedText>
                <span>{myRepPost?.createdAt.slice(0, 10)}</span>
              </CreatedText>
              <TitleText>
                <span>{myRepPost.title}</span>
              </TitleText>
              <ContentText>
                {/* <span>{myRepPost?.createdAt.slice(5)}</span> */}

                <br />
                <span>{myRepPost?.content}</span>
              </ContentText>
            </GridHorizon>
          </ClosetTextWrap>
        </WritedClosetInfo>
      )}
    </Fragment>
  );
};

const Wrap = styled.div`
  margin: 21px auto 10px;
  width: 350px;
`;

const StTag = styled.div`
  margin-bottom: 10px;
  width: 200px;
  height: 40px;
  border-radius: 17px;
  background: linear-gradient(to right, #7b758b 50%, #c8c6d0);
  text-align: center;
  line-height: 40px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Unna";
  color: white;
  box-shadow: 5px 5px 4px #877f92;
`;

const WritedClosetInfo = styled.div`
  display: flex;
  margin: 0px auto 37px;
  width: 350px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 5px 5px 4px #877f92;
`;

const ClosetImage = styled.div`
  margin: 13px;
  border-radius: 10px;
  width: 80px;
  height: 90px;
  background-color: #ffffff;

  & > img {
    width: 131px;
    height: 174px;
    border-radius: 20px;
    box-shadow: 5px 5px 4px #877f92;
  }
`;

const ClosetTextWrap = styled.div`
  margin: 12px 0 30px 50px;
  width: 180px;
  height: 150px;
  word-break: break-all;
  word-wrap: break-word;
`;

const GridHorizon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
`;

const CreatedText = styled.div`
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  text-align: end;
  color: #7b758b;
`;

const TitleText = styled.div`
  margin-top: 30px;
  font-size: 21px;
  font-weight: 700;
  line-height: 20px;
  color: #7b758b;
`;

const ContentText = styled.div`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 15px;
  color: #7b758b;
`;

const HeartText = styled.div`
  display: flex;
  margin-top: 21px;
  align-items: center;
  & > span {
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #7b758b;
  }
  & > img {
    margin-right: 2px;
    width: 20px;
    height: 20px;
  }
`;

export default RepPost;
