import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getAlarm, __deleteAlarm } from "../../redux/async/alarm";

const AlarmForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alarm, setAlarm] = useState(false);
  const alarms = useSelector((state) => state.alarm.notices);
  const alarmStatus = useSelector((state) => state.alarm.status);
  const error = useSelector((state) => state.alarm.error);

  const delAlarm = () => {
    const result = window.confirm("모든 알람을 지우시겠습니까?");
    if (result) {
      dispatch(__deleteAlarm());
      setAlarm(true);
    }
  };

  useEffect(() => {
    if (alarmStatus === "idle") {
      dispatch(__getAlarm());
    }
  }, [alarmStatus]);

  let content;

  //로딩중과 에러 발생했을 때 처리
  if (alarmStatus === "loading") {
    content = <div> Loading ...</div>;
  }
  if (alarmStatus === "failed") {
    content = <div>{error}</div>;
  }

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
        {alarmStatus !== "succeeded" ? <AlarmBox>{content}</AlarmBox> : null}
        {alarms.length === 0 ? (
          <AlarmBox>
            <p>아직 새로운 알림이 없습니다!</p>
          </AlarmBox>
        ) : (
          alarms?.map((alarm, idx) => {
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
                <p>{alarm.msg}</p>
                <h6>해당 게시글로 이동하기</h6>
                {alarm.duplecation > 1 && <h5>{alarm.duplecation}</h5>}
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
    font-size: 17px;
    font-weight: 700;
    margin: 10px;
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
  margin: 0px;
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
    top: -35px;
    left: 160px;
  }

  h6 {
    position: relative;
    top: -30px;
    left: 120px;
    cursor: pointer;
  }
`;
export default AlarmForm;
