import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const EachPost = (props) => {
  const { item } = props;
  return (
    <Fragment>
      <PostWrap>
        <PostImage>
          <img src={item.image} alt="post_image"></img>
        </PostImage>
        <PostInfoWrap>
          <JustifyAlign>
            <PostName>{item.name_korean}</PostName>
          </JustifyAlign>
        </PostInfoWrap>
      </PostWrap>
    </Fragment>
  );
};

export default EachPost;

const PostWrap = styled.div`
  width: 148px;
  margin-bottom: 20px;
  margin-right: 16px;
  //z-index: 1px;
`;

const PostImage = styled.div`
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

const PostInfoWrap = styled.div`
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

const PostName = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const JustifyAlign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
