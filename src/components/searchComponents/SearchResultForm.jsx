import { Fragment, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

//통신
import { __getSearchResult } from "../../redux/async/search";

//이미지
import search from "../../image/search.png";

const SearchResultForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword } = useParams();
  const key = keyword.split("=")[1];
  const sort = window.location.href.split("sort=")[1];
  const searchList = useSelector((state) => state.search.searchResult); //검색 결과 받아오기
  const last = useSelector((state) => state.search.resultPostLast); //마지막 페이지 불러오기
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(true);
  const [writer, setWriter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  //윈도우 스크롤 위치 계산하기
  useEffect(() => {
    if (loading) {
      return;
    }
    window.addEventListener("scroll", _scrollPosition);
    return () => {
      window.removeEventListener("scroll", _scrollPosition);
    };
  }, [page, loading, key]);

  //sort값 유지해주기
  useEffect(() => {
    if (sort === "title") {
      setTitle(true);
      setWriter(false);
    }
    if (sort === "writer") {
      setTitle(false);
      setWriter(true);
    }
  }, [sort]);

  //react-hook-form 사용하기
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //다시 검색하기
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 300));
    if (title && !writer) {
      navigate(`/search/result/keyword=${data.search}?sort=title`);
      setIsSearch(!isSearch);
    }
    if (!title && writer) {
      navigate(`/search/result/keyword=${data.search}?sort=writer`);
      setIsSearch(!isSearch);
    }
  };

  //검색글 불러오기
  const getSearchList = useCallback(() => {
    const getSearch = async () => {
      await dispatch(__getSearchResult({ key, sort, page }));
      setLoading(false);
    };
    return getSearch();
  }, [page, key, isSearch]);

  //스크롤 위치 계산하기
  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
      if (last) {
        return;
      }
      getSearchList();
      setLoading(true);
    }
  }, 500);

  //페이지 계산해서 get 요청 보내고 page 카운트 올리기
  useEffect(() => {
    if (
      (page === 1 && searchList.length === 0) ||
      isSearch === true ||
      isSearch === false
    ) {
      dispatch(__getSearchResult({ key, sort, page }));
    }
    if (searchList.length !== 0) {
    }
  }, [key, isSearch]);

  //제목으로 검색 눌렀을 때
  const onChangeTitle = () => {
    setTitle(true);
    setWriter(false);
  };

  //작성작로 검색 눌렀을 때
  const onChangeWriter = () => {
    setTitle(false);
    setWriter(true);
  };

  return (
    <Fragment>
      {errors.search && <ErrorMsg>{errors.search.message}</ErrorMsg>}
      <SearchBox1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SearchInput
            type="search"
            name="search"
            placeholder="제목이나 작성자로 검색해주세요"
            aria-invalid={
              !isDirty ? undefined : errors.email ? "true" : "false"
            }
            {...register("search", {
              required: "검색어를 입력해주세요",
              pattern: {
                value: /^[0-9|a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ]*$/,
                message: "검색어는 공백이나 특수문자는 포함할 수 없습니다.",
              },
            })}
          />
          <SearchImg
            src={`${search}`}
            alt="search"
            onClick={handleSubmit(onSubmit)}
          />
        </Form>
      </SearchBox1>
      <SearchBox>
        {sort === "title" && (
          <>
            {title && !writer && (
              <>
                <CheckBox>
                  <LabelTitle onClick={onChangeTitle}>제목으로 검색</LabelTitle>
                </CheckBox>
                <NotCheckBox>
                  <LabelWriter onClick={onChangeWriter}>
                    작성자로 검색
                  </LabelWriter>
                </NotCheckBox>
              </>
            )}
            {!title && writer && (
              <>
                <NotCheckBox>
                  <LabelTitle onClick={onChangeTitle}>제목으로 검색</LabelTitle>
                </NotCheckBox>
                <CheckBox>
                  <LabelWriter onClick={onChangeWriter}>
                    작성자로 검색
                  </LabelWriter>
                </CheckBox>
              </>
            )}
          </>
        )}
        {sort === "writer" && (
          <>
            {title && !writer && (
              <>
                <CheckBox>
                  <LabelTitle onClick={onChangeTitle}>제목으로 검색</LabelTitle>
                </CheckBox>
                <NotCheckBox>
                  <LabelWriter onClick={onChangeWriter}>
                    작성자로 검색
                  </LabelWriter>
                </NotCheckBox>
              </>
            )}

            {!title && writer && (
              <>
                <NotCheckBox>
                  <LabelWriter onClick={onChangeTitle}>
                    제목으로 검색
                  </LabelWriter>
                </NotCheckBox>
                <CheckBox>
                  <LabelWriter onClick={onChangeWriter}>
                    작성자로 검색
                  </LabelWriter>
                </CheckBox>
              </>
            )}
          </>
        )}
      </SearchBox>

      <ImgBox>
        {sort === "title" && searchList?.length === 0 && (
          <div style={{ margin: "30px auto", textAlign: "center" }}>
            <h1>검색하신 {key}의 </h1>
            <h1>결과가 없습니다</h1>
            <h3>다시 검색해주세요</h3>
          </div>
        )}
        {sort === "writer" && searchList?.length === 0 && (
          <div style={{ margin: "30px auto", textAlign: "center" }}>
            <h1>검색하신 {key}님이 </h1>
            <h1> 없습니다</h1>
            <h3>다시 검색해주세요</h3>
          </div>
        )}
        {sort === "title" &&
          searchList?.map((search) => (
            <Img
              key={search?.postId}
              src={search?.imgUrl}
              onClick={() =>
                navigate(`/item_detail/${search?.postId}/${search?.userId}`)
              }
              alt="search_result_image"
              onError={(e) =>
                (e.target.src = `${search?.imgUrl.split("w280")[0]}post${
                  search?.imgUrl.split("w280")[1]
                }`)
              }
            ></Img>
          ))}
        {sort === "writer" &&
          searchList?.map((search) => (
            <NickImgBox key={search?.postId} style={{ textAlign: "center" }}>
              <Nickname>{search?.nickname}님</Nickname>
              <Img
                src={search?.imgUrl}
                onClick={() => navigate(`/mypage/${search?.userId}`)}
                alt="search_result_image"
              ></Img>
            </NickImgBox>
          ))}
      </ImgBox>
    </Fragment>
  );
};

