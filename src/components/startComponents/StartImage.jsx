import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import start from "../../image/6565656.png";

const StartImage = () => {
  const navigate = useNavigate();
  const settings = {
    infinite: false,
    speed: 400,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    centerPadding: "0px",
  };

  const text2 = "나만의 옷장을 \n꾸미고 하고 싶으셨나요?";
  const text3 = "내 주의 사람들의 \n옷장을 구경하고 \n싶으신가요?";
  const text4 = "무드캐처에서 \n무드 포인트도 쌓고 \n옷장도 구경하세요!";

  return (
    <Container>
      <Slider {...settings}>
        <div>
          <ImageBox
            id="2"
            url={
              "https://img.freepik.com/premium-vector/partnership-and-friendship-staff-cooperation-concept_140689-296.jpg?w=1800"
            }
          >
            <h1 style={{ color: "#f4a261", top: "0px" }}>{text3}</h1>
          </ImageBox>
        </div>
        <div>
          <ImageBox
            id="1"
            url={"http://shopimg.co.kr//shoppingmall/TN/AHS000301_01.jpg"}
          >
            <h1 style={{ color: "#d4a373" }}>{text2}</h1>
          </ImageBox>
        </div>
        <div>
          <ImageBox
            id="3"
            url={
              "https://img.freepik.com/free-vector/flat-hand-drawn-fashion-designer-illustration_23-2148829813.jpg?w=1800&t=st=1664271916~exp=1664272516~hmac=7e808646c6050a2074f294492efdfee7c5615864bfdf48da65e63241d5032afd"
            }
          >
            <h1 style={{ color: "#9c89da", top: "0px" }}>{text4}</h1>
            <button onClick={() => navigate("/")}>무드캐처로 이동하기!</button>
          </ImageBox>
        </div>
      </Slider>
    </Container>
  );
};

const Container = styled.div`
  max-width: 420px;
  width: 100vw;
  height: 100vh;
  margin: 0px auto 0px auto;
  text-align: left;
  padding: 20px;

  h1 {
    font-family: "Roboto";
    font-style: Bold;
    font-weight: 700;
    font-size: 35px;
    white-space: pre-wrap;
    position: relative;
    top: 70px;
    left: 20px;
    white-space: pre-wrap;
  }
`;

const ImageBox = styled.div`
  max-width: 420px;
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});

  button {
    width: 250px;
    height: 50px;
    position: relative;
    top: 450px;
    left: 90px;
    background-color: #9c89da;
    border: 3px solid #fff;
    border-radius: 10px;
    padding: 5px;
    color: white;
    font-family: "Roboto";
    font-style: Bold;
    font-weight: 700;
    font-size: 15px;

    :hover {
      background-color: #7364a4;
    }
  }
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
