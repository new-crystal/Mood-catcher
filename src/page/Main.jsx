import React, { useState, Fragment, Suspense, useEffect } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __userInfo } from "../redux/modules/loginSlice";

const junsu = "./images/junsu.PNG";
const heart = "./images/heart.png";

const Main = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 대표게시물 불러옴
  const myRepPost = useSelector((state) => state.upload.myRepPost);
  // 랭크게시물 불러옴
  const allPosts = useSelector;

  // 유저정보를 불러와서 토큰이 없다면 다시 로그인
  // useEffect(() => {
  //   dispatch(__userInfo());
  // }, []);

  // profile_pic를 정하는 부분
  const [profile, setProfile] = useState({
    image_file: "",
    preview_URL:
      "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png",
  });

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
            {/* image_file이 있으면 image_file을 출력 */}
            <Img
              url={
                profile.image_file ? profile.image_file : profile.preview_URL
              }
            ></Img>
            {/* 대표게시물 조회 */}
            <Wrap>
              <StTag>My Closet</StTag>
            </Wrap>
            <WritedClosetInfo
              onClick={() => {
                navigate("/Closet");
              }}
            >
              <ClosetImage>
                <img src={junsu} />
              </ClosetImage>
              <ClosetTextWrap>
                <GridHorizon>
                  <TitleText>
                    <span>내 다리 롱다리</span>
                  </TitleText>
                  <ContentText>
                    <span>
                      00/00 사진관에서 사진찍고 거울샷 찍었는데 길게 나와서
                      맘에든다.
                    </span>
                  </ContentText>
                  <HeartText>
                    <img src={heart} alt="heart" />
                    <span>100+</span>
                  </HeartText>
                </GridHorizon>
              </ClosetTextWrap>
            </WritedClosetInfo>
            <Wrap>
              <StTag>Hot</StTag>
            </Wrap>
            <WritedHotInfo>
              <HotImage1>
                <img src={junsu} />
              </HotImage1>
              <HotWrap>
                <GridHorizonHot>
                  <HotImage2>
                    <img src={junsu} />
                  </HotImage2>
                </GridHorizonHot>
                <GridHorizonHot>
                  <HotImage3>
                    <img src={junsu} />
                  </HotImage3>
                </GridHorizonHot>
              </HotWrap>
            </WritedHotInfo>
          </Grid>
        </Container>
        <NavigationBar props={props} />
      </Suspense>
    </Fragment>
  );
};

export default Main;

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
  background: linear-gradient(#a396c9, #c8c6d0);
`;

const Img = styled.div`
  margin: 14px auto 21px;
  width: 107px;
  height: 107px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  box-shadow: 5px 5px 4px #877f92;
`;

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
  margin: 66px 0 30px 50px;
  width: 145px;
  word-break: break-all;
  word-wrap: break-word;
`;

const GridHorizon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
`;

const TitleText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: #7b758b;
`;

const ContentText = styled.p`
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  line-height: 13px;
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

const WritedHotInfo = styled.div`
  display: flex;
  margin: 0px auto 37px;
  width: 350px;
  height: 288px;
  background-color: #f6f6f6;
  border-radius: 20px;
  box-shadow: 5px 5px 4px #877f92;
`;

const HotImage1 = styled.div`
  margin: 13px;
  border-radius: 10px;
  width: 80px;
  height: 90px;
  background-color: #ffffff;

  & > img {
    width: 150px;
    height: 250px;
    border-radius: 20px;
    box-shadow: 5px 5px 4px #877f92;
  }
`;

const HotWrap = styled.div`
  margin: 66px 0 30px 50px;
`;

const GridHorizonHot = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
`;

const HotImage2 = styled.div`
  margin: 0 0 30px 20px;
  border-radius: 10px;
  width: 80px;
  height: 90px;
  background-color: #ffffff;
  & > img {
    width: 151px;
    height: 120px;
    border-radius: 20px;
    box-shadow: 5px 5px 4px #877f92;
  }
`;

const HotImage3 = styled.div`
  margin: 200px 0 19px 20px;
  border-radius: 10px;
  width: 80px;
  height: 90px;

  background-color: #ffffff;
  & > img {
    width: 151px;
    height: 120px;
    border-radius: 20px;
    box-shadow: 5px 5px 4px #877f92;
  }
`;
