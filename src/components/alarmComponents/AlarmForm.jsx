import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getAlarm, __deleteAlarm } from "../../redux/modules/alarmSlice";

const AlarmForm = () => {
  const dispatch = useDispatch();
  const [alarm, setAlarm] = useState(false);
  const alarms = useSelector((state) => state.alarm.notices);

  const delAlarm = () => {
    const result = window.confirm("모든 알람을 지우시겠습니까?");
    if (result) {
      dispatch(__deleteAlarm());
      setAlarm(true);
    }
  };
  useEffect(() => {
    dispatch(__getAlarm());
  }, [alarms]);

  return (
    <AlarmContainer>
      <AlarmList>
        <TitleWrap>
          <h4>나의 알림</h4>
          <ConfirmBtn onClick={() => delAlarm()}>알림지우기</ConfirmBtn>
        </TitleWrap>
        {alarms.length === 0 ? (
          <AlarmBox>
            <p>아직 새로운 알림이 없습니다!</p>
          </AlarmBox>
        ) : (
          alarms?.map((alarm, idx) => {
            return (
              <AlarmBox key={idx}>
                <p>{alarm.msg}</p>
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
    font-size: 20px;
    font-weight: 700;
    margin: 10px;
  }
`;
const TitleWrap = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-direction: row;
`;
const ConfirmBtn = styled.button`
  width: 90px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0);
  color: #7b758b;
  border: 0px;
  margin-left: 180px;
  font-family: Roboto;
  font-style: Bold;
  font-weight: 700;
  font-size: 16px;
`;
const AlarmBox = styled.div`
  width: 356px;
  height: 48px;
  background-color: white;
  border-radius: 20px;
  margin: 10px;
  text-align: center;

  p {
    font-family: Roboto;
    font-style: Bold;
    font-weight: 700;
    font-size: 16px;
  }
`;
export default AlarmForm;
