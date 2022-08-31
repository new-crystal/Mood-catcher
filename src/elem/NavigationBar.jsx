import React, { Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../shared/style/TestHeader.css";

const myBeer = "/images/mybeer.png";

const NavigationBar = (props) => {
  return (
    <Fragment>
      <NavBox>
        <SearchWrap>
          <ImageWrap style={{ backgroundImage: `url(${myBeer})` }} />
        </SearchWrap>
        <SearchWrap>
          <ImageWrap style={{ backgroundImage: `url(${myBeer})` }} />
        </SearchWrap>
        <SearchWrap>
          <ImageWrap style={{ backgroundImage: `url(${myBeer})` }} />
        </SearchWrap>
        <SearchWrap>
          <ImageWrap style={{ backgroundImage: `url(${myBeer})` }} />
        </SearchWrap>
        <SearchWrap>
          <ImageWrap style={{ backgroundImage: `url(${myBeer})` }} />
        </SearchWrap>
      </NavBox>
    </Fragment>
  );
};

export default NavigationBar;

const NavBox = styled.div`
  background-color: #c4c2ca;
  max-width: 428px;
  height: 60px;
  z-index: 10;
  font-family: "GmarketSansM";
  display: flex;
  position: fixed;
  justify-content: space-around;
  bottom: 0;
  margin: 0 auto;
  left: 0;
  right: 0;
`;

const ImageWrap = styled.div`
  margin: 0 auto;
  margin-top: 17px;
  width: 22px;
  height: 22px;
  background-size: cover;
`;

const SearchWrap = styled.div`
  text-align: center;
  width: 100px;
  cursor: pointer;
`;
