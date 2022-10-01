import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState, useCallback } from "react";
import search from "../../image/search.png";
import heart from "../../image/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { __getSearch } from "../../redux/async/search";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import SearchItem from "./SearchItem";

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
  const users = useSelector((state) => state.login.userStatus);
  const last = useSelector((state) => state.search.postLast);
  const recommended = [...new Set(recommendedList.map(JSON.stringify))].map(
    JSON.parse
  );

  //react-hook-form에서 불러오기
  const {
    register,
    formState: { errors, isDirty, isSubmitting },
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
      setPage(recommended.length);
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
      <Container>
        <Grid>
          {errors.search && <ErrorMsg>{errors.search.message}</ErrorMsg>}
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
            <SearchImg type="submit" disabled={isSubmitting}></SearchImg>
          </Form>
          <SearchBox>
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
          </SearchBox>
          <ClosetBox>
            <h1>Other Closet</h1>
          </ClosetBox>
          {recommended?.map((item) => (
            <SearchItem key={item.postId} item={item} />
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

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
  margin-bottom: 57px;
  max-width: 428px;
  width: 100vw;
`;

const Form = styled.form`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: baseline;
  flex-direction: row;
`;
const ErrorMsg = styled.p`
  color: #c60000;
  font-size: 10px;
  margin-left: 40px;
  margin-bottom: -20px;
`;
const SearchBox = styled.div`
  width: 348px;
  margin: 0 auto;
  border-top: 3px solid #fff;
  padding-top: 7px;
  margin-top: -20px;
  display: flex;
  align-items: left;
  justify-content: baseline;
  flex-direction: row;
  font-family: "Unna";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  color: #2d273f;

  .check {
    background-color: transparent;
    border: none;
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
  width: 100px;
  height: 15px;
  padding: 5px;
  border-bottom: 2px solid #fff;
`;
const NotCheckBox = styled.div`
  width: 100px;
  height: 15px;
  padding: 5px;
`;

const SearchInput = styled.input`
  background-color: rgba(0, 0, 0, 0);
  width: 350px;
  height: 50px;
  border: none;
  border-radius: 10px;
  margin-left: 40px;
  :focus {
    outline: none;
  }
`;

const ClosetBox = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  margin-top: -10px;
  font-family: "Unna";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  margin-left: 40px;
`;

const SearchImg = styled.button`
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
export default SearchForm;
