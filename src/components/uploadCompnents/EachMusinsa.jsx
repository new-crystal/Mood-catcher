import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { selectItem, deleteItem } from "../../redux/modules/uploadSlice";
const EachMusinsa = (props) => {
  const dispatch = useDispatch();

  const { idx } = props;
  const { item } = props;
  const { toTop } = props;

  const [selected, setSelected] = useState(false);

  return (
    <Fragment>
      <RecomandMusinsaWrap className={selected}>
        <MusinsaImage>
          <img src={item.imgUrl} alt="" />
        </MusinsaImage>
        <MusinsaInfoWrap>
          <MusinsaBrand>{item.brand}</MusinsaBrand>
          <MusinsaTitle>{item.name}</MusinsaTitle>
          {item.price.indexOf(" ") !== -1 ? (
            <MusinsaPrice>
              {item.price.slice(item.price.indexOf(" "))}
            </MusinsaPrice>
          ) : (
            <MusinsaPrice>{item.price}</MusinsaPrice>
          )}
        </MusinsaInfoWrap>

        <MusinsaCheckButton
          onClick={() => {
            dispatch(selectItem(item));
            toTop();
          }}
        >
          +
        </MusinsaCheckButton>
      </RecomandMusinsaWrap>
    </Fragment>
  );
};

export default EachMusinsa;

const RecomandMusinsaWrap = styled.div`
  width: 350px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  display: flex;
  border-radius: 10px;
  &.true {
    background-color: grey;
  }
`;

const MusinsaImage = styled.div`
  margin-top: 8px;
  width: 75px;
  height: 75px;
  border-radius: 13px;
  background-color: #f7f7f7;
  background-size: cover;
  /* cursor: pointer; */
  & > img {
    width: 75px;
    height: 75px;
    border-radius: 13px;
  }
  /* @media (img: img) {
    & > img {
      width: 130px;
      height: 130px;
      margin: 9px;
    }
  }
  @media (img: img) {
    & > img {
      width: 148px;
      height: 148px;
    }
  } */
`;

const MusinsaInfoWrap = styled.div`
  width: 134px;
  margin: 10px 5px 0 5px;
  & p {
    margin: 0;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const MusinsaBrand = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MusinsaTitle = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MusinsaPrice = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MusinsaCheckButton = styled.button`
  margin: 30px 0 0 70px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  width: 50px;
  height: 30px;
  background-color: #7b758b;
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 4px #877f92;
`;
