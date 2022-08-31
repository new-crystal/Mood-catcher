import React, { useRef, useState, Fragment, Suspense } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useNavigate } from "react-router-dom";
const Upload = (props) => {
  const navigate = useNavigate();

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
                <UploadText>작성하기</UploadText>
                <NextButton
                  onClick={() => {
                    navigate("/upload_select");
                  }}
                >
                  다음
                </NextButton>
              </JustifyAlign>
            </Wrap>
            <StUploadBox>
              <StImageBox>
                <span>사진을 추가해주세요.</span>
              </StImageBox>
              <StText>제목</StText>
              <StTitleInput>
                <input></input>
              </StTitleInput>
              <StText>내용</StText>
              <StContentInput>
                <input></input>
              </StContentInput>
            </StUploadBox>
          </Grid>
        </Container>
        <NavigationBar props={props} />
      </Suspense>
    </Fragment>
  );
};

export default Upload;

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
  margin: 0 76px 0 146px;
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
  margin: 23px 20px 16px;
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

const StText = styled.p`
  display: inline-block;
  font-size: 20px;
  margin: 0 0 0 34px;
  width: 350px;
  overflow: hidden;
  white-space: normal;
`;

const StTitleInput = styled.div`
  width: 350px;
  margin: 11px 20px 18px 20px;
  background: #e6e5ea;
  border-radius: 15px;
  outline: none;
  & > input {
    width: 250px;
    height: 50px;
    border: none;
    outline: none;
    margin-left: 20px;
    background: #e6e5ea;
  }
`;

const StContentInput = styled.div`
  width: 350px;
  margin: 11px 20px 18px 20px;
  background: #e6e5ea;
  border-radius: 15px;
  outline: none;
  & > input {
    width: 250px;
    height: 200px;
    border: none;
    outline: none;
    margin-left: 20px;
    background: #e6e5ea;
  }
`;
