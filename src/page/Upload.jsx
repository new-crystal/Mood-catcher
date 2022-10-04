import React, { useRef, useState, Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

// 통신
import { regFormdata, regPost } from "../redux/modules/uploadSlice";

// 컴포넌트
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";

// 아이콘
const preview_URL = "/images/noimage.PNG";

const Upload = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInput = useRef(null);

  const [attachment, setAttachment] = useState("");
  const title_ref = React.useRef(null);
  const text_ref = React.useRef(null);

  // 선택된 사진을 미리볼 수 있게 해줍니다.
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

  // 서버에 사진을 전송하는 함수
  const writePost = () => {
    if (fileInput.current.files[0] === undefined) {
      Swal.fire({
        icon: "info",
        title: "캐처님의 옷장 사진을 넣어주세요!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/upload");
    }
    if (title_ref.current.value === "") {
      Swal.fire({
        icon: "info",
        title: "캐처님의 옷장 제목을 넣어주세요!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (
      fileInput.current.files[0] !== undefined &&
      title_ref.current.value !== ""
    ) {
      const formdata = new FormData();
      formdata.append("postImage", fileInput.current.files[0]);

      dispatch(regFormdata(formdata));
      dispatch(
        regPost({
          title: title_ref.current.value,
          content: text_ref.current.value,
        })
      );
      navigate("/upload_select");
    }
  };

  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <JustifyAlign>
            <UploadText>작성하기</UploadText>
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
                accept="image/*"
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
              <textarea ref={title_ref} maxLength={16} />
            </StTitleInput>
            <StText>내용</StText>
            <StContentInput>
              <textarea ref={text_ref} className="textIpt" maxLength={44} />
            </StContentInput>
            <StNextBtnBox>
              <NextButton onClick={writePost}>
                <p>다음</p>
              </NextButton>
            </StNextBtnBox>
          </StUploadBox>
        </Grid>
      </Container>
      <NavigationBar props={props} />
    </Fragment>
  );
};

export default Upload;

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-top: 20px;
  margin-bottom: 57px;
  max-width: 428px;
  width: 100vw;
`;

const JustifyAlign = styled.div`
  display: flex;
  margin: 56px auto 0;
  width: 366px;
  justify-content: space-between;
  align-items: center;
`;

const UploadText = styled.span`
  margin: 0 30px 0 146px;
  font-size: 20px;
  font-weight: bold;
  color: #7b758b;
`;

const StUploadBox = styled.div`
  display: flex;
  margin: 12px auto;
  flex-direction: column;
  width: 370px;
  border: 3px solid #c4c2ca;
  border-radius: 20px;
  background-color: #ffffff;
`;

const StFileButton = styled.div`
  margin: 0 auto;
  & > button {
    margin: 23px auto 0;
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
      font-family: "Noto Sans KR", sans-serif;
      width: 320px;
    }
  }
`;

const StImageBox = styled.div`
  margin: 23px auto 23px;
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
  margin: 0 0 0 24px;
  width: 350px;
  overflow: hidden;
  white-space: normal;
  color: #7b758b;
  font-weight: bold;
`;

const StTitleInput = styled.div`
  margin: 11px auto 8px;
  width: 350px;
  background: #e6e5ea;
  border-radius: 15px;
  outline: none;
  & > textarea {
    width: 320px;
    height: 50px;
    line-height: 50px;
    border: none;
    resize: none;
    outline: none;
    margin-left: 20px;
    font-family: "Noto Sans KR", sans-serif;
    background: #e6e5ea;
    font-size: 20px;
  }
`;

const StContentInput = styled.div`
  width: 350px;
  margin: 11px auto 18px;
  background: #e6e5ea;
  border-radius: 15px;
  outline: none;
  & > textarea {
    width: 320px;
    height: 90px;
    border: none;
    outline: none;
    resize: none;
    box-sizing: border-box;
    padding: 10px 0 0 0;
    margin-left: 20px;
    font-family: "Noto Sans KR", sans-serif;
    background: #e6e5ea;
    font-size: 20px;
  }
`;

const StNextBtnBox = styled.div`
  margin: 0 auto;
`;

const NextButton = styled.button`
  background: #a8a6af;
  border: 0px;
  width: 350px;
  height: 50px;
  border-radius: 15px;
  color: white;
  margin-bottom: 20px;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  margin-top: 20px;
  cursor: default;
  p {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
  }
`;
