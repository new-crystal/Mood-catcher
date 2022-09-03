import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Like from "../../image/heart.png";
import { __representative } from "../../redux/modules/uploadSlice";

const LikeClosetForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState(0);

  //대표게시물로 지정하기
  //postId 보내주기!!!
  const onClickRepBtnHandler = () => {
    dispatch(__representative());
  };

  return (
    <PostBox>
      <PostImg url="https://image.kmib.co.kr/online_image/2018/1127/611211110012870271_1.jpg"></PostImg>
      <PostText>
        <h6>2022.09.17.</h6>
        <h4>내 달걀 후라이</h4>
        <h5>맛있는 달걀후라이</h5>
        <MoodBox>
          <Heart></Heart>
          <p>10000</p>
        </MoodBox>
        <RepresentativeBtn onClick={() => onClickRepBtnHandler()}>
          대표게시물로 지정
        </RepresentativeBtn>
      </PostText>
    </PostBox>
  );
};
const PostBox = styled.div`
  width: 350px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 20px auto;
`;
const PostImg = styled.div`
  width: 130px;
  height: 175px;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
const PostText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px auto;
  color: #7b758b;

  h6 {
    margin-top: 30px;
    margin-left: 100px;
  }
  h4 {
    margin-top: 10px;
  }
`;
const MoodBox = styled.div`
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
  background-image: url(${Like});
`;

const RepresentativeBtn = styled.button``;

export default LikeClosetForm;
