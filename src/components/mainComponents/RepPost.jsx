import React, { Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const noimage = "/images/noimage.PNG";

const RepPost = ({ myRepPost }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* 대표게시물 조회 */}
      <Wrap>
        <StTag>My Closet</StTag>
      </Wrap>
      {myRepPost.userId === undefined ? (
        <WritedClosetInfo
          onClick={() => {
            Swal.fire(
              "대표게시물을 찾을 수 없습니다",
              "캐처님의 게시물 상세페이지에서 대표 게시물을 등록해주세요",
              "question"
            );
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
            navigate(`/closet/${myRepPost?.userId}`);
            window.location.reload();
          }}
        >
          <ClosetImage>
            <img src={myRepPost?.imgUrl} />
          </ClosetImage>
          <ClosetTextWrap>
            <GridHorizon>
              <CreatedText>
                <span>{myRepPost?.createdAt.slice(0, 10)}</span>
              </CreatedText>
              <TitleText>
                <span>{myRepPost?.title}</span>
              </TitleText>
              <ContentText>
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
  margin-bottom: -10px;
  width: 200px;
  height: 40px;
  border-radius: 17px;
  //background: linear-gradient(to right, #7b758b 50%, #c8c6d0);
  text-align: center;
  line-height: 40px;
  margin-left: -25px;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  font-family: "Unna";
  line-height: 35px;
  color: #2d273f;
  //box-shadow: 5px 5px 4px #877f92;
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
    //box-shadow: 5px 5px 4px #877f92;
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
