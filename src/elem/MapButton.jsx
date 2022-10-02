import React from "react";
import styled from "styled-components";

const heart_filled = "/images/Location_searching.png";
// const heart_black = "/images/Location_disabled.png";
const heart_black = "/images/Location_searching.png";

const HeartButton = ({ _onClick, is_like }) => {
  console.log(is_like);
  const icon_url = is_like ? heart_filled : heart_black;

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

// export default React.memo(HeartButton);
export default HeartButton;
