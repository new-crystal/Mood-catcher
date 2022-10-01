import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import heart from "../../image/heart.png";
import heartTrue from "../../image/heartTrue.png";
import { useState, useEffect } from "react";
import { __patchMood } from "../../redux/async/like";

const BestItem = (item) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mood, setMood] = useState(`${heart}`);
  const [likeStatus, setLikeStatus] = useState(item.item.likeStatus);
  const [moodNum, setMoodNum] = useState(item.item.likeCount);
  const createdAt = item.item.createdAt.split(" ")[0];
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
  const onClickMoodBtn = () => {
    setLikeStatus(true);
    setMoodNum(moodNum + 1);
    dispatch(__patchMood(item.item.postId));
  };

  //무드 취소
  const onClickMoodCancelBtn = () => {
    setLikeStatus(false);
    setMoodNum(moodNum - 1);
    dispatch(__patchMood(item.item.postId));
  };
  //리사이징 에러 났을 경우
  const onErrorHandler = (e) => {
    const url = item.item.imgUrl.split("w560")[0];
    const name = item.item.imgUrl.split("w560")[1];
    e.target.src = `${url}post${name}`;
  };

  return (
    <OtherClosetBox key={item.item.postId}>
      <ImgBox
        src={item.item.imgUrl}
        alt="best_image"
        onClick={() =>
          navigate(`/item_detail/${item.item.postId}/${item.item.userId}`)
        }
        onError={onErrorHandler}
      ></ImgBox>
      <TextBox>
        <RankText>
          {year}년 {month}월 {day}일 {item.item.rank}위👑
        </RankText>
        <TextContainer>
          <p>{item.item.title}</p>
          <h5>{item.item.content}</h5>
          <HeartBox>
            {likeStatus ? (
              <Heart
                url={`${heartTrue}`}
                onClick={onClickMoodCancelBtn}
              ></Heart>
            ) : (
              <Heart url={`${heart}`} onClick={onClickMoodBtn}></Heart>
            )}

            <p>{moodNum}</p>
          </HeartBox>
        </TextContainer>
      </TextBox>
    </OtherClosetBox>
  );
};
const OtherClosetBox = styled.div`
  width: 350px;
  height: 200px;
  margin: 10px auto;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  border: 3px solid #e6e5ea;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const ImgBox = styled.img`
  margin-left: 10px;
  width: 130px;
  height: 170px;
  border-radius: 20px;
`;
const TextBox = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  height: 170px;
  width: 200px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 800;
  color: #7b758b;
  p {
    font-size: 18px;
  }
  h5 {
    font-size: 13px;
    margin-top: -10px;
  }
`;

const HeartBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  margin-top: 166px;
`;
const Heart = styled.div`
  width: 20px;
  height: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  cursor: pointer;
`;
const RankText = styled.h4`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 800;
  color: #7b758b;
  /* margin-left: 50px;
  margin-bottom: 0px;
  margin-top: 10px; */
  font-size: 12px;
  position: absolute;
  left: 57%;
  margin-top: -160px;
`;
const TextContainer = styled.div`
  margin-top: -20px;
  margin-left: 10px;
  height: 170px;
  width: 200px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 800;
  color: #7b758b;
`;

export default BestItem;
