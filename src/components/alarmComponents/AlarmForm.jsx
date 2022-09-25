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
            <ConfirmBtn onClick={() => delAlarm()}>전체알림지우기</ConfirmBtn>
            <BackBtn onClick={() => navigate(-1)}>✖️</BackBtn>
          </BtnWrap>
        </TitleWrap>
        {alarms.length === 0 ? (
          <AlarmBox>
            <p>아직 새로운 알림이 없습니다!</p>
          </AlarmBox>
        ) : (
          alarmList?.map((alarm, idx) => {
            return alarm?.postId === -1 ? (
              <AlarmBox key={idx}>
                <p>{alarm.msg}</p>
                {alarm.duplecation > 1 && <h5>{alarm.duplecation}</h5>}
              </AlarmBox>
            ) : (
              <AlarmBox
                key={idx}
                onClick={() =>
                  navigate(`/item_detail/${alarm.postId}/${alarm.userId}`)
                }
              >
                {alarm.duplecation > 1 && (
                  <p>
                    {alarm.msg}({alarm.duplecation})
                  </p>
                )}
                {alarm.duplecation === 1 && <p>{alarm.msg}</p>}
                <ArrowBtn></ArrowBtn>
              </AlarmBox>
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
    font-size: 14px;
    font-weight: 700;
    margin: 15px;
  }
`;
const TitleWrap = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
`;
const BtnWrap = styled.div`
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
  margin-right: -15px;
  font-family: Roboto;
  font-style: Bold;
  font-weight: 700;
  font-size: 13px;
`;
const BackBtn = styled.button`
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0);
  color: #7b758b;
  border: 0px;
  margin: 0px;
  font-family: Roboto;
  font-style: Bold;
  font-weight: 700;
  font-size: 13px;
`;
const AlarmBox = styled.div`
  width: 356px;
  height: 55px;
  background-color: white;
  border-radius: 20px;
  margin: 10px;
  text-align: center;

  p {
    margin-top: 8px;
    font-family: Roboto;
    font-style: Bold;
    font-weight: 700;
    font-size: 16px;
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
const ArrowBtn = styled.div`
  transform: scaleX(-1);
  width: 15px;
  height: 15px;
  background-position: center;
  background-size: cover;
  background-image: url("https://www.pngmart.com/files/16/Left-Arrow-Icon-PNG-Transparent-Image.png");
  position: relative;
  top: -30px;
  left: 330px;
  opacity: 70%;
`;

export default AlarmForm;