const SearchBox1 = styled.div`
  margin: 0 auto;
  width: 350px;
`;

const Form = styled.form`
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: baseline;
  flex-direction: row;
`;

const ErrorMsg = styled.p`
  color: #c60000;
  font-size: 10px;
  margin-bottom: -20px;
  display: none;
`;
const SearchBox = styled.div`
  display: flex;
  margin: -20px auto 10px;
  padding-top: 7px;
  border-top: 3px solid #fff;
  width: 350px;
  align-items: left;
  flex-grow: 2;
  justify-content: baseline;
  flex-direction: row;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: #2d273f;

  .check {
    border: none;
    background-color: transparent;
    background-color: #2d273f;
    color: red;
  }
`;
const LabelTitle = styled.label`
  color: #2d273f;
  cursor: pointer;
`;
const LabelWriter = styled.label`
  display: block;
  color: #2d273f;
  cursor: pointer;
`;
const CheckBox = styled.div`
  padding: 5px 5px 10px 5px;
  border-radius: 0 0 10px 10px;
  width: 100%;
  height: 15px;
  text-align: center;
  background-color: #e4ddef;
`;
const NotCheckBox = styled.div`
  padding: 5px 5px 10px 5px;
  border-radius: 10px;
  width: 100%;
  height: 15px;
  text-align: center;
`;

const SearchInput = styled.input`
  border-radius: 10px 10px 0 0;
  width: 350px;
  height: 50px;
  border: none;
  background-color: #e4ddef;
  text-align: center;

  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 1em;
    font-weight: 400;
    opacity: 1; /* Firefox */
  }
`;

const SearchImg = styled.img`
  margin-left: -45px;
  border: 0;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
`;

const ImgBox = styled.div`
  display: flex;
  width: 346px;
  margin: 0 auto;
  flex-wrap: wrap;
  white-space: pre-wrap;
`;
const Img = styled.img`
  margin: 1px 1px 1px 1px;
  width: 171px;
  height: 225px;
  flex-direction: column;
  cursor: pointer;
`;
const NickImgBox = styled.div`
  position: relative;
  display: flex;
  margin-top: 0px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Nickname = styled.p`
  margin: 0px;
  text-align: center;
  font-weight: 800;
  font-size: 16px;
  color: #4b4950;
`;

export default SearchResultForm;
