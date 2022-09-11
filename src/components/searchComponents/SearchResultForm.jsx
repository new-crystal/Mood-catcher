import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState, useCallback } from "react";
import search from "../../image/search.png";
import { useDispatch, useSelector } from "react-redux";
import { __getSearchResult } from "../../redux/modules/searchSlice";
import { useNavigate, useParams } from "react-router-dom";
import more from "../../image/more.png";
import _ from "lodash";

const SearchResultForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [moreBox, setMoreBox] = useState(false);
  const { keyword } = useParams();
  const key = keyword.split("=")[1];
  const sort = window.location.href.split("sort=")[1];
  const [page, setPage] = useState(4);
  const [loading, setLoading] = useState(false);

  //검색 결과 받아오기
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
    navigate(`/search/result/keyword=${data.search}?sort=${data.sort}`);
  };

  //검색글 불러오기
  const getSearchList = useCallback(() => {
    const getSearch = async () => {
      await dispatch(__getSearchResult({ key, sort, page }));
      setLoading(false);
    };
    return getSearch();
  }, [page, searchList]);

  //스크롤 위치 계산하기
  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
      if (page >= 13) {
        return;
      }
      setPage((pre) => pre + 1);
      getSearchList();
      setLoading(true);
    }
  }, 500);

  //페이지 계산해서 get 요청 보내고 page 카운트 올리기
  useEffect(() => {
    if (page === 4 && searchList.length === 0) {
      dispatch(__getSearchResult({ key, sort, page }));
      setPage((pre) => pre + 1);
    }
    if (searchList.length !== 0) {
      setPage(searchList.length / 8 + 1);
    }
  }, []);

  //윈도우 스크롤 위치 계산하기
  useEffect(() => {
    if (loading) {
      return;
    }
    window.addEventListener("scroll", _scrollPosition);
    return () => {
      window.removeEventListener("scroll", _scrollPosition);
    };
  }, [page, loading]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.search && <ErrorMsg>{errors.search.message}</ErrorMsg>}
        <SearchInput
          type="search"
          name="search"
          placeholder="제목이나 내용으로 검색해주세요"
          aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
          {...register("search", {
            required: "검색어를 입력해주세요",
            pattern: {
              value: /^[0-9|a-z|A-Z|가-힣]*$/,
              message: "검색어에는 공백이나 특수문자는 포함할 수 없습니다.",
            },
          })}
        />
        <SearchImg type="submit" disabled={isSubmitting}></SearchImg>
      </form>
      <SearchBox>
        <input type="radio" value="title" checked {...register("sort")} />
        <label>제목으로 검색하기</label>
        <input type="radio" value="writer" {...register("sort")} />
        <label>작성자로 검색하기</label>
      </SearchBox>
      {/* <More onClick={() => setMoreBox(!moreBox)}></More>
      {moreBox ? (
        <MoreList>
          <Mores>
            <p>남자 최신순</p>
          </Mores>
          <Mores>
            <p>여자 최신순</p>
          </Mores>
          <Mores>
            <p>남자 인기순</p>
          </Mores>
          <Mores>
            <p>여자 인기순</p>
          </Mores>
        </MoreList>
      ) : null} */}
      <ImgBox>
        {searchList.length === 0 ? (
          <div>
            <h1>검색 결과가 없습니다</h1>
            <h3>다시 검색해주세요</h3>
          </div>
        ) : (
          searchList.map((se) => (
            <>
              <Img
                url={se.imgUrl}
                onClick={() => navigate(`/item_detail/${se.postId}`)}
              ></Img>
            </>
          ))
        )}
      </ImgBox>
    </Fragment>
  );
};

const ErrorMsg = styled.p`
  color: #c60000;
  font-size: 10px;
  margin-left: -150px;
  margin-bottom: -10px;
`;

const SearchInput = styled.input`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  width: 350px;
  height: 50px;
  border-radius: 10px;
  margin: 10px 30px;
  :focus {
    outline: none;
  }
`;
const SearchBox = styled.div`
  width: 348px;
  margin: 0 auto;
  border-top: 3px solid #fff;
  position: relative;
  top: -60px;
  display: flex;
  align-items: left;
  justify-content: baseline;
  flex-direction: row;
`;

const SearchImg = styled.button`
  width: 40px;
  height: 40px;
  border: 0;
  background-color: rgba(0, 0, 0, 0);
  background-position: center;
  background-size: cover;
  background-image: url(${search});
  position: relative;
  left: 150px;
  top: -58px;
  cursor: pointer;
`;
const More = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-image: url(${more});
  display: block;
  float: right;
  margin-top: -40px;
`;
const MoreList = styled.div`
  width: 140px;
  height: 140px;
  background-color: #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  float: right;
  margin-bottom: -150px;
`;
const Mores = styled.div`
  width: 120px;
  height: 40px;
  background-color: white;
  border-radius: 10px;
  margin: 5px;
  text-align: center;
  z-index: 222;

  p {
    font-size: 10px;
    margin: 4px;
  }
`;
const ImgBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 420px;
`;
const Img = styled.div`
  flex-direction: column;
  margin-left: 22.5px;
  margin-bottom: 25px;
  width: 180px;
  height: 240px;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  /* position: relative;
  overflow: hidden; */
`;
export default SearchResultForm;
