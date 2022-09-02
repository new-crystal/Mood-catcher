import React, { useRef, useState, Fragment, Suspense } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const junsu = "./images/junsu.PNG";

const Main = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState({
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
            <Img url={image.preview_URL}></Img>
            <Wrap>
              <StTag>My Closet</StTag>
            </Wrap>
            <WritedClosetInfo
              onClick={() => {
                navigate("/Closet");
              }}
            >
              <ClosetImage>
                <img src={junsu}></img>
              </ClosetImage>
              <ClosetTextWrap>
                <GridHorizon>
                  <Div>
                    <NicknameText>
                      <span>내 다리 롱다리</span>
                    </NicknameText>
                  </Div>
                </GridHorizon>
              </ClosetTextWrap>
            </WritedClosetInfo>
            <Wrap>
              <StTag>Hot</StTag>
            </Wrap>
            <WritedHotInfo>
              <ClosetImageHot>
                <img src={junsu}></img>
              </ClosetImageHot>
              <ClosetTextWrap>
                <GridHorizon>
                  <Div>
                    <ClosetImageHot1>
                      <img src={junsu}></img>
                    </ClosetImageHot1>
                  </Div>
                </GridHorizon>
                <GridHorizon>
                  <Div>
                    <ClosetImageHot2>
                      <img src={junsu}></img>
                    </ClosetImageHot2>
                  </Div>
                </GridHorizon>
              </ClosetTextWrap>
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
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

const Container = styled.div`
  display: flex;
  height: 984px;
  background-color: orange;
  flex-direction: column;
  bottom: 110px;
  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: auto;
    text-align: left;
  }
`;

const Grid = styled.div`
  //width: 100%;
  width: 428px;
  margin: 0 auto;
  background-color: royalblue;
  margin-top: 60px;
  margin-bottom: 500px;
`;

const Img = styled.div`
  width: 107px;
  height: 107px;
  border-radius: 50%;
  margin: 14px auto 21px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  box-shadow: x-position;
`;

const Wrap = styled.div`
  width: 350px;
  margin: 21px auto 10px;
  background-color: aqua;
`;

const StTag = styled.div`
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
  margin-bottom: 10px;
`;

const WritedClosetInfo = styled.div`
  width: 350px;
  height: 200px;
  display: flex;
  background-color: #f6f6f6;
  border-radius: 20px;
  margin: 0px auto 37px;
  cursor: pointer;
`;

const WritedHotInfo = styled.div`
  width: 350px;
  height: 288px;
  display: flex;
  background-color: #f6f6f6;
  border-radius: 20px;
  margin: 0px auto 37px;
  cursor: pointer;
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
  }
`;

const ClosetImageHot = styled.div`
  margin: 13px;
  border-radius: 10px;
  width: 80px;
  height: 90px;

  background-color: #ffffff;
  & > img {
    width: 150px;
    height: 250px;
    border-radius: 20px;
  }
`;

const ClosetImageHot1 = styled.div`
  margin: 0 0 30px 20px;
  border-radius: 10px;
  width: 80px;
  height: 90px;

  background-color: #ffffff;
  & > img {
    width: 151px;
    height: 120px;
    border-radius: 20px;
  }
`;

const ClosetImageHot2 = styled.div`
  margin: 200px 0 19px 20px;
  border-radius: 10px;
  width: 80px;
  height: 90px;

  background-color: #ffffff;
  & > img {
    width: 151px;
    height: 120px;
    border-radius: 20px;
  }
`;

const ClosetTextWrap = styled.div`
  margin: 66px 0 30px 50px;
  width: 200px;
  word-break: break-all;
  word-wrap: break-word;
  & > span {
    font-size: 24px;
    font-weight: 300;
    width: 150px;
    height: 50px;
  }
`;

const GridHorizon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
`;

const NicknameText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
`;

const Div = styled.div`
  display: flex;
  padding: 0 2px;
`;
