import React, { Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const HotPosts = ({ hotPosts }) => {
  const navigate = useNavigate();

  const onClickHandler = useCallback(
    (hotPosts) => {
      navigate(`/item_detail/${hotPosts.postId}/${hotPosts.userId}`);
    },
    [navigate]
  );

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
              onClickHandler(hotPosts[0]);
            }}
          />
        </HotImage1>
        <HotWrap>
          <GridHorizonHot>
            <HotImage2>
              <img
                src={hotPosts[1]?.imgUrl}
                onClick={() => {
                  onClickHandler(hotPosts[1]);
                }}
              />
            </HotImage2>
          </GridHorizonHot>
          <GridHorizonHot>
            <HotImage3>
              <img
                src={hotPosts[2]?.imgUrl}
                onClick={() => {
                  onClickHandler(hotPosts[2]);
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
