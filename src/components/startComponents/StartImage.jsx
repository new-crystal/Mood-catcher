import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import one from "../../image/1.png";
import two from "../../image/2.png";
import three from "../../image/3.png";
import four from "../../image/4.png";
import twotwo from "../../image/Vector.png";

const StartImage = () => {
  const navigate = useNavigate();
  const settings = {
    infinite: false,
    speed: 300,
    dots: true,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    centerPadding: "0px",
  };

  const text1 = "패션의 바다에서 \n나만의 무드를";
  const text2 = "내 근처의 사람들의\n패션을 한눈에";
  const text3 = "본인만의 무드를 쌓아\n명예의 전당으로";
  const text4 = "무드캐처\n한 번 시작해볼까요?";
  const text5 = "무드맵을 이용하여 근처 사람들의 패션을 \n알아봐요";

  return (
    <Container>
      <Slider {...settings}>
        <Wrap id="1">
          <Text1>{text1}</Text1>
          <Content>캐처님들의 개성을 뽐내주세요!</Content>
          <ImageBox1 style={{ backgroundImage: `url(${one})` }}>
            <img
              src={`${one}`}
              alt=""
              width="0"
              height="0"
              style={{ display: "none !important" }}
            />
          </ImageBox1>
        </Wrap>
        <Wrap id="2">
          <Text1>{text2}</Text1>
          <Content>{text5}</Content>
          <Image22 style={{ backgroundImage: `url(${twotwo})` }}>
            <img
              src={`${twotwo}`}
              alt=""
              width="0"
              height="0"
              style={{ display: "none !important" }}
            />
          </Image22>
          <ImageBox2 style={{ backgroundImage: `url(${two})` }}>
            <img
              src={`${two}`}
              alt=""
              width="0"
              height="0"
              style={{ display: "none !important" }}
            />
          </ImageBox2>
        </Wrap>
        <Wrap id="3">
          <Text1>{text3}</Text1>
          <Content>무드캐처 속 인플루언서가 되어 보세요</Content>
          <ImageBox3 url={`${three}`}></ImageBox3>
        </Wrap>
        <Wrap id="4">
          <Text1>{text4}</Text1>
          <Content>캐처님들의 패션을 뽐내주세요</Content>
          <ImageBox4 style={{ backgroundImage: `url(${four})` }}>
            <img
              src={`${four}`}
              alt=""
              width="0"
              height="0"
              style={{ display: "none !important" }}
            />
            <Button
              style={{ background: "#7b758b" }}
              onClick={() => navigate("/")}
            >
              무드캐치하러가기
            </Button>
            <Button style={{ background: "#C4C2CA" }}>앱다운받기</Button>
          </ImageBox4>
        </Wrap>
        <Wrap id="5">
          <ImageBox3></ImageBox3>
        </Wrap>
      </Slider>
    </Container>
  );
};

const Container = styled.div`
  max-width: 420px;
  width: 100vw;
  /* height: 80vh; */
  margin: 0px auto 0px auto;
  text-align: left;
  background-color: aliceblue;
  .slick-dots {
    .slick-active {
      button::before {
        color: #807e7e;
      }
    }
    button::before {
      color: #878787;
    }
  }
`;

const Wrap = styled.div`
  max-width: 428px;
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ImageBox1 = styled.div`
  width: 420px;
  height: 410px;
  background-position: center;
  background-size: cover;
  /* background-image: url(${(props) => props.url}); */
  position: relative;
  top: 150px;
  flex-shrink: 0;
`;

const Text1 = styled.h1`
  color: #2d273f;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 47px;
  white-space: pre-wrap;
  position: relative;
  top: 20px;
  left: 27px;
`;

const ImageBox2 = styled.div`
  width: 420px;
  height: 560px;
  background-position: center;
  background-size: cover;
  /* background-image: url(${(props) => props.url}); */
  position: relative;
  top: 30px;
`;

const Image22 = styled.div`
  max-width: 73px;
  width: 100vw;
  height: 105px;
  background-position: center;
  background-size: cover;
  /* background-image: url(${twotwo}); */
  position: relative;
  top: 30px;
  left: 170px;
`;

const ImageBox3 = styled.div`
  width: 420px;
  height: 420px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  position: relative;
  top: 130px;
  flex-shrink: 0;
`;

const ImageBox4 = styled.div`
  width: 420px;
  height: 420px;
  background-position: center;
  background-size: cover;
  /* background-image: url(${(props) => props.url}); */
  position: relative;
  top: 70px;
  flex-shrink: 0;
`;

const Content = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #7b758b;
  position: relative;
  white-space: pre-wrap;
  top: 10px;
  left: 27px;
`;

const Button = styled.button`
  width: 364px;
  height: 65px;
  border: 0px;
  margin: 10px;
  border-radius: 15px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
  text-align: center;
  align-items: center;
  color: #ffffff;
  position: relative;
  top: 340px;
  left: 15px;
`;

const StyledSlide = styled(Slider)`
  position: relative;
  margin-top: 60px;
  margin-bottom: -40px;
  width: 100%;

  .slick-list {
    position: absolute;
    width: 890px;
    height: 450px;
    margin: 0 auto;
    overflow: hidden;
    top: -30px;
  }

  .slick-slider {
    display: flex;
  }

  .slick-track {
    display: flex;
    height: 100%;
  }

  .slick-dots {
    display: none !important;
  }

  .slick-arrow {
    padding: 4px 6px;
    transform: translate(30px, 150px);
    background-color: transparent;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }

  .slick-prev {
    position: absolute;
    top: -20px;
    right: -800px;
    cursor: pointer;
    z-index: 100;
  }

  .slick-next {
    position: absolute;
    top: -20px;
    left: 810px;
    cursor: pointer;
  }
`;

export default StartImage;
