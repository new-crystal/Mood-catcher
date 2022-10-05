import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../shared/style/myBeer.css";
import EachMusinsa from "../components/uploadCompnents/EachMusinsa";
import ScrollX from "../elem/ScrollX";
import { deleteItem, deleteMusinsa } from "../redux/modules/uploadSlice";

import { __getMusinsa, __addPost, __uploadImage } from "../redux/async/upload";
import { changeCheckPostId } from "../redux/modules/uploadSlice";
import Swal from "sweetalert2";
import _ from "lodash";

const Search = "/images/search.png";
const upButton = "/images/upArrow.png";
const Cancel = "/images/cancel.png";

const Upload_select = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 사진 파일 미리보기를 위한 상태
  const [attachment, setAttachment] = useState("");
  // 검색창 클릭을 이용한 토글기능관련 상태
  const [searchTogle, setSearchTogle] = useState(false);
  // 무신사 검색을 위한 상태
  const [search, setSearch] = useState("");
  // upload 페이지의 formdate를 가져옵니다.
  const formdata = useSelector((state) => state.upload.formdata);
  const postImg = formdata.get("postImage");
  const post = useSelector((state) => state.upload.post);
  // 무신사 items를 가져옵니다.
  const items = useSelector((state) => state.upload.items);
  // 선택된 무신사 selectedItems를 가져옵니다.
  const selectedItems = useSelector((state) => state.upload.selectedItems);
  // postId 잘 가져왔는지 확인합니다.
  const checkPostId = useSelector((state) => state.upload.checkPostId);
  const [totalPost, setTotalPost] = useState({
    post: {},
    items: [],
  });
  const [imagePost, setImagePost] = useState({
    postId: "",
    postImage: formdata,
  });
  const [scrollRef, isDrag, onDragStart, onDragEnd, onThrottleDragMove] =
    ScrollX();

  React.useEffect(() => {
    setTotalPost({ ...totalPost, post: post, items: selectedItems });
    setImagePost({ ...imagePost, postImage: formdata, postId: post.postId });
  }, [post, selectedItems, formdata]);

  React.useEffect(() => {
    // 검색창이 안 눌려 있으면 이미지 미리보기를 켜놓습니다.
    if (searchTogle === false) {
      const reader = new FileReader();
      const theFile = postImg;
      reader.readAsDataURL(theFile);
      reader.onloadend = (finishiedEvent) => {
        const {
          currentTarget: { result },
        } = finishiedEvent;
        setAttachment(result);
      };
      // 검색창이 눌려 있으면 이미지 미리보기를 꺼놓습니다..
    } else {
      setAttachment("");
    }
    // searchTogle을 구독해놓습니다.
  }, [searchTogle]);

  const writeTotalPost = () => {
    dispatch(__addPost(totalPost));
  };

  useEffect(() => {
    return () => {
      dispatch(deleteMusinsa());
    };
  }, []);

  React.useEffect(() => {
    if (checkPostId === true) {
      dispatch(__uploadImage({ postId: post.postId, postImage: formdata }));
      dispatch(changeCheckPostId(false));
      navigate("/");
    }
  }, [checkPostId]);

  // 새로고침 막기
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = ""; //Chrome에서 동작하도록; deprecated
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollTop;
    SetScrollHeightInfo(scrollHeight);
  }, 300);

  // toTop버튼
  const [scrollHeightInfo, SetScrollHeightInfo] = useState(0);
  const showTopButton = () => {
    if (scrollHeightInfo > 2000) {
      //2000px밑으로 스크롤 내려갔을때 위로가는 Top 버튼 보이기
      return (
        <TopButton
          style={{ backgroundImage: `url(${upButton})` }}
          onClick={ScrollToTop}
        >
          <img
            src={`${upButton}`}
            alt=""
            width="0"
            height="0"
            style={{ display: "none !important" }}
          />
        </TopButton>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", _scrollPosition); // scroll event listener 등록
    return () => {
      window.removeEventListener("scroll", _scrollPosition); // scroll event listener 해제(스크롤이벤트 클린업)
    };
  }, [scrollHeightInfo]);

  // 실행시 맨위로 올라옴
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <JustifyAlign>
            <UploadText>내 아이템</UploadText>
            <NextButton onClick={writeTotalPost}>완료</NextButton>
          </JustifyAlign>
          <StUploadBox>
            <StImageBox className={searchTogle}>
              <div className="ImgDiv">
                <img
                  src={attachment}
                  alt=""
                  className={searchTogle.toString()}
                />
              </div>
            </StImageBox>
            <SliderContainer
              ref={scrollRef}
              onMouseDown={onDragStart}
              onMouseMove={isDrag ? onThrottleDragMove : null}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
            >
              {selectedItems?.map((item, idx) => (
                <StMusinsaItemBox key={idx}>
                  <StMusinsaImage>
                    <div className="ImgDiv">
                      <img src={item.imgUrl} alt="" />
                    </div>
                  </StMusinsaImage>
                  <StTextBox>
                    {items.length === 0 ? (
                      <Fragment>
                        <StText>이름</StText>
                        <StText>가격</StText>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <StText>{item.name}</StText>
                        {item.price.indexOf(" ") !== -1 ? (
                          <StText>
                            {item.price.slice(item.price.indexOf(" "))}
                          </StText>
                        ) : (
                          <StText>{item.price}</StText>
                        )}
                      </Fragment>
                    )}
                  </StTextBox>
                  <Delete
                    onClick={() => {
                      dispatch(deleteItem(item.name));
                    }}
                  >
                    <DeleteImageWrap
                      style={{ backgroundImage: `url(${Cancel})` }}
                    >
                      <img
                        src={`${Cancel}`}
                        alt=""
                        width="0"
                        height="0"
                        style={{ display: "none !important" }}
                      />
                    </DeleteImageWrap>
                  </Delete>
                </StMusinsaItemBox>
              ))}
            </SliderContainer>
            <StSearchInput>
              <input
                type="text"
                onClick={(e) => {
                  if (searchTogle === false) setSearchTogle((togle) => !togle);
                }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && search === "") {
                    Swal.fire({
                      icon: "info",
                      title: "검색 키워드를 입력해주세요!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  } else if (e.key === "Enter" && searchTogle === false) {
                    setSearchTogle((togle) => !togle);
                    e.preventDefault();
                    dispatch(__getMusinsa(search));
                  } else if (e.key === "Enter" && searchTogle === true) {
                    e.preventDefault();
                    dispatch(__getMusinsa(search));
                  }
                }}
              ></input>
              <ButtonWrap>
                <ImageWrap
                  style={{ backgroundImage: `url(${Search})` }}
                  onClick={(e) => {
                    if (search === "") {
                      Swal.fire({
                        icon: "info",
                        title: "검색 키워드를 입력해주세요!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    } else if (searchTogle === false) {
                      setSearchTogle((togle) => !togle);
                      e.preventDefault();
                      dispatch(__getMusinsa(search));
                    } else if (searchTogle === true) {
                      e.preventDefault();
                      dispatch(__getMusinsa(search));
                    }
                  }}
                />
              </ButtonWrap>
            </StSearchInput>
            <MusinsaButton
              className={!searchTogle}
              onClick={(e) => {
                setSearchTogle((togle) => !togle);
              }}
            >
              무신사 선택 완료
            </MusinsaButton>
            <List className={searchTogle}>
              {items?.map((item, idx) => (
                <EachMusinsa idx={idx} item={item} toTop={ScrollToTop} />
              ))}
            </List>
          </StUploadBox>
        </Grid>
      </Container>
      {showTopButton()}
      <NavigationBar props={props} />
    </Fragment>
  );
};

export default Upload_select;
const Delete = styled.div`
  width: 16px;
  height: 16px;
  position: relative;
  top: 6px;
  right: 6px;
  /* margin-right: 6px; */

  background-color: rgba(0, 0, 0, 0);
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  z-index: 20;
`;

const DeleteImageWrap = styled.div`
  margin: 0 auto;
  /* margin-top: 3px; */
  /* margin-top: 13px; */
  width: 16px;
  height: 16px;
  background-size: cover;
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
  flex-direction: column;
  /* height: 926px;
  background-color: orange; */
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
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 57px;
  max-width: 428px;
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);
  /* background: linear-gradient(#a396c9, #ffffff); */
  /* background-color: royalblue; */
`;

const JustifyAlign = styled.div`
  display: flex;
  /* margin: 56px auto 0; */
  margin: 30px auto 0;
  width: 366px;
  justify-content: space-between;
  align-items: center;
  /* background-color: yellowgreen; */
`;

const UploadText = styled.span`
  margin: 0 40px 0 144px;
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
  /* box-shadow: 5px 5px 4px #877f92; */
`;

const StUploadBox = styled.div`
  display: flex;
  margin: 12px auto;
  flex-direction: column;
  width: 380px;
  /* min-height: 700px; */
  border: 3px solid #c4c2ca;
  border-radius: 20px;
  background-color: #ffffff;
  /* box-shadow: 5px 5px 4px #877f92; */
`;

const StImageBox = styled.div`
  margin: 23px 20px 9px;
  width: 350px;
  height: 452px;
  border-radius: 15px;
  &.true {
    height: 0;
  }
  .ImgDiv {
    width: 100%;
    height: 452px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    img {
      /* flex: 1 1 auto; */
    }
    img.true {
      display: none;
    }
  }
  transition: display 0.5s, height 0.5s;
`;

const SliderContainer = styled.div`
  margin: 0 6px;
  width: 350px;
  overflow: hidden;
  margin-left: 20px;
  display: flexbox;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  &.true {
    display: none;
    margin: 0;
  }
  transition: 0.5s;
`;

const StMusinsaItemBox = styled.div`
  margin-right: 8px;
  display: flex;
  width: 200px;
  height: 100px;
  background-color: #e6e5ea;
  border-radius: 15px;
  font-size: 20px;
  outline: none;
  text-align: center;
  /* cursor: pointer; */
  &.true {
    height: 0;
  }
  transition: 0.5s;
`;

const StMusinsaImage = styled.div`
  margin: 13px 12px 12px;
  width: 75px;
  height: 75px;
  border-radius: 15px;
  &.true {
    height: 0;
  }
  .ImgDiv {
    /* background-color: orange; */
    width: 100%;
    height: 75px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    img {
      /* flex: 1 1 auto; */
    }
    img.true {
      display: none;
    }
  }
  transition: display 0.5s, height 0.5s;
`;

const StTextBox = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
`;

const StText = styled.span`
  margin-top: 18px;
  margin-right: 6px;
  font-size: 8px;
  color: #7b758b;
  font-weight: bold;
`;

const StSearchInput = styled.div`
  margin: 10px 20px;
  width: 350px;
  background: #e6e5ea;
  border-radius: 18px;
  outline: none;
  & > input {
    margin-left: 20px;
    margin-top: 3px;
    width: 250px;
    height: 40px;
    border: none;
    outline: none;
    background: #e6e5ea;
    outline: none;
    font-size: 30px;
    font-family: "Noto Sans KR", sans-serif;
  }
`;

const ButtonWrap = styled.div`
  display: block;
  float: right;
`;

const ImageWrap = styled.div`
  margin: 6px;
  margin-right: 8px;
  width: 40px;
  height: 40px;
  background-size: cover;
  cursor: pointer;
`;

const List = styled.div`
  width: 350px;
  margin: 0 auto;
  display: none;
  flex-direction: column;
  &.true {
    display: flex;
  }
  transition: 0.5s;
`;

const MusinsaButton = styled.button`
  text-align: center;
  margin: 0 20px 5px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  width: 350px;
  height: 30px;
  background-color: #7b758b;
  border-radius: 10px;
  border: none;
  &.true {
    display: none;
  }
`;

const TopButton = styled.div`
  position: fixed;
  bottom: 74px;
  left: 50%;
  margin-left: -20px;
  width: 40px;
  height: 40px;
  /* background-image: url(${upButton}); */
  background-size: cover;
  cursor: pointer;
`;
