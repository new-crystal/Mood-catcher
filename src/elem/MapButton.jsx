import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const heart_filled = "/images/Location_searching.png";
const heart_black = "/images/Location_disabled.png";

const MapButton = ({ _onClick }) => {
  const isExistsMap = useSelector((state) => state.kakao.isExistsMap);
  const icon_url = isExistsMap ? heart_filled : heart_black;

  return (
    <React.Fragment>
      <Heart onClick={_onClick} alt="ON" src={icon_url}></Heart>
    </React.Fragment>
  );
};

const Heart = styled.img`
  width: 32px;
  height: 32px;
  left: 50%;
  top: 77px;
  position: fixed;
  z-index: 999;
  cursor: pointer;
`;

export default React.memo(MapButton);
