import React, { Fragment, Suspense } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../shared/style/myBeer.css";

const Search = "./images/search.png";

const Upload = (props) => {
  const navigate = useNavigate();

  const settings = {
    infinite: false,
    speed: 200, //옆으로넘어가는 속도
    slidesToShow: 1, //한번에 보여주는 목록 개수(div가 더 좁으면 반영이 잘안됨)
    slidesToScroll: 5, //한번에 넘기는 목록의 개수
    variableWidth: true, //div커스텀하기위한 설정
    initialSlide: 0,
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
            <Wrap>
              <JustifyAlign>
                <UploadText>내 아이템</UploadText>
                <NextButton
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  완료
                </NextButton>
              </JustifyAlign>
            </Wrap>
            <StUploadBox>
              <StImageBox></StImageBox>
              <SliderContainer>
                <StyledSlider {...settings}>
                  <StMusinsaItemBox>asdasdasdasd</StMusinsaItemBox>
                  <Test>aa</Test>
                  <StMusinsaItemBox>asdasdasdasd</StMusinsaItemBox>
                  <Test>aa</Test>
                  <StMusinsaItemBox>asdasdasdasd</StMusinsaItemBox>
                  <Test>aa</Test>
                  <StMusinsaItemBox>asdasdasdasd</StMusinsaItemBox>
                  <Test>aa</Test>
                  <StMusinsaItemBox>asdasdasdasd</StMusinsaItemBox>
                  <Test>aa</Test>
                  <StMusinsaItemBox>asdasdasdasd</StMusinsaItemBox>
                </StyledSlider>
              </SliderContainer>
              <StSearchInput>
                <input type="text"></input>
                <ButtonWrap>
                  <ImageWrap style={{ backgroundImage: `url(${Search})` }} />
                </ButtonWrap>
              </StSearchInput>
            </StUploadBox>
          </Grid>
        </Container>
        <NavigationBar props={props} />
      </Suspense>
    </Fragment>
  );
};

export default Upload;

const SliderContainer = styled.div`
  margin: 0 6px;
  width: 350px;
  overflow: hidden;
  margin-left: 20px;
`;

const StyledSlider = styled(Slider)`
  color: #e6e5ea;
  font-size: 14px;
`;

const StMusinsaItemBox = styled.div`
  /* width: 150px; */
  height: 100px;
  background-color: #e6e5ea;
  border-radius: 15px;

  color: #e6e5ea;
  font-size: 20px;
  outline: none;
  padding: 0;
  text-align: center;
  cursor: pointer;
`;
const Test = styled.div`
  color: royalblue;
`;

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

const Container = styled.div`
  display: flex;
  height: 926px;
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
  margin-top: 40px;
`;

const Wrap = styled.div`
  width: 366px;
  margin: 56px auto 0;
  background-color: aqua;
`;

const JustifyAlign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: yellowgreen;
`;

const UploadText = styled.span`
  margin: 0 73px 0 144px;
  font-size: 20px;
`;

const NextButton = styled.button`
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  width: 70px;
  height: 30px;
  background-color: #7b758b;
  border-radius: 10px;
`;

const StUploadBox = styled.div`
  margin: 12px auto;
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 700px;
  border: 3px solid #c4c2ca;
  border-radius: 20px;
  background-color: transparent;
`;

const StImageBox = styled.div`
  margin: 23px 20px 9px;
  width: 350px;
  height: 300px;
  border-radius: 15px;
  background-color: #e6e5ea;
  text-align: center;
  line-height: 300px;
  & > span {
    opacity: 0.4;
  }
`;

const StSearchInput = styled.div`
  width: 350px;
  margin: 10px 20px;
  background: #e6e5ea;
  border-radius: 18px;
  outline: none;
  & > input {
    width: 250px;
    height: 50px;
    border: none;
    outline: none;
    background: #e6e5ea;
    margin-left: 20px;
    outline: none;
    font-size: 30px;
  }
`;

const ButtonWrap = styled.div`
  display: inline-block;
  float: right;
  margin-right: 8px;
`;

const ImageWrap = styled.div`
  display: inline-block;
  margin: 6px;
  width: 40px;
  height: 40px;
  background-size: cover;
  cursor: pointer;
`;
