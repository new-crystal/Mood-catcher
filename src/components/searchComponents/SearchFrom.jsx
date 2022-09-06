import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Fragment, useEffect } from "react";
import search from "../../image/search.png";
import heart from "../../image/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { __getSearch } from "../../redux/modules/searchSlice";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recommended = useSelector((state) => state.search.recommendedPosts);

  const {
    register,
    setError,
    getValues,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //검색하기
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 300));
    navigate(`/search/result/&{data}`);
  };

  //추천게시물 조회하기
  useEffect(() => {
    dispatch(__getSearch());
  }, []);

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
      <SearchBox></SearchBox>
      <ClosetBox>
        <h1>Other Closet</h1>
      </ClosetBox>
      <OtherClosetBox>
        <ImgBox url="https://dimg.donga.com/wps/NEWS/IMAGE/2022/03/24/112480172.5.jpg"></ImgBox>
        <TextBox>
          <p>내 다리 롱다리</p>
          <h5>짱짱 롱다리</h5>
          <HeartBox>
            <Heart></Heart>
            <p>1000</p>
          </HeartBox>
        </TextBox>
      </OtherClosetBox>
    </Fragment>
  );
};
const ErrorMsg = styled.p`
  color: #c60000;
  font-size: 10px;
  margin-left: -150px;
  margin-bottom: -10px;
`;
const SearchBox = styled.div`
  width: 348px;
  margin: 0 auto;
  border-top: 3px solid #fff;
  position: relative;
  top: -50px;
`;

const SearchInput = styled.input`
  background-color: rgba(0, 0, 0, 0);
  width: 350px;
  height: 50px;
  border: 0px;
  border-radius: 10px;
  margin: 10px 30px;
`;
const ClosetBox = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  margin-top: -50px;
  font-family: "Unna";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  margin-left: 40px;
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
  left: 330px;
  top: -58px;
`;
const OtherClosetBox = styled.div`
  width: 350px;
  height: 200px;
  margin: 10px auto;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const ImgBox = styled.div`
  margin-left: 10px;
  width: 130px;
  height: 170px;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
const TextBox = styled.div`
  margin-left: 30px;
  width: 200px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  color: #7b758b;
`;

const HeartBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const Heart = styled.div`
  width: 20px;
  height: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${heart});
`;
export default SearchForm;
