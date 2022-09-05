import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState } from "react";
import search from "../../image/search.png";
import { useDispatch, useSelector } from "react-redux";
import {
  __getSearchResult,
  __postSearch,
} from "../../redux/modules/searchSlice";
import { useNavigate } from "react-router-dom";
import more from "../../image/more.png";

const SearchResultForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [moreBox, setMoreBox] = useState(false);

  const searchList = useSelector((state) => state.search.searchResult);

  const {
    register,
    getValues,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //검색 결과 조회하기
  useEffect(() => {
    dispatch(__getSearchResult());
  }, []);

  //다시 검색하기
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 300));
    dispatch(__postSearch(data)).then(navigate("/search/result"));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.search && <ErrorMsg>{errors.search.message}</ErrorMsg>}
        <SearchInput
          type="search"
          name="search"
          placeholder="제목, 내용, 닉네임으로 검색해주세요"
          aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
          {...register("search", {
            required: "검색어를 입력해주세요",
            pattern: {
              value: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]$/,
              message: "검색어에는 공백이나 특수문자는 포함할 수 없습니다.",
            },
          })}
        />
        <SearchImg type="submit" disabled={isSubmitting}></SearchImg>
      </form>
      <More onClick={() => setMoreBox(!moreBox)}></More>
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
      ) : null}
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
  background-color: white;
  width: 350px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px 30px;
`;
const SearchImg = styled.button`
  width: 40px;
  height: 40px;
  border: 0;
  background-color: white;
  background-position: center;
  background-size: cover;
  background-image: url(${search});
  position: relative;
  left: 149px;
  top: -58px;
`;
const More = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-image: url(${more});
  display: block;
  float: right;
`;
const MoreList = styled.div`
  width: 140px;
  height: 140px;
  background-color: #ddd;
  border-radius: 20px;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  float: right;
  z-index: 22;
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
export default SearchResultForm;
