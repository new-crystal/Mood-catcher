import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const EachMusinsa = (props) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <RecomandMusinsaWrap>
        <MusinsaImage></MusinsaImage>
        <MusinsaInfoWrap>
          <MusinsaBrand></MusinsaBrand>
          <MusinsaTitle></MusinsaTitle>
          <MusinsaPrice></MusinsaPrice>
        </MusinsaInfoWrap>
      </RecomandMusinsaWrap>
    </Fragment>
  );
};

export default EachMusinsa;

const RecomandMusinsaWrap = styled.div`
  width: 148px;
  margin-bottom: 20px;
  margin-right: 16px;
  //z-index: 1px;
`;

const MusinsaImage = styled.div`
  width: 148px;
  height: 148px;
  border-radius: 13px;
  background-color: #f7f7f7;
  background-size: cover;
  cursor: pointer;
  & > img {
    width: 130px;
    height: 130px;
    margin: 9px;
  }
  @media (img: img) {
    & > img {
      width: 130px;
      height: 130px;
      margin: 9px;
    }
  }
  @media (img: img) {
    & > img {
      width: 148px;
      height: 148px;
    }
  }
`;

const MusinsaInfoWrap = styled.div`
  width: 134px;
  margin: 10px 5px 0 5px;
  & p {
    margin: 0;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const MusinsaBrand = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MusinsaTitle = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MusinsaPrice = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
