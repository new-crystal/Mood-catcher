import { useEffect } from "react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import heart from "../../image/heart.png";
import { api } from "../../shared/api";
import { getCookie } from "../../shared/cookie";
import jwt_decode from "jwt-decode";
import { __getUser } from "../../redux/modules/loginSlice";

const SearchOtherCloset = () => {
  const dispatch = useDispatch();
  const [passengers, setPassengers] = useState([]);
  const [page, setPage] = useState(1);
  const token = getCookie("token");
  const payload = jwt_decode(token);
  const users = useSelector((state) => state.login.userStatus);

  useEffect(() => {
    dispatch(__getUser(payload.userId));
  }, []);

  const options = {};
  const [ref, inView] = useInView(options);

  const fetch = async (page) => {
    const response = await api.get(`/posts?page=${page}&count=2`);
    const fetchedPassengers = response.data;
    console.log(response);

    setPassengers((pre) => [...pre, fetchedPassengers]);
  };
  useEffect(() => {
    fetch(page);
  }, []);

  useEffect(() => {
    if (inView) {
      setPage((pre) => pre + 1);
    }
  }, []);

  return (
    <div>
      {passengers &&
        passengers.map((passenger, i) => {
          const lastElement = i === passenger.length - 1;
          return (
            <OtherClosetBox
              key={i}
              className={lastElement ? "last-child" : ""}
              ref={lastElement ? ref : null}
            >
              <ImgBox url="https://dimg.donga.com/wps/NEWS/IMAGE/2022/03/24/112480172.5.jpg"></ImgBox>
              <TextBox>
                <p>내 다리 롱다리</p>
                <h5>짱짱 롱다리</h5>
                <HeartBox>
                  <Heart></Heart>
                  <p>1000</p>
                </HeartBox>
              </TextBox>
            </OtherClosetBox>
          );
        })}
    </div>
  );
};

const OtherClosetBox = styled.div`
  width: 350px;
  height: 200px;
  margin: 10px auto;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const ImgBox = styled.div`
  margin-left: 10px;
  width: 130px;
  height: 170px;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
const TextBox = styled.div`
  margin-left: 30px;
  width: 200px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  color: #7b758b;
`;

const HeartBox = styled.div`
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
  background-image: url(${heart});
`;

export default SearchOtherCloset;
