import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState } from "react";
import search from "../../image/search.png";
import { useDispatch, useSelector } from "react-redux";
import { __getSearchResult } from "../../redux/modules/searchSlice";
import { useNavigate, useParams } from "react-router-dom";
import more from "../../image/more.png";

const SearchResultForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [moreBox, setMoreBox] = useState(false);
  const { keyword } = useParams();
  const key = keyword.split("=")[1];
  const sort = window.location.href.split("sort=")[1];

  const searchList = useSelector((state) => state.search.searchResult);

  const {
    register,
    getValues,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //검색 결과 조회하기
  useEffect(() => {
    dispatch(__getSearchResult({ key, sort }));
  }, []);

  //다시 검색하기
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 300));
    navigate(`/search/result/keyword=${data.search}?sort=${data.sort}`);
  };

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
      <ImgBox>
        <Img url="https://dimg.donga.com/wps/NEWS/IMAGE/2022/03/24/112480172.5.jpg"></Img>
        <Img url="https://dimg.donga.com/wps/NEWS/IMAGE/2022/03/24/112480172.5.jpg"></Img>
      </ImgBox>
      <ImgBox>
        <Img url="https://dimg.donga.com/wps/NEWS/IMAGE/2022/03/24/112480172.5.jpg"></Img>
        <Img url="https://dimg.donga.com/wps/NEWS/IMAGE/2022/03/24/112480172.5.jpg"></Img>
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
const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const Img = styled.div`
  margin-left: 10px;
  margin-bottom: 20px;
  width: 180px;
  height: 240px;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
export default SearchResultForm;
