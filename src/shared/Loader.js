import React from "react";
// style에 있는 css와 연결
import "./style/loader.css";

const Loader = () => {
  return (
    <>
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
    </>
  );
};

export default Loader;
