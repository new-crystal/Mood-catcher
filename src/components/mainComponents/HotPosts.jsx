import React, { Fragment } from "react";
import styled from "styled-components";
import { getCookie } from "../../shared/cookie";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token
import { useNavigate } from "react-router-dom";

const junsu = "./images/junsu.PNG";

const HotPosts = ({ hotPosts }) => {
  // console.log(hotPosts);
  const navigate = useNavigate();
  const token = getCookie("token");
  // console.log(jwt(token));
  const { userId } = jwt(token);
  // console.log(ranksIF);
  return (
    <Fragment>
      <Wrap>
        <StTag>Hot</StTag>
      </Wrap>
      <WritedHotInfo>
        <HotImage1>
          <img
            src={hotPosts[0]?.imgUrl}
            onClick={() => {
              navigate(
                `/item_detail/${hotPosts[0].postId}/${hotPosts[0].userId}`
              );
              window.location.reload();
            }}
          />
        </HotImage1>
        <HotWrap>
          <GridHorizonHot>
            <HotImage2>
              <img
                src={hotPosts[1]?.imgUrl}
                onClick={() => {
                  navigate(
                    `/item_detail/${hotPosts[1].postId}/${hotPosts[1].userId}`
                  );
                  window.location.reload();
                }}
              />
            </HotImage2>
          </GridHorizonHot>
          <GridHorizonHot>
            <HotImage3>
              <img
                src={hotPosts[2]?.imgUrl}
                onClick={() => {
                  navigate(
                    `/item_detail/${hotPosts[2].postId}/${hotPosts[2].userId}`
                  );
                  window.location.reload();
                }}
              />
            </HotImage3>
          </GridHorizonHot>
        </HotWrap>
      </WritedHotInfo>
    </Fragment>
  );
};

const Wrap = styled.div`
  margin: 21px auto 10px;
  width: 350px;
`;

const StTag = styled.div`
  margin-bottom: 10px;
  width: 200px;
  height: 40px;
  border-radius: 17px;
  background: linear-gradient(to right, #7b758b 50%, #c8c6d0);
  text-align: center;
  line-height: 40px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Unna";
  color: white;
  box-shadow: 5px 5px 4px #877f92;
`;

const WritedHotInfo = styled.div`
  display: flex;
  margin: 0px auto 37px;
  width: 350px;
  height: 288px;
  background-color: #f6f6f6;
  border-radius: 20px;
  box-shadow: 5px 5px 4px #877f92;
`;

const HotImage1 = styled.div`
  margin: 13px;
  border-radius: 10px;
  width: 80px;
  height: 90px;
  background-color: #ffffff;

  & > img {
    width: 200px;
    height: 266px;
    border-radius: 20px;
    box-shadow: 5px 5px 4px #877f92;
  }
`;

const HotWrap = styled.div`
  margin: 66px 0 30px 50px;
`;

const GridHorizonHot = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
`;

const HotImage2 = styled.div`
  margin: 0 0 40px 70px;
  border-radius: 10px;
  width: 80px;
  height: 90px;
  background-color: #ffffff;
  & > img {
    width: 98px;
    height: 130px;
    border-radius: 20px;
    box-shadow: 5px 5px 4px #877f92;
  }
`;

const HotImage3 = styled.div`
  margin: 215px 0 19px 70px;
  border-radius: 10px;
  width: 80px;
  height: 90px;

  background-color: #ffffff;
  & > img {
    width: 98px;
    height: 130px;
    border-radius: 20px;
    box-shadow: 5px 5px 4px #877f92;
  }
`;

export default HotPosts;
