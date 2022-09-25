/*global kakao*/
import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useNavigate } from "react-router-dom";
import "./MapImageStyle.css";
import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "../shared/cookie";
import { useDispatch, useSelector } from "react-redux";
import { __patchMap, __getUsersMap } from "../redux/async/kakao";

const MapImage = (props) => {
  var arr = [];
  let map;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookie("token");

  const checkPatch = useSelector((state) => state.kakao.checkPatch);
  const aroundUser = useSelector((state) => state.kakao.aroundUser);
  const latitude = useSelector((state) => state.kakao.myLatitude);
  const longitude = useSelector((state) => state.kakao.myLongitude);

  console.log(aroundUser);
  const kakao = window.kakao; //카카오객체 불러오기
  const mapContainer = useRef(null); //맵 컨테이너 Ref로 받아오기
  const [mapState, setMapState] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false); //맵 로딩전까지 로더 보여주기
  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다

  const placeView = async () => {
    await findLocation();
  };

  useEffect(() => {
    // 카카오 맵 실행
    if (kakao?.maps !== undefined) {
      setMapState(true);
    }
    placeView();
  }, [mapState]);

  useEffect(() => {
    kakaoMap(latitude, longitude, aroundUser);
  }, [checkPatch]);

  const findLocation = (place) => {
    //사용자의 현위치 허용/차단 여부 반영
    if (navigator.geolocation.getCurrentPosition) {
      // 현위치로 맵 위치 변경
      setLoadingMap(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLoadingMap(false);
        dispatch(__patchMap({ latitude, longitude }))
          .then(dispatch(__getUsersMap()))
          .then(console.log("testest"));
        // .then(kakaoMap(latitude, longitude, aroundUser));
      });
    } else {
      // 현위치를 못 불러올 때 default 위치 적용
      console.log("testdefault");
      setLoadingMap(true);
      const latitude = 37.4995482;
      const longitude = 127.0291611;
      dispatch(__patchMap({ latitude, longitude })).then(
        dispatch(__getUsersMap())
      );
      // .then(kakaoMap(latitude, longitude, aroundUser));
    }
  };

  const kakaoMap = (latitude, longitude, dataArray) => {
    console.log(latitude, longitude, dataArray);
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    console.log(dataArray.length);
    console.log(dataArray);
    // 마커가 표시될 위치입니다
    for (let i = 0; i < dataArray.length; i++) {
      // function closeOverlay(idx) {
      //   console.log(idx);
      //   arr[idx].setMap(null);
      // }
      // function navCloset(data) {
      //   navigate(`/mypage/${data}`);
      // }
      const data = dataArray[i];
      console.log(data);
      var content =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        `            ${data.nickname}` +
        `            <div class="close" onclick="closeOverlay()" title="닫기"></div>` +
        "        </div>" +
        `        <div class="body" onclick="location.href='http://moodcatch.link'">` +
        '            <div class="img">' +
        `                <img src="${data.imgUrl}" width="73" height="73" >` +
        "           </div>" +
        '            <div class="desc">' +
        `                <div class="ellipsis">${data.age}</div>` +
        `                <div class="ellipsis">${data.gender}</div>` +
        `                <div class="jibun ellipsis">point : ${data.moodPoint}</div>` +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";
      // 지도에 마커를 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(data.latitude, data.longitude),
      });
      // 마커 위에 커스텀오버레이를 표시합니다
      // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
      var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
      });
      arr.push(overlay);
      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, "click", function () {
        arr[i].setMap(map);
      });

      window.closeOverlay = () => {
        overlay.setMap(null);
      };
    }
  };

  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <div>
            <div
              id="map"
              ref={mapContainer}
              style={{
                width: "428px",
                height: "calc(var(--vh, 1vh) * 100 + 50px)",
              }}
            ></div>
          </div>
        </Grid>
      </Container>
      <NavigationBar props={props} />
    </Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 926px; */
  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: auto;
    text-align: left;
  }
`;

const Grid = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 57px;
  max-width: 428px;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100 + 50px);
  background: linear-gradient(#a396c9, #ffffff);
  /* background: #a396c9; */
`;

export default React.memo(MapImage);
