import React, { useRef, useState, Fragment, Suspense } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { regPost } from "../redux/modules/uploadSlice";

const junsu = "./images/junsu.PNG";

const Upload = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const title_ref = React.useRef(null);
  const content_ref = React.useRef(null);

  const [attachment, setAttachment] = useState("");

  const selectImg = (e) => {
    const reader = new FileReader();
    const theFile = fileInput.current.files[0];
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishiedEvent) => {
      const {
        currentTarget: { result },
      } = finishiedEvent;
      setAttachment(result);
    };
  };

  const writePost = () => {
    if (fileInput.current.files[0] === undefined) {
      alert("사진을 넣어주세요!");
      navigate("/upload");
    } else {
      const post = new FormData();
      console.log(fileInput.current.files[0]);
      post.append("imgFile", fileInput.current.files[0]);
      post.append("title", title_ref.current.value);
      post.append("content", content_ref.current.value);

      dispatch(regPost(post));
      for (let key of post.keys()) {
        console.log(key);
      }
      // FormData의 value 확인
      for (let value of post.values()) {
        console.log(value);
      }
      navigate("/upload_select");
    }
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
                <UploadText>작성하기</UploadText>
                <NextButton onClick={writePost}>다음</NextButton>
              </JustifyAlign>
            </Wrap>
            <StUploadBox>
              <StimgButton>
                <button>
                  <label htmlFor="file-input">파일선택</label>
                </button>
              </StimgButton>
              <StImageBox>
                <input
                  id="file-input"
                  type="file"
                  accept="img/*"
                  name="image"
                  ref={fileInput}
                  onChange={selectImg}
                  style={{ display: "none" }}
                />
                <div className="ImgDiv">
                  <img
                    src={attachment ? attachment : junsu}
                    alt=""
                    className="default"
                  />
                </div>
              </StImageBox>
              <StText>제목</StText>
              <StTitleInput>
                <input ref={title_ref} />
              </StTitleInput>
              <StText>내용</StText>
              <StContentInput>
                <input ref={content_ref} />
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
  margin-top: 40px;
  margin-bottom: 500px;
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
  /* height: 700px; */
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
  & > span {
    opacity: 0.4;
  }
  .ImgDiv {
    width: 100%;
    height: 300px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    img.default {
      flex: 1 1 auto;
    }
  }
`;

const StimgButton = styled.div`
  margin: 23px 20px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-flow: row;
  gap: 10px;
  color: darkgray;
  border-radius: 15px;
  width: 350px;
  & > button {
    width: 350px;
    height: 36px;
    font-size: 14px;
    border: 2px solid white;
    border-radius: 15px;
    background-color: transparent;
    color: white;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      background-color: #666666;
    }
    & > label {
      display: inline-block;
      width: 320px;
    }
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
