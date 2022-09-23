import React from "react";
// style에 있는 css와 연결
import "./style/loader.css";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderWrap>
      {/* 위치를 잡아준다. */}
      <div className="loadingio-spinner-spinner-wt52qsoww8">
        {/* 처음 클래스를 잡아주고 css의 nth-child를 통해 돌아가는 
        무늬를 구현 */}
        <div className="ldio-4yxmiifm49g">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </LoaderWrap>
  );
};

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

export default Loader;
