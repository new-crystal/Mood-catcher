import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//통신
import { __patchMood } from "../redux/async/like";

//이미지
import heart from "../image/heart.png";
import heartTrue from "../image/heartTrue.png";

const CardForm = (item) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mood, setMood] = useState(`${heart}`); //좋아요 state
  const [likeStatus, setLikeStatus] = useState(item.item.likeStatus); //유저가 좋아요 누른 상태인지 판별
  const [moodNum, setMoodNum] = useState(item.item.likeCount); //좋아요 갯수
  const createdAt = item.item.createdAt.split(" ")[0]; //작성일자
  const year = createdAt.split("-")[0];
  const month = createdAt.split("-")[1];
  const day = createdAt.split("-")[2];

  //새로고침시에도 무드 상태값 유지
  useEffect(() => {
    if (likeStatus === true) {
      setMood(`${heartTrue}`);
    }
    if (likeStatus === false) {
      setMood(`${heart}`);
    }
  }, [mood, likeStatus]);

  //무드 등록
  const onClickMoodBtn = (e) => {
    e.stopPropagation();
    setLikeStatus(true);
    setMoodNum(moodNum + 1);
    dispatch(__patchMood(item.item.postId));
  };

  //무드 취소
  const onClickMoodCancelBtn = (e) => {
    e.stopPropagation();
    setLikeStatus(false);
    setMoodNum(moodNum - 1);
    dispatch(__patchMood(item.item.postId));
  };

  //리사이징 에러 났을 경우
  const onErrorHandler = (e) => {
    if (item.item.imgUrl.split("/")[3] === "w280") {
      const url = item.item.imgUrl.split("w280")[0];
      const name = item.item.imgUrl.split("w280")[1];
      e.target.src = `${url}post${name}`;
    }
    if (item.item.imgUrl.split("/")[3] === "w560") {
      const url = item.item.imgUrl.split("w560")[0];
      const name = item.item.imgUrl.split("w560")[1];
      e.target.src = `${url}post${name}`;
    }
  };

  return (
    <OtherClosetBox
      key={item.item.postId}
      onClick={() =>
        navigate(`/item_detail/${item.item.postId}/${item.item.userId}`)
      }
    >
      <ImgBox
        src={item.item.imgUrl}
        alt="best_image"
        onError={onErrorHandler}
      ></ImgBox>
      <TextBox>
        {item.item.rank === undefined ? (
          <RankText style={{ marginLeft: "25px" }}>
            {year}년 {month}월 {day}일
          </RankText>
        ) : (
          <RankText style={{ marginLeft: "0px", width: "131px" }}>
            {year}년 {month}월 {day}일 {item.item.rank}위👑
          </RankText>
        )}

        <TextContainer>
          <Title>{item.item.title}</Title>
          <Content>{item.item.content}</Content>
          <HeartBox>
            {likeStatus ? (
              <Heart
                src={`${heartTrue}`}
                alt="heart_on"
                onClick={(e) => onClickMoodCancelBtn(e)}
              />
            ) : (
              <Heart
                src={`${heart}`}
                alt="heart_off"
                onClick={(e) => onClickMoodBtn(e)}
              />
            )}

            <p>{moodNum}</p>
          </HeartBox>
        </TextContainer>
      </TextBox>
    </OtherClosetBox>
  );
};

const OtherClosetBox = styled.div`
  display: flex;
  margin: 10px auto;
  border: 3px solid #e6e5ea;
  border-radius: 20px;
  width: 350px;
  height: 200px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  cursor: pointer;
`;

const ImgBox = styled.img`
  margin-left: 15px;
  border-radius: 20px;
  width: 130px;
  height: 170px;
`;
const TextBox = styled.div`
  display: flex;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  height: 170px;
  width: 200px;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  font-weight: 800;
  color: #7b758b;
`;

const Title = styled.p`
  font-size: 18px;
  line-height: 20px;
`;
const Content = styled.h5`
  margin-top: 20px;
  margin-right: 5px;
  font-size: 13px;
  line-height: 15px;
`;
const HeartBox = styled.div`
  display: flex;
  position: absolute;
  margin-top: 166px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const Heart = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const RankText = styled.h4`
  position: absolute;
  left: 33%;
  margin-top: -155px;
  width: 100px;
  font-weight: 800;
  font-size: 12px;
  color: #7b758b;
`;
const TextContainer = styled.div`
  display: flex;
  margin: -20px 5px 0 5px;
  height: 170px;
  width: 190px;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  font-weight: 800;
  color: #7b758b;
`;

export default CardForm;
