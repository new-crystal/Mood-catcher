import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getAlarm, __deleteAlarm } from "../../redux/async/alarm";
import Swal from "sweetalert2";

const AlarmForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alarmStatus, setAlarmStatus] = useState(false);
  const alarms = useSelector((state) => state.alarm.notices);
  const alarmList = [...alarms].reverse();

  const delAlarm = () => {
    Swal.fire({
      title: "알람을 전부 삭제하시겠습니까?",
      text: "지우신 알람은 되돌릴 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "삭제되었습니다",
          "캐처님의 알람이 모두 삭제되었습니다",
          "success"
        );
        dispatch(__deleteAlarm());
        setAlarmStatus(!alarmStatus);
      }
    });
  };

  useEffect(() => {
    dispatch(__getAlarm());
  }, [alarmStatus]);

  return (
    <AlarmContainer>
      <AlarmList>
        <TitleWrap>
          <h4>나의 알림</h4>
          <BtnWrap>
            <ConfirmBtn onClick={() => delAlarm()}>알림삭제</ConfirmBtn>
            <BackBtn onClick={() => navigate(-1)}>✕</BackBtn>
          </BtnWrap>
        </TitleWrap>
        {alarms.length === 0 ? (
          <AlarmBox>
            <p>아직 새로운 알림이 없습니다!</p>
          </AlarmBox>
        ) : (
          alarmList?.map((alarm, idx) => {
            return alarm?.postId === -1 ? (
              <>
                <AlarmBox key={idx}>
                  <AlarmImg url={alarm.imgUrl}> </AlarmImg>
                  <p>{alarm.msg}</p>
                  <TimeText>{alarm.createdAt}</TimeText>
                </AlarmBox>
              </>
            ) : (
              <>
                <AlarmBox
                  key={idx}
                  onClick={() =>
                    navigate(`/item_detail/${alarm.postId}/${alarm.userId}`)
                  }
                >
                  <AlarmImg url={alarm.imgUrl}> </AlarmImg>
                  {alarm.duplecation > 1 && (
                    <p>
                      {alarm.msg}({alarm.duplecation})
                    </p>
                  )}
                  {alarm.duplecation === 1 && <p>{alarm.msg}</p>}
                  <TimeText>{alarm.createdAt}</TimeText>
                  <ArrowBtn></ArrowBtn>
                </AlarmBox>
              </>
            );
          })
        )}
      </AlarmList>
    </AlarmContainer>
  );
};

const AlarmContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
const AlarmList = styled.div`
  width: 380px;
  margin-top: 50px;
  margin-left: 25px;
  background-color: #e6e5ea;
  border-radius: 20px;
  color: #7b758b;
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;

  h4 {
    font-family: Roboto;
    font-style: Bold;
    font-size: 18px;
    font-weight: 700;
    margin: 15px;
  }
`;
const TitleWrap = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  justify-content: space-between;
`;
const BtnWrap = styled.div`
  width: 120px;
  display: flex;
  flex-direction: row;
  margin-left: 160px;
  padding: 0px;
`;
const ConfirmBtn = styled.button`
  width: 110px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0);
  color: #7b758b;
  border: 0px;
  margin-right: -10px;
  font-family: Roboto;
  font-style: Bold;
  font-weight: 700;
  font-size: 11px;
  position: relative;
  top: 10px;
`;
const BackBtn = styled.button`
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0);
  color: #7b758b;
  border: 0px;
  margin-left: -20px;
  margin-top: -5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 100;
  font-size: 30px;
`;
const AlarmBox = styled.div`
  width: 356px;
  height: 55px;
  background-color: white;
  border-radius: 20px;
  margin: 5px auto;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: baseline;
  flex-direction: row;

  & p {
    margin-top: 16px;
    margin-left: 20px;
    font-family: "Roboto";
    font-style: Bold;
    font-weight: 700;
    font-size: 14px;
    white-space: pre-wrap;
  }
  h5 {
    position: relative;
    top: -17px;
    color: #4e148c;
    font-size: 10px;
  }

  h6 {
    position: relative;
    top: -30px;
    left: 120px;
    cursor: pointer;
  }
`;
const TimeText = styled.div`
  font-family: "Roboto";
  font-style: Bold;
  font-weight: 700;
  font-size: 3px;
  position: relative;
  /* left: 505px; */
  margin-top: -35px;
`;
const AlarmImg = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-left: 15px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;

const ArrowBtn = styled.div`
  transform: scaleX(-1);
  width: 15px;
  height: 15px;
  background-position: center;
  background-size: cover;
  background-image: url("https://www.pngmart.com/files/16/Left-Arrow-Icon-PNG-Transparent-Image.png");
  position: relative;
  left: -10px;
  opacity: 70%;
  margin-top: 10px;
`;

export default AlarmForm;
