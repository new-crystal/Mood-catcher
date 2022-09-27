import React, { useRef, useState, Fragment } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { regFormdata, regPost } from "../redux/modules/uploadSlice";
import Swal from "sweetalert2";

const preview_URL = "./images/preview_URL.PNG";

const Edit_post = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInput = useRef(null);

  const [attachment, setAttachment] = useState("");
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const { postId } = useParams();

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

  // input 데이터 저장하기
  const changeInput = (e) => {
    const { value, id } = e.target;
    setPost({ ...post, [id]: value });
  };

  const writePost = () => {
    if (fileInput.current.files[0] === undefined) {
      Swal.fire({
        icon: "info",
        title: "캐처님의 옷장 사진을 넣어주세요!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/upload");
    } else {
      const formdata = new FormData();
      formdata.append("postImage", fileInput.current.files[0]);

      dispatch(regFormdata(formdata));
      dispatch(regPost(post));
      navigate(`/edit_post_select/${postId}`);
    }
  };

  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <JustifyAlign>
            <UploadText>수정하기</UploadText>
            <NextButton onClick={writePost}>다음</NextButton>
          </JustifyAlign>
          <StUploadBox>
            <StFileButton>
              <button>
                <label htmlFor="file-input">파일선택</label>
              </button>
            </StFileButton>
            <StImageBox>
              <input
                id="file-input"
                type="file"
                accept="img/*"
                name="postImage"
                ref={fileInput}
                onChange={selectImg}
                style={{ display: "none" }}
              />
              <div className="ImgDiv">
                <img
                  src={attachment ? attachment : preview_URL}
                  alt=""
                  className="default"
                />
              </div>
            </StImageBox>
            <StText>제목</StText>
            <StTitleInput>
              <input
                id="title"
                maxLength={17}
                required
                onChange={changeInput}
              />
            </StTitleInput>
            <StText>내용</StText>
            <StContentInput>
              <input
                id="content"
                maxLength={25}
                required
                onChange={changeInput}
              />
            </StContentInput>
          </StUploadBox>
        </Grid>
      </Container>
      <NavigationBar props={props} />
    </Fragment>
  );
};

export default Edit_post;

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 970px; */
  /* background-color: orange; */
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
  margin-top: 40px;
  margin-bottom: 57px;
  max-width: 428px;
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);
  background: linear-gradient(#a396c9, #ffffff);

  /* background-color: royalblue; */
`;

const JustifyAlign = styled.div`
  display: flex;
  margin: 56px auto 0;
  width: 366px;
  justify-content: space-between;
  align-items: center;
  /* background-color: yellowgreen; */
`;

const UploadText = styled.span`
  margin: 0 76px 0 146px;
  font-size: 20px;
  font-weight: bold;
  color: #7b758b;
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
  border: none;
  box-shadow: 5px 5px 4px #877f92;
`;

const StUploadBox = styled.div`
  display: flex;
  margin: 12px auto;
  flex-direction: column;
  width: 390px;
  /* height: 700px; */
  border: 3px solid #c4c2ca;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 5px 5px 4px #877f92;
`;

const StFileButton = styled.div`
  & > button {
    margin: 23px 20px 0;
    width: 350px;
    height: 36px;
    font-size: 14px;
    border: 2px solid white;
    border-radius: 15px;
    background-color: #e6e5ea;
    color: black;
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

const StImageBox = styled.div`
  margin: 23px 20px 8px;
  width: 350px;
  height: 452px;
  border-radius: 15px;
  .ImgDiv {
    display: flex;
    width: 100%;
    height: 452px;
    border-radius: 15px;
    justify-content: center;
    overflow: hidden;
    img.default {
      /* flex: 1 1 auto; */
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
  color: #7b758b;
  font-weight: bold;
`;

const StTitleInput = styled.div`
  margin: 11px 20px 8px 20px;
  width: 350px;
  background: #e6e5ea;
  border-radius: 15px;
  outline: none;
  & > input {
    width: 300px;
    height: 50px;
    border: none;
    outline: none;
    margin-left: 20px;
    background: #e6e5ea;
    font-size: 20px;
  }
`;

const StContentInput = styled.div`
  width: 350px;
  margin: 11px 20px 18px 20px;
  background: #e6e5ea;
  border-radius: 15px;
  outline: none;
  & > input {
    width: 300px;
    height: 90px;
    border: none;
    outline: none;
    margin-left: 20px;
    background: #e6e5ea;
    font-size: 20px;
  }
`;
