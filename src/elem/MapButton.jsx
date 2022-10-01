import React from "react";
import styled from "styled-components";

const heart_filled = "/images/Location_searching.png";
const heart_black = "/images/Location_disabled.png";

const HeartButton = ({ _onClick, is_like }) => {
  const icon_url = is_like ? heart_filled : heart_black;

  return (
    <React.Fragment>
      <Heart onClick={_onClick} alt="ON" src={icon_url}></Heart>
    </React.Fragment>
  );
};

const Heart = styled.img`
  width: 16px;
  height: 16px;
  float: right;
  cursor: pointer;
`;

export default React.memo(HeartButton);
