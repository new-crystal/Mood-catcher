import { Fragment, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

//통신
import { __getSearch } from "../../redux/async/search";

//컴포넌트
import CardForm from "../../elem/CardForm";

//이미지
import heart from "../../image/heart.png";
import search from "../../image/search.png";

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recommendedList = useSelector((state) => state.search.recommendedPosts); //추천리스트 불러오기
  const last = useSelector((state) => state.search.postLast); //마지막 페이지
  const recommended = [...new Set(recommendedList.map(JSON.stringify))].map(
    JSON.parse
  ); //추천 리스트에서 중복제거
  const [mood, setMood] = useState(`${heart}`);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(true);
  const [writer, setWriter] = useState(false);

  //페이지 계산해서 get 요청 보내고 page 카운트 올리기
  useEffect(() => {
    if (page === 1 && recommended.length === 0) {
      dispatch(__getSearch(page));
      setPage(page + 1);
    }
    if (recommended.length !== 0) {
      setPage(recommended.length / 4 + 1);
    }
  }, [mood]);

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

  //react-hook-form에서 불러오기
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //검색하기
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 300));
    if (title && !writer) {
      navigate(`/search/result/keyword=${data.search}?sort=title`);
    }
    if (!title && writer) {
      navigate(`/search/result/keyword=${data.search}?sort=writer`);
    }
  };

  //추천게시글 불러오기
  const getRecommendedList = useCallback(() => {
    const getRecommended = async () => {
      await dispatch(__getSearch(page));
      setLoading(false);
    };
    return getRecommended();
  }, [page, recommended]);

  //스크롤 위치 계산하기
  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
      if (last) {
        return;
      }
      setPage(page + 1);
      getRecommendedList();
      setLoading(true);
    }
  }, 500);

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
      <SearchBox1 onSubmit={handleSubmit(onSubmit)}>
        <Form>
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
        {title && !writer && (
          <>
            <CheckBox>
              <LabelTitle onClick={onChangeTitle}>제목으로 검색</LabelTitle>
            </CheckBox>
            <NotCheckBox>
              <LabelWriter onClick={onChangeWriter}>작성자로 검색</LabelWriter>
            </NotCheckBox>
          </>
        )}

        {!title && writer && (
          <>
            <NotCheckBox>
              <LabelTitle onClick={onChangeTitle}>제목으로 검색</LabelTitle>
            </NotCheckBox>
            <CheckBox>
              <LabelWriter onClick={onChangeWriter}>작성자로 검색</LabelWriter>
            </CheckBox>
          </>
        )}
      </SearchBox>
      {recommended?.map((item) => (
        <CardForm key={item.postId} item={item} />
      ))}
    </Fragment>
  );
};

const SearchBox1 = styled.form`
  margin: 0 auto;
  width: 350px;
`;

const Form = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: baseline;
  flex-direction: row;
`;

const SearchBox = styled.div`
  display: flex;
  margin: -20px auto 0 auto;
  padding-top: 7px;
  border-top: 3px solid #fff;
  width: 350px;
  flex-grow: 2;
  align-items: left;
  justify-content: baseline;
  flex-direction: row;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: #2d273f;

  .check {
    border: none;
    background-color: #2d273f;
    color: red;
  }
`;
const LabelTitle = styled.label`
  color: #2d273f;
  cursor: pointer;
`;
const LabelWriter = styled.label`
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
  border: none;
  border-radius: 10px 10px 0 0;
  width: 350px;
  height: 50px;
  text-align: center;
  background-color: #e4ddef;

  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 1em;
    font-weight: 400;
    opacity: 1; /* Firefox */
    font-family: "Noto Sans KR", sans-serif;
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

export default SearchForm;
