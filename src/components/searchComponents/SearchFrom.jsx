import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Fragment, useEffect } from "react";
import search from "../../image/search.png";
import heart from "../../image/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { __getSearch, __postSearch } from "../../redux/modules/searchSlice";

const SearchForm = () => {
  const dispatch = useDispatch();
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
    dispatch(__postSearch(data));
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
      <ClosetBox>
        <h1>Other Closet</h1>
      </ClosetBox>
      <OtherClosetBox>
        <NicknameBox>
          <ProfilePic url="https://src.hidoc.co.kr/image/lib/2022/7/13/1657700243750_0.jpg"></ProfilePic>
          <h4>수수</h4>
        </NicknameBox>
        <ImgBox url="https://w.namu.la/s/3b20e583635c0c8c1826780f45af9be65b29aa8bd6b29b4a02c5cca723c01164a2be7fafaf750b99f786d83fa384b2fbb5d368dc9e7163ef852178c37ecc375fb24f0b8780c35bdc8b1ae5a2d5714af655bb1e4b15f37f56b93b7d9a612cc4284bd393a8d8c0f15b239d5d20092b067d"></ImgBox>
        <TextBox>
          <h5>패션왕이 되자!</h5>
          <Heart></Heart>
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

const SearchInput = styled.input`
  background-color: white;
  width: 350px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px 30px;
`;
const ClosetBox = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: #7b758b;
  color: white;
  margin-top: -50px;
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
const OtherClosetBox = styled.div`
  width: 380px;
  height: 380px;
  margin: 10px auto;
  background-color: #e6e5ea;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const NicknameBox = styled.div`
  width: 380px;
  margin-left: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: row;
`;
const ProfilePic = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
const ImgBox = styled.div`
  width: 344px;
  height: 260px;
  margin: 0 auto;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
const TextBox = styled.div`
  width: 340px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
const Heart = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-image: url(${heart});
`;
export default SearchForm;
