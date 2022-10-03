import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState, useCallback } from "react";
import search from "../../image/search.png";
import heart from "../../image/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { __getSearch } from "../../redux/async/search";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import CardForm from "../../elem/CardForm";

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mood, setMood] = useState(`${heart}`);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(true);
  const [writer, setWriter] = useState(false);

  //정보 불러오기
  const recommendedList = useSelector((state) => state.search.recommendedPosts);
  const last = useSelector((state) => state.search.postLast);
  const recommended = [...new Set(recommendedList.map(JSON.stringify))].map(
    JSON.parse
  );

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
          <SearchImg onClick={handleSubmit(onSubmit)}></SearchImg>
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
  width: 350px;
  margin: 0 auto;
`;

const Form = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: baseline;
  flex-direction: row;
`;

const SearchBox = styled.div`
  flex-grow: 2;
  width: 350px;
  margin: 0 auto;
  border-top: 3px solid #fff;
  padding-top: 7px;
  margin-top: -20px;
  display: flex;
  align-items: left;
  justify-content: baseline;
  flex-direction: row;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  color: #2d273f;

  .check {
    background-color: transparent;
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
  display: block;
  color: #2d273f;
  cursor: pointer;
`;
const CheckBox = styled.div`
  width: 100%;
  height: 15px;
  padding: 5px 5px 10px 5px;
  text-align: center;
  /* background-color: rgba(0, 0, 0, 0.3); */
  background-color: #e4ddef;

  border-radius: 0 0 10px 10px;
`;
const NotCheckBox = styled.div`
  width: 100%;
  height: 15px;
  text-align: center;
  padding: 5px 5px 10px 5px;
  border-radius: 10px;
`;

const SearchInput = styled.input`
  /* background-color: rgba(0, 0, 0, 0.3); */
  background-color: #e4ddef;

  width: 350px;
  height: 50px;
  border: none;
  text-align: center;
  border-radius: 10px 10px 0 0;
  /* margin: 0 auto; */
  /* margin-left: 40px; */
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
const SearchImg = styled.div`
  width: 30px;
  height: 30px;
  border: 0;
  background-color: rgba(0, 0, 0, 0);
  background-position: center;
  background-size: cover;
  background-image: url(${search});
  margin-left: -45px;
  cursor: pointer;
`;
const ClosetBox = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: #e4ddef;
  color: white;
  margin-top: -10px;
  font-family: "Unna";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  margin-left: 40px;
`;
export default SearchForm;
