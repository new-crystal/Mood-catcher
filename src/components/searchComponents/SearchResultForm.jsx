import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState, useCallback } from "react";
import search from "../../image/search.png";
import { useDispatch, useSelector } from "react-redux";
import { __getSearchResult } from "../../redux/async/search";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

const SearchResultForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword } = useParams();
  const key = keyword.split("=")[1];
  const sort = window.location.href.split("sort=")[1];
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(true);
  const [writer, setWriter] = useState(false);
  const last = useSelector((state) => state.search.resultPostLast);

  //검색 결과 받아오기/유저 정보 불러오기
  const searchList = useSelector((state) => state.search.searchResult);

  //react-hook-form 사용하기
  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //다시 검색하기
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 300));
    if (title && !writer) {
      navigate(`/search/result/keyword=${data.search}?sort=title`);
    }
    if (!title && writer) {
      navigate(`/search/result/keyword=${data.search}?sort=writer`);
    }
    window.location.reload();
  };

  //검색글 불러오기
  const getSearchList = useCallback(() => {
    const getSearch = async () => {
      await dispatch(__getSearchResult({ key, sort, page }));
      setLoading(false);
    };
    return getSearch();
  }, [page, searchList, key]);

  //스크롤 위치 계산하기
  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
      if (last) {
        return;
      }
      setPage((pre) => pre + 1);
      getSearchList();
      setLoading(true);
    }
  }, 500);

  //페이지 계산해서 get 요청 보내고 page 카운트 올리기
  useEffect(() => {
    if (page === 1 && searchList.length === 0) {
      dispatch(__getSearchResult({ key, sort, page }));
      setPage((pre) => pre + 1);
    }
    if (searchList.length !== 0) {
      setPage(searchList.length);
    }
  }, [key]);

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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SearchInput
          type="search"
          name="search"
          placeholder="제목이나 내용으로 검색해주세요"
          aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
          {...register("search", {
            required: "검색어를 입력해주세요",
            pattern: {
              value: /^[0-9|a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ]*$/,
              message: "검색어에는 공백이나 특수문자는 포함할 수 없습니다.",
            },
          })}
        />
        <SearchImg type="submit" disabled={isSubmitting}></SearchImg>
      </Form>
      <SearchBox>
        {sort === "title" && (
          <>
            {title && !writer && (
              <>
                <CheckBox>
                  <LabelTitle onClick={onChangeTitle}>
                    제목으로 검색하기
                  </LabelTitle>
                </CheckBox>
                <NotCheckBox>
                  <LabelWriter onClick={onChangeWriter}>
                    작성자로 검색하기
                  </LabelWriter>
                </NotCheckBox>
              </>
            )}
            {!title && writer && (
              <>
                <NotCheckBox>
                  <LabelTitle onClick={onChangeTitle}>
                    제목으로 검색하기
                  </LabelTitle>
                </NotCheckBox>
                <CheckBox>
                  <LabelWriter onClick={onChangeWriter}>
                    작성자로 검색하기
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
                  <LabelTitle onClick={onChangeTitle}>
                    제목으로 검색하기
                  </LabelTitle>
                </CheckBox>
                <NotCheckBox>
                  <LabelWriter onClick={onChangeWriter}>
                    작성자로 검색하기
                  </LabelWriter>
                </NotCheckBox>
              </>
            )}

            {!title && writer && (
              <>
                <NotCheckBox>
                  <LabelWriter onClick={onChangeTitle}>
                    제목으로 검색하기
                  </LabelWriter>
                </NotCheckBox>
                <CheckBox>
                  <LabelWriter onClick={onChangeWriter}>
                    작성자로 검색하기
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
              key={search.postId}
              src={search.imgUrl}
              onClick={() =>
                navigate(`/item_detail/${search.postId}/${search.userId}`)
              }
              alt="search_result_image"
              onError={(e) =>
                (e.target.src = `${search.imgUrl.split("w280")[0]}post${
                  search.imgUrl.split("w280")[1]
                }`)
              }
            ></Img>
          ))}
        {sort === "writer" &&
          searchList?.map((search) => (
            <NickImgBox key={search.postId} style={{ textAlign: "center" }}>
              <Nickname>{search.nickname}님</Nickname>
              <Img
                src={search.imgUrl}
                onClick={() => navigate(`/mypage/${search.userId}`)}
                alt="search_result_image"
              ></Img>
            </NickImgBox>
          ))}
      </ImgBox>
    </Fragment>
  );
};

const Form = styled.form`
  height: 110px;
  margin-bottom: 0px;
`;

const ErrorMsg = styled.p`
  color: #c60000;
  font-size: 10px;
  margin-left: 40px;
  margin-bottom: -20px;
`;

const SearchInput = styled.input`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  width: 350px;
  height: 50px;
  border-radius: 10px;
  margin: 10px 40px;
  :focus {
    outline: none;
  }
`;
const SearchBox = styled.div`
  width: 348px;
  margin: 0 auto;
  border-top: 3px solid #fff;
  padding-top: 7px;
  position: relative;
  top: -60px;
  display: flex;
  align-items: left;
  justify-content: baseline;
  flex-direction: row;
  font-family: "Unna";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  color: #2d273f;
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
  width: 125px;
  height: 15px;
  padding: 5px;
  border-bottom: 2px solid #fff;
`;
const NotCheckBox = styled.div`
  width: 125px;
  height: 15px;
  padding: 5px;
`;

const SearchImg = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  background-color: rgba(0, 0, 0, 0);
  background-position: center;
  background-size: cover;
  background-image: url(${search});
  position: relative;
  left: 340px;
  top: -50px;
  cursor: pointer;
`;

const ImgBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 420px;
  white-space: pre-wrap;
`;
const Img = styled.img`
  flex-direction: column;
  margin-left: 22.5px;
  margin-bottom: 25px;
  width: 180px;
  height: 240px;
  border-radius: 20px;
  /* position: relative;
  overflow: hidden; */
`;
const NickImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 0px;
  position: relative;
  top: -30px;
`;
const Nickname = styled.p`
  margin: 0px;
  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  color: #4b4950;
`;

export default SearchResultForm;
